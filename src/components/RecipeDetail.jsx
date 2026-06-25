/**
 * RecipeDetail Component
 * Displays full recipe information including ingredients, instructions,
 * nutritional breakdown, and related recipes.
 * Route: #recipe/:id
 */
import React, { useState, useEffect } from 'react';

const ALL_RECIPES = [
  {
    id: 1,
    title: 'Quinoa Salad with Avocado',
    description: 'A refreshing and nutritious salad packed with protein and healthy fats.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', // Quinoa Salad
    calories: 350,
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Gluten-Free', 'High-Fiber'],
    category: 'lunch',
    nutrition: { protein: 12, carbs: 38, fat: 16, fiber: 9, sugar: 4, sodium: 180 },
    ingredients: [
      { amount: '1 cup', name: 'Quinoa, cooked' },
      { amount: '1', name: 'Ripe avocado, diced' },
      { amount: '1/2', name: 'Red bell pepper, chopped' },
      { amount: '1/4', name: 'Red onion, finely diced' },
      { amount: '1/2', name: 'Cucumber, diced' },
      { amount: '1/4', name: 'Fresh cilantro, chopped' },
      { amount: '2 tbsp', name: 'Lime juice' },
      { amount: '1 tbsp', name: 'Extra virgin olive oil' },
      { amount: '1/2 tsp', name: 'Cumin' },
      { amount: '', name: 'Salt and pepper to taste' },
    ],
    instructions: [
      'Cook quinoa according to package directions and let it cool completely.',
      'In a large mixing bowl, combine the cooled quinoa with diced avocado, red bell pepper, red onion, and cucumber.',
      'In a small bowl, whisk together lime juice, olive oil, cumin, salt, and pepper to make the dressing.',
      'Pour the dressing over the salad and toss gently to combine all ingredients.',
      'Garnish with fresh cilantro and serve immediately or chill for 30 minutes before serving.',
    ],
  },
  {
    id: 2,
    title: 'Grilled Chicken with Roasted Vegetables',
    description:
      'A simple yet flavorful dish that combines lean protein with fresh seasonal vegetables.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80', // Grilled Chicken
    calories: 420,
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    tags: ['High-Protein', 'Low-Carb', 'Gluten-Free'],
    category: 'dinner',
    nutrition: { protein: 42, carbs: 18, fat: 18, fiber: 5, sugar: 7, sodium: 320 },
    ingredients: [
      { amount: '4', name: 'Chicken breasts (6 oz each)' },
      { amount: '2', name: 'Zucchini, sliced' },
      { amount: '1', name: 'Red bell pepper, sliced' },
      { amount: '1', name: 'Red onion, cut into wedges' },
      { amount: '2 cups', name: 'Cherry tomatoes' },
      { amount: '3 tbsp', name: 'Olive oil' },
      { amount: '2 tsp', name: ' dried oregano' },
      { amount: '1 tsp', name: 'Garlic powder' },
      { amount: '1/2', name: 'Lemon, juiced' },
      { amount: '', name: 'Salt, pepper, and paprika to taste' },
    ],
    instructions: [
      'Preheat your grill to medium-high heat (about 375-400°F).',
      'Season chicken breasts with salt, pepper, paprika, and half the olive oil on both sides.',
      'Toss vegetables with remaining olive oil, oregano, garlic powder, salt, and pepper in a large bowl.',
      'Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F.',
      'Grill vegetables alongside chicken for 8-10 minutes, turning occasionally.',
      'Let chicken rest for 5 minutes before slicing. Serve with roasted vegetables and a squeeze of lemon.',
    ],
  },
  {
    id: 3,
    title: 'Blueberry Smoothie Bowl',
    description:
      'A vibrant and antioxidant-rich smoothie bowl, perfect for a quick and healthy breakfast.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80', // Smoothie Bowl
    calories: 280,
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 1,
    difficulty: 'Easy',
    tags: ['Vegan', 'Breakfast', 'Quick'],
    category: 'breakfast',
    nutrition: { protein: 8, carbs: 48, fat: 6, fiber: 7, sugar: 22, sodium: 45 },
    ingredients: [
      { amount: '1 cup', name: 'Frozen blueberries' },
      { amount: '1/2', name: 'Frozen banana' },
      { amount: '1/2', name: 'Frozen mango chunks' },
      { amount: '1/4', name: 'Almond milk' },
      { amount: '1 tbsp', name: 'Chia seeds' },
      { amount: '1/2', name: 'Granola' },
      { amount: '1/4', name: 'Fresh blueberries' },
      { amount: '1', name: 'Sliced banana' },
      { amount: '1 tsp', name: 'Honey or maple syrup' },
      { amount: '', name: 'Extra chia seeds for garnish' },
    ],
    instructions: [
      'Add frozen blueberries, banana, mango, and almond milk to a high-speed blender.',
      'Blend on high until smooth and thick. The consistency should be thicker than a regular smoothie.',
      'Pour the mixture into a bowl immediately after blending to maintain thickness.',
      'Arrange toppings in sections: granola, fresh blueberries, sliced banana, and chia seeds.',
      'Drizzle with honey or maple syrup and serve immediately with a spoon.',
    ],
  },
  {
    id: 4,
    title: 'Mediterranean Pasta Salad',
    description: 'A colorful pasta salad bursting with Mediterranean flavors and fresh vegetables.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Salmon Pasta
    calories: 380,
    prepTime: '20 mins',
    cookTime: '10 mins',
    servings: 6,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Mediterranean'],
    category: 'lunch',
    nutrition: { protein: 14, carbs: 52, fat: 14, fiber: 5, sugar: 6, sodium: 220 },
    ingredients: [
      { amount: '12 oz', name: 'Rotini pasta' },
      { amount: '1 cup', name: 'Cherry tomatoes, halved' },
      { amount: '1/2', name: 'Cucumber, diced' },
      { amount: '1/3', name: 'Red onion, diced' },
      { amount: '1/2', name: 'Kalamata olives, pitted' },
      { amount: '1/2', name: 'Feta cheese, crumbled' },
      { amount: '1/4', name: 'Fresh parsley, chopped' },
      { amount: '3 tbsp', name: 'Olive oil' },
      { amount: '2 tbsp', name: 'Red wine vinegar' },
      { amount: '1 tsp', name: 'Dried oregano' },
    ],
    instructions: [
      'Cook pasta according to package directions. Drain and rinse with cold water.',
      'In a large bowl, combine pasta, cherry tomatoes, cucumber, red onion, and olives.',
      'Whisk together olive oil, red wine vinegar, oregano, salt, and pepper for the dressing.',
      'Pour dressing over the salad and toss well.',
      'Top with crumbled feta and fresh parsley. Refrigerate for 30 minutes before serving.',
    ],
  },
  {
    id: 5,
    title: 'Banana Protein Pancakes',
    description:
      'Fluffy protein-packed pancakes that taste indulgent but fit perfectly into your fitness routine.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', // Buddha Bowl
    calories: 310,
    prepTime: '10 mins',
    cookTime: '15 mins',
    servings: 2,
    difficulty: 'Easy',
    tags: ['High-Protein', 'Breakfast', 'Quick'],
    category: 'breakfast',
    nutrition: { protein: 22, carbs: 32, fat: 8, fiber: 4, sugar: 10, sodium: 280 },
    ingredients: [
      { amount: '2', name: 'Ripe bananas, mashed' },
      { amount: '2', name: 'Eggs' },
      { amount: '1 scoop', name: 'Vanilla protein powder' },
      { amount: '1/2', name: 'Oat flour' },
      { amount: '1 tsp', name: 'Baking powder' },
      { amount: '1/4 tsp', name: 'Cinnamon' },
      { amount: '1/4', name: 'Almond milk (if needed)' },
      { amount: '', name: 'Maple syrup and berries for topping' },
    ],
    instructions: [
      'Mash the ripe bananas in a bowl until smooth.',
      'In a separate bowl, whisk eggs then combine with mashed banana.',
      'Add protein powder, oat flour, baking powder, and cinnamon. Mix until well combined.',
      'Heat a non-stick skillet over medium heat and lightly grease.',
      'Pour about 1/4 cup of batter per pancake. Cook 2-3 minutes until bubbles form, then flip.',
      'Cook another 1-2 minutes until golden. Serve with maple syrup and fresh berries.',
    ],
  },
  {
    id: 6,
    title: 'Spicy Thai Curry with Tofu',
    description:
      'A bold and aromatic Thai curry with crispy tofu and colorful vegetables in a rich coconut sauce.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Protein Wrap
    calories: 390,
    prepTime: '15 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Medium',
    tags: ['Vegan', 'Gluten-Free', 'Spicy'],
    category: 'dinner',
    nutrition: { protein: 18, carbs: 24, fat: 26, fiber: 5, sugar: 8, sodium: 580 },
    ingredients: [
      { amount: '14 oz', name: 'Firm tofu, pressed and cubed' },
      { amount: '1 can', name: 'Coconut milk' },
      { amount: '2 tbsp', name: 'Thai red curry paste' },
      { amount: '1', name: 'Red bell pepper, sliced' },
      { amount: '1', name: 'Zucchini, sliced' },
      { amount: '1 cup', name: 'Bamboo shoots' },
      { amount: '1 tbsp', name: 'Fish sauce (or soy sauce)' },
      { amount: '1 tbsp', name: 'Brown sugar or palm sugar' },
      { amount: '1', name: 'Lime, juiced' },
      { amount: '', name: 'Fresh basil leaves and cilantro' },
    ],
    instructions: [
      'Press tofu for 15 minutes, then pan-fry until golden and crispy on all sides. Set aside.',
      'In a large pot, heat a splash of coconut cream and fry curry paste for 1 minute until fragrant.',
      'Add remaining coconut milk, fish sauce, and sugar. Bring to a gentle simmer.',
      'Add bell pepper, zucchini, and bamboo shoots. Simmer for 8-10 minutes.',
      'Add crispy tofu and lime juice. Simmer 2 more minutes.',
      'Garnish with fresh basil and cilantro. Serve over jasmine rice.',
    ],
  },
  {
    id: 7,
    title: 'Caesar Salad with Grilled Shrimp',
    description:
      'A lighter, protein-rich twist on the classic Caesar salad with succulent grilled shrimp.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Green Smoothie
    calories: 340,
    prepTime: '15 mins',
    cookTime: '8 mins',
    servings: 2,
    difficulty: 'Easy',
    tags: ['High-Protein', 'Low-Carb', 'Seafood'],
    category: 'lunch',
    nutrition: { protein: 30, carbs: 12, fat: 20, fiber: 3, sugar: 3, sodium: 450 },
    ingredients: [
      { amount: '8 oz', name: 'Large shrimp, peeled and deveined' },
      { amount: '4 cups', name: 'Romaine lettuce, chopped' },
      { amount: '1/4', name: 'Parmesan cheese, shaved' },
      { amount: '1/2', name: 'Croutons' },
      { amount: '2 tbsp', name: 'Caesar dressing' },
      { amount: '1', name: 'Lemon, juiced' },
      { amount: '1 tsp', name: 'Garlic, minced' },
      { amount: '1 tbsp', name: 'Olive oil' },
      { amount: '', name: 'Black pepper to taste' },
      { amount: '', name: 'Fresh parsley for garnish' },
    ],
    instructions: [
      'Season shrimp with garlic, lemon juice, olive oil, and black pepper. Marinate for 10 minutes.',
      'Grill shrimp for 2-3 minutes per side until pink and opaque. Set aside.',
      'In a large bowl, toss romaine lettuce with Caesar dressing until evenly coated.',
      'Arrange lettuce on serving plates and top with grilled shrimp.',
      'Garnish with Parmesan shavings, croutons, and fresh parsley. Serve immediately.',
    ],
  },
  {
    id: 8,
    title: 'Overnight Chia Pudding',
    description:
      "A creamy, make-ahead breakfast pudding that's rich in omega-3s and perfect for busy mornings.",
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', // Vegetable Stir Fry
    calories: 240,
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 1,
    difficulty: 'Easy',
    tags: ['Vegan', 'Breakfast', 'Meal-Prep'],
    category: 'breakfast',
    nutrition: { protein: 8, carbs: 24, fat: 12, fiber: 10, sugar: 8, sodium: 65 },
    ingredients: [
      { amount: '3 tbsp', name: 'Chia seeds' },
      { amount: '1 cup', name: 'Almond milk' },
      { amount: '1 tbsp', name: 'Maple syrup or honey' },
      { amount: '1/2', name: 'Vanilla bean or extract' },
      { amount: '1/4', name: 'Fresh berries' },
      { amount: '1 tbsp', name: 'Slivered almonds' },
      { amount: '', name: 'Coconut flakes for garnish' },
    ],
    instructions: [
      'In a mason jar or bowl, combine chia seeds, almond milk, maple syrup, and vanilla.',
      'Stir vigorously for 1-2 minutes to prevent clumping.',
      'Cover and refrigerate overnight (minimum 4 hours).',
      'In the morning, give it a good stir. The pudding should have a thick, tapioca-like consistency.',
      'Top with fresh berries, slivered almonds, and coconut flakes before serving.',
    ],
  },

  // ===== SNACKS =====
  {
    id: 9,
    title: 'Honey Roasted Mixed Nuts',
    description: 'Crunchy, sweet, and salty roasted mixed nuts glazed with honey and warm spices — the perfect grab-and-go snack.',
    image: '/images/snack1.jpg',
    calories: 210,
    prepTime: '5 mins',
    cookTime: '15 mins',
    servings: 4,
    difficulty: 'Easy',
    tags: ['Vegan', 'Gluten-Free', 'High-Protein'],
    category: 'snacks',
    nutrition: { protein: 6, carbs: 14, fat: 16, fiber: 2, sugar: 7, sodium: 95 },
    ingredients: [
      { amount: '1 cup', name: 'Mixed nuts (almonds, cashews, walnuts)' },
      { amount: '2 tbsp', name: 'Honey' },
      { amount: '1 tbsp', name: 'Olive oil' },
      { amount: '1/2 tsp', name: 'Cinnamon' },
      { amount: '1/4 tsp', name: 'Cayenne pepper' },
      { amount: '1/4 tsp', name: 'Sea salt' },
      { amount: '1/4 tsp', name: 'Black pepper' },
    ],
    instructions: [
      'Preheat oven to 325°F (160°C) and line a baking sheet with parchment paper.',
      'In a bowl, mix honey, olive oil, cinnamon, cayenne, salt, and pepper until combined.',
      'Add the mixed nuts and toss until evenly coated with the honey mixture.',
      'Spread nuts in a single layer on the prepared baking sheet.',
      'Bake for 12-15 minutes, stirring halfway through, until golden and caramelized.',
      'Let cool completely on the tray — they will crisp up as they cool. Store in an airtight jar.',
    ],
  },
  {
    id: 10,
    title: 'Avocado & Veggie Rice Cakes',
    description: 'Light and satisfying rice cakes topped with creamy avocado, cherry tomatoes, and everything bagel seasoning.',
    image: '/images/snack2.jpg',
    calories: 180,
    prepTime: '8 mins',
    cookTime: '0 mins',
    servings: 2,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'Gluten-Free', 'Quick'],
    category: 'snacks',
    nutrition: { protein: 4, carbs: 22, fat: 9, fiber: 5, sugar: 2, sodium: 140 },
    ingredients: [
      { amount: '4', name: 'Plain rice cakes' },
      { amount: '1', name: 'Ripe avocado' },
      { amount: '1/2 cup', name: 'Cherry tomatoes, halved' },
      { amount: '2 tbsp', name: 'Red onion, finely diced' },
      { amount: '1 tbsp', name: 'Lemon juice' },
      { amount: '1 tsp', name: 'Everything bagel seasoning' },
      { amount: '', name: 'Fresh basil leaves to garnish' },
    ],
    instructions: [
      'Slice the avocado in half, remove the pit, and scoop the flesh into a bowl.',
      'Mash the avocado with lemon juice, a pinch of salt, and pepper until smooth but slightly chunky.',
      'Spread a generous layer of mashed avocado on each rice cake.',
      'Top with halved cherry tomatoes and diced red onion.',
      'Sprinkle everything bagel seasoning over each rice cake.',
      'Garnish with fresh basil leaves and serve immediately.',
    ],
  },
  {
    id: 11,
    title: 'Greek Yogurt Parfait with Granola',
    description: 'Creamy Greek yogurt layered with crunchy granola, fresh berries, and a drizzle of honey — ready in minutes.',
    image: '/images/snack3.jpg',
    calories: 260,
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 1,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'High-Protein', 'Quick'],
    category: 'snacks',
    nutrition: { protein: 18, carbs: 30, fat: 6, fiber: 3, sugar: 14, sodium: 75 },
    ingredients: [
      { amount: '1 cup', name: 'Plain Greek yogurt' },
      { amount: '1/3 cup', name: 'Granola' },
      { amount: '1/2 cup', name: 'Mixed fresh berries (strawberries, blueberries, raspberries)' },
      { amount: '1 tbsp', name: 'Honey' },
      { amount: '1 tsp', name: 'Chia seeds' },
      { amount: '1/4 tsp', name: 'Vanilla extract' },
    ],
    instructions: [
      'Mix the Greek yogurt with vanilla extract and stir until smooth.',
      'In a glass or bowl, add half the yogurt as the first layer.',
      'Add half the granola on top of the yogurt layer.',
      'Add a layer of mixed fresh berries.',
      'Repeat the layers with remaining yogurt, granola, and berries.',
      'Drizzle honey over the top and sprinkle with chia seeds. Serve immediately.',
    ],
  },

  // ===== DESSERTS =====
  {
    id: 12,
    title: 'Chocolate Lava Cake',
    description: 'Indulgent individual chocolate cakes with a warm, gooey molten center — pure dessert perfection in under 20 minutes.',
    image: '/images/dessert1.jpg',
    calories: 420,
    prepTime: '10 mins',
    cookTime: '12 mins',
    servings: 4,
    difficulty: 'Medium',
    tags: ['Vegetarian', 'Indulgent'],
    category: 'desserts',
    nutrition: { protein: 7, carbs: 46, fat: 24, fiber: 3, sugar: 30, sodium: 180 },
    ingredients: [
      { amount: '4 oz', name: 'Dark chocolate (70%), chopped' },
      { amount: '4 tbsp', name: 'Unsalted butter' },
      { amount: '2', name: 'Whole eggs' },
      { amount: '2', name: 'Egg yolks' },
      { amount: '1/4 cup', name: 'Powdered sugar' },
      { amount: '2 tbsp', name: 'All-purpose flour' },
      { amount: '1/4 tsp', name: 'Sea salt' },
      { amount: '1 tsp', name: 'Vanilla extract' },
      { amount: '', name: 'Butter and cocoa powder for ramekins' },
      { amount: '', name: 'Vanilla ice cream to serve' },
    ],
    instructions: [
      'Preheat oven to 425°F (220°C). Butter 4 ramekins and dust with cocoa powder.',
      'Melt chocolate and butter together in a double boiler or microwave in 30-second bursts, stirring until smooth.',
      'In a separate bowl, whisk eggs, egg yolks, and powdered sugar until pale and slightly thickened.',
      'Fold the chocolate mixture into the egg mixture, then gently fold in flour, salt, and vanilla.',
      'Divide the batter evenly among the prepared ramekins.',
      'Bake for 10-12 minutes until the edges are set but the center still jiggles slightly.',
      'Let cool for 1 minute, then invert onto plates. Serve immediately with vanilla ice cream.',
    ],
  },
  {
    id: 13,
    title: 'Strawberry Cheesecake Bites',
    description: 'No-bake mini cheesecake bites with a buttery graham cracker base, creamy filling, and a fresh strawberry on top.',
    image: '/images/dessert2.jpg',
    calories: 180,
    prepTime: '20 mins',
    cookTime: '0 mins',
    servings: 12,
    difficulty: 'Easy',
    tags: ['Vegetarian', 'No-Bake'],
    category: 'desserts',
    nutrition: { protein: 3, carbs: 18, fat: 11, fiber: 1, sugar: 12, sodium: 110 },
    ingredients: [
      { amount: '1 cup', name: 'Graham cracker crumbs' },
      { amount: '3 tbsp', name: 'Melted butter' },
      { amount: '8 oz', name: 'Cream cheese, softened' },
      { amount: '1/4 cup', name: 'Powdered sugar' },
      { amount: '1 tsp', name: 'Vanilla extract' },
      { amount: '2 tbsp', name: 'Sour cream' },
      { amount: '12', name: 'Fresh strawberries' },
      { amount: '2 tbsp', name: 'Strawberry jam for drizzle' },
    ],
    instructions: [
      'Mix graham cracker crumbs with melted butter until it resembles wet sand.',
      'Press about 1 tablespoon of the mixture firmly into the bottom of each mini muffin tin cup.',
      'Refrigerate the base for 15 minutes to set.',
      'Beat cream cheese, powdered sugar, vanilla, and sour cream together until smooth and fluffy.',
      'Spoon or pipe the cream cheese filling onto each chilled base.',
      'Top each bite with a fresh strawberry and a small drizzle of strawberry jam.',
      'Refrigerate for at least 1 hour before serving.',
    ],
  },
  {
    id: 14,
    title: 'Mango Coconut Panna Cotta',
    description: 'A silky smooth dessert made with coconut milk and topped with a vibrant fresh mango coulis.',
    image: '/images/dessert3.jpg',
    calories: 290,
    prepTime: '15 mins',
    cookTime: '5 mins',
    servings: 4,
    difficulty: 'Medium',
    tags: ['Vegan', 'Gluten-Free'],
    category: 'desserts',
    nutrition: { protein: 3, carbs: 32, fat: 17, fiber: 1, sugar: 26, sodium: 40 },
    ingredients: [
      { amount: '1 can', name: 'Full-fat coconut milk (400ml)' },
      { amount: '1/2 cup', name: 'Coconut cream' },
      { amount: '3 tbsp', name: 'Maple syrup' },
      { amount: '1 tsp', name: 'Vanilla extract' },
      { amount: '2 tsp', name: 'Agar-agar powder' },
      { amount: '2', name: 'Ripe mangoes, peeled and diced' },
      { amount: '1 tbsp', name: 'Lime juice' },
      { amount: '1 tbsp', name: 'Maple syrup (for coulis)' },
      { amount: '', name: 'Toasted coconut flakes to garnish' },
    ],
    instructions: [
      'In a saucepan, combine coconut milk, coconut cream, maple syrup, and vanilla over medium heat.',
      'Whisk in agar-agar powder and bring to a gentle boil, stirring constantly for 2 minutes.',
      'Remove from heat and pour into 4 lightly greased ramekins or glasses.',
      'Let cool to room temperature, then refrigerate for at least 3 hours until fully set.',
      'For the mango coulis, blend mango pieces with lime juice and maple syrup until smooth.',
      'Unmould onto plates or serve in glasses. Spoon mango coulis over the top.',
      'Garnish with toasted coconut flakes and serve chilled.',
    ],
  },
];

function RecipeDetail({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nutriplate-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Simulate API fetch with loading delay
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const found = ALL_RECIPES.find((r) => r.id === parseInt(recipeId));
      if (found) {
        setRecipe(found);
      } else {
        setError('Recipe not found. It may have been removed or the link is incorrect.');
      }
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [recipeId]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('nutriplate-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return (
      <section className="recipe-detail">
        <div className="detail-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading recipe details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <section className="recipe-detail">
        <div className="detail-container">
          <div className="error-state">
            <i className="bi bi-exclamation-circle"></i>
            <h3>{error || 'Recipe not found'}</h3>
            <button className="btn-back" onClick={onBack}>
              <i className="bi bi-arrow-left"></i> Back to Recipes
            </button>
          </div>
        </div>
      </section>
    );
  }

  const isFavorited = favorites.includes(recipe.id);

  return (
    <section className="recipe-detail">
      <div className="detail-container">
        {/* Breadcrumb Navigation */}
        <nav className="detail-breadcrumb">
          <button className="btn-back" onClick={onBack}>
            <i className="bi bi-arrow-left"></i> Back to Recipes
          </button>
          <span className="breadcrumb-sep">
            <i className="bi bi-chevron-right"></i>
          </span>
          <span className="breadcrumb-cat">{recipe.tags[0]}</span>
        </nav>

        {/* Recipe Header */}
        <div className="detail-header">
          <div className="detail-image-wrapper">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="detail-image"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%234caf50"/%3E%3Ctext x="300" y="200" font-family="Arial" font-size="28" fill="white" text-anchor="middle"%3E${encodeURIComponent(recipe.title)}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <div className="detail-image-badges">
              {recipe.difficulty && <span className="badge-difficulty">{recipe.difficulty}</span>}
              {recipe.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-header-info">
            <h1 className="detail-title">{recipe.title}</h1>
            <p className="detail-description">{recipe.description}</p>
            <div className="detail-meta-row">
              <div className="detail-meta-item">
                <i className="bi bi-fire"></i>
                <div>
                  <strong>{recipe.calories}</strong>
                  <span>kcal</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <i className="bi bi-clock"></i>
                <div>
                  <strong>{recipe.prepTime}</strong>
                  <span>prep</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <i className="bi bi-clock-history"></i>
                <div>
                  <strong>{recipe.cookTime}</strong>
                  <span>cook</span>
                </div>
              </div>
              <div className="detail-meta-item">
                <i className="bi bi-people"></i>
                <div>
                  <strong>{recipe.servings}</strong>
                  <span>servings</span>
                </div>
              </div>
            </div>
            <div className="detail-actions">
              <button
                className={`btn-favorite-detail ${isFavorited ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(recipe.id)}
              >
                <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                {isFavorited ? 'Saved to Favorites' : 'Save to Favorites'}
              </button>
              <button
                className="btn-add-tracker"
                onClick={() => alert('Add to Calorie Tracker: Feature coming soon!')}
              >
                <i className="bi bi-calendar-plus"></i> Add to Today's Meals
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Facts Table */}
        <div className="detail-nutrition">
          <h3>
            <i className="bi bi-clipboard-data"></i> Nutrition Facts
          </h3>
          <p className="nutrition-per-serving">Per serving</p>
          <div className="nutrition-grid">
            <NutritionItem label="Calories" value={recipe.calories} unit="kcal" highlight />
            <NutritionItem label="Protein" value={recipe.nutrition.protein} unit="g" />
            <NutritionItem label="Carbohydrates" value={recipe.nutrition.carbs} unit="g" />
            <NutritionItem label="Fat" value={recipe.nutrition.fat} unit="g" />
            <NutritionItem label="Fiber" value={recipe.nutrition.fiber} unit="g" />
            <NutritionItem label="Sugar" value={recipe.nutrition.sugar} unit="g" />
            <NutritionItem label="Sodium" value={recipe.nutrition.sodium} unit="mg" />
          </div>
          <div className="calorie-breakdown">
            <CalorieBar
              label="Protein"
              value={recipe.nutrition.protein * 4}
              total={recipe.calories}
              color="#ff5252"
            />
            <CalorieBar
              label="Carbs"
              value={recipe.nutrition.carbs * 4}
              total={recipe.calories}
              color="#2196f3"
            />
            <CalorieBar
              label="Fat"
              value={recipe.nutrition.fat * 9}
              total={recipe.calories}
              color="#ff9800"
            />
          </div>
        </div>

        {/* Tabs: Ingredients / Instructions */}
        <div className="detail-tabs">
          <div className="tab-headers">
            <button
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              <i className="bi bi-basket"></i> Ingredients ({recipe.ingredients.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              <i className="bi bi-list-ol"></i> Instructions
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'ingredients' ? (
              <ul className="ingredients-list">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="ingredient-item">
                    <span className="ingredient-check">
                      <i className="bi bi-check-circle"></i>
                    </span>
                    <span className="ingredient-amount">{ing.amount}</span>
                    <span className="ingredient-name">{ing.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="instructions-list">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="instruction-item">
                    <span className="step-number">{idx + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Related Recipes */}
        <div className="related-recipes">
          <h3>
            <i className="bi bi-diagram-3"></i> You Might Also Like
          </h3>
          <div className="related-grid">
            {ALL_RECIPES.filter(
              (r) => r.id !== recipe.id && r.tags.some((t) => recipe.tags.includes(t))
            )
              .slice(0, 3)
              .map((rel) => (
                <a key={rel.id} href={`#recipe${rel.id}`} className="related-card">
                  <div className="related-image">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%234caf50"/%3E%3Ctext x="150" y="105" font-family="Arial" font-size="16" fill="white" text-anchor="middle"%3E${encodeURIComponent(rel.title)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                  <div className="related-info">
                    <h4>{rel.title}</h4>
                    <span>
                      <i className="bi bi-fire"></i> {rel.calories} kcal · {rel.prepTime}
                    </span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * NutritionItem - Individual nutritional value display
 */
function NutritionItem({ label, value, unit, highlight }) {
  return (
    <div className={`nutrition-item ${highlight ? 'highlight' : ''}`}>
      <span className="nutrition-value">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <span className="nutrition-unit">{unit}</span>
      <span className="nutrition-label">{label}</span>
    </div>
  );
}

/**
 * CalorieBar - Horizontal bar showing macro calorie contribution
 */
function CalorieBar({ label, value, total, color }) {
  const percent = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="calorie-bar-row">
      <span className="calorie-bar-label">{label}</span>
      <div className="calorie-bar-track">
        <div
          className="calorie-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="calorie-bar-value">{Math.round(percent)}%</span>
    </div>
  );
}

export default RecipeDetail;
export { ALL_RECIPES };
