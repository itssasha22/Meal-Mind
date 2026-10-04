const TASTY_API_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'tasty.p.rapidapi.com';
const TASTY_API_BASE = `https://${TASTY_API_HOST}`;
const API_CACHE_KEY = 'nutriplate-api-recipes';

export function getPublicAsset(path) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function getCachedApiRecipes() {
  try {
    const cached = localStorage.getItem(API_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}

function setCachedApiRecipes(recipes) {
  try {
    const existing = getCachedApiRecipes();
    const byId = new Map([...existing, ...recipes].map((recipe) => [recipe.id, recipe]));
    localStorage.setItem(API_CACHE_KEY, JSON.stringify([...byId.values()].slice(-80)));
  } catch {
    // Cache is only a convenience for detail pages; API results can still render without it.
  }
}

function formatMinutes(minutes) {
  if (!minutes || minutes <= 0) return '10 mins';
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} hr ${rest} mins` : `${hours} hr`;
}

function inferCategory(recipe) {
  const searchable = [
    recipe.name,
    ...(recipe.tags || []).map((tag) => tag.display_name || tag.name || ''),
  ].join(' ').toLowerCase();

  if (searchable.includes('breakfast') || searchable.includes('brunch')) return 'breakfast';
  if (searchable.includes('dessert') || searchable.includes('cake') || searchable.includes('cookie')) return 'desserts';
  if (searchable.includes('snack') || searchable.includes('appetizer')) return 'snacks';
  if (searchable.includes('lunch')) return 'lunch';
  return 'dinner';
}

function getDifficulty(totalMinutes) {
  if (!totalMinutes || totalMinutes <= 25) return 'Easy';
  if (totalMinutes <= 55) return 'Medium';
  return 'Hard';
}

function normalizeNutrition(nutrition = {}) {
  return {
    protein: Math.round(nutrition.protein || 0),
    carbs: Math.round(nutrition.carbohydrates || 0),
    fat: Math.round(nutrition.fat || 0),
    fiber: Math.round(nutrition.fiber || 0),
    sugar: Math.round(nutrition.sugar || 0),
    sodium: Math.round(nutrition.sodium || 0),
  };
}

function normalizeIngredients(sections = []) {
  const ingredients = sections
    .flatMap((section) => section.components || [])
    .map((component) => ({
      amount: '',
      name: component.raw_text || component.ingredient?.name || '',
    }))
    .filter((ingredient) => ingredient.name);

  return ingredients.length ? ingredients : [{ amount: '', name: 'Ingredients listed on source recipe' }];
}

function normalizeInstructions(instructions = []) {
  const steps = instructions
    .map((step) => step.display_text)
    .filter(Boolean);

  return steps.length ? steps : ['Follow the preparation steps from the source recipe.'];
}

function normalizeRecipe(recipe) {
  const totalMinutes = recipe.total_time_minutes || recipe.cook_time_minutes || recipe.prep_time_minutes || 10;
  const nutrition = normalizeNutrition(recipe.nutrition);
  const calories = Math.round(recipe.nutrition?.calories || 0);
  const tags = (recipe.tags || [])
    .map((tag) => tag.display_name || tag.name)
    .filter(Boolean)
    .slice(0, 4);

  return {
    id: 800000 + Number(recipe.id),
    apiId: recipe.id,
    source: 'tasty',
    title: recipe.name || 'Untitled Recipe',
    description: recipe.description || recipe.yields || 'A recipe fetched from the Tasty recipe API.',
    image: recipe.thumbnail_url || recipe.beauty_url || getPublicAsset('images/snack1.jpg'),
    calories: calories || nutrition.protein * 4 + nutrition.carbs * 4 + nutrition.fat * 9 || 0,
    prepTime: formatMinutes(recipe.prep_time_minutes || totalMinutes),
    cookTime: formatMinutes(recipe.cook_time_minutes || 0),
    servings: recipe.num_servings || 1,
    difficulty: getDifficulty(totalMinutes),
    tags: tags.length ? tags : ['Recipe'],
    category: inferCategory(recipe),
    nutrition,
    ingredients: normalizeIngredients(recipe.sections),
    instructions: normalizeInstructions(recipe.instructions),
  };
}

function isNutritionLeaningRecipe(recipe) {
  const tags = (recipe.tags || [])
    .map((tag) => `${tag.display_name || tag.name || ''}`.toLowerCase())
    .join(' ');
  const name = `${recipe.name || ''}`.toLowerCase();
  const calories = recipe.nutrition?.calories || 0;

  if (tags.includes('healthy') || tags.includes('low-carb') || tags.includes('high-protein')) {
    return true;
  }

  if (name.includes('salad') || name.includes('smoothie') || name.includes('vegetable')) {
    return true;
  }

  return calories > 0 && calories <= 650;
}

export async function fetchRecipesFromApi(query = 'healthy', size = 14) {
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_RAPIDAPI_KEY in .env');
  }

  const params = new URLSearchParams({
    from: '0',
    size: String(size),
    q: query || 'healthy',
  });

  const response = await fetch(`${TASTY_API_BASE}/recipes/list?${params}`, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': TASTY_API_HOST,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Recipe API request failed');
  }

  const recipes = (data.results || [])
    .filter((item) => item.id && item.name && item.thumbnail_url)
    .filter(isNutritionLeaningRecipe)
    .map(normalizeRecipe);

  setCachedApiRecipes(recipes);
  return recipes;
}
