import React, { useState, useEffect } from 'react';
import { ALL_RECIPES } from './RecipeDetail';
import { fetchRecipesFromApi } from '../services/recipeApi';

const DIETARY_TAGS = [
  'All',
  'Vegetarian',
  'Vegan',
  'High-Protein',
  'Gluten-Free',
  'Low-Carb',
  'Seafood',
  'Spicy',
];

function SearchResults({ query, onRecipeClick }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiNotice, setApiNotice] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nutriplate-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults([]);
      setApiNotice('');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setApiNotice('');
    setActiveTag('All');

    async function searchRecipes() {
      const q = query.toLowerCase();
      const localMatches = ALL_RECIPES.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(q) ||
          recipe.description.toLowerCase().includes(q) ||
          recipe.category.toLowerCase().includes(q) ||
          recipe.tags.some((t) => t.toLowerCase().includes(q)) ||
          recipe.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );

      try {
        const apiMatches = await fetchRecipesFromApi(query, 18);
        if (!cancelled) {
          const byId = new Map([...apiMatches, ...localMatches].map((recipe) => [recipe.id, recipe]));
          setResults([...byId.values()]);
        }
      } catch (err) {
        console.warn('Recipe API search unavailable, using local search:', err);
        if (!cancelled) {
          setResults(localMatches);
          setApiNotice(err.message || 'Recipe API unavailable. Showing saved recipe matches instead.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    searchRecipes();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('nutriplate-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredByTag =
    activeTag === 'All' ? results : results.filter((r) => r.tags.includes(activeTag));

  if (!query || query.trim() === '') {
    return (
      <section className="recipes-page" id="search-results">
        <div className="recipes-container">
          <div className="no-results-inline">
            <i className="bi bi-search"></i>
            <h3>Start typing to search</h3>
            <p>Search by recipe name, ingredient, category, or dietary tag.</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="recipes-page" id="search-results">
        <div className="recipes-container">
          <div className="recipes-loading">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="recipe-card skeleton-card">
                <div className="skeleton skeleton-image"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-meta"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="recipes-page" id="search-results">
      <div className="recipes-container">
        <div className="section-header">
          <div className="section-icon-circle">
            <i className="bi bi-search"></i>
          </div>
          <h2>Search Results</h2>
          <p>
            {apiNotice ||
            (results.length > 0
              ? `Found ${results.length} recipe${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No recipes found for "${query}"`)}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="no-results-inline">
            <i className="bi bi-journal-x"></i>
            <h3>No recipes found</h3>
            <p>
              Try searching for an ingredient, category like "breakfast", or a tag like "vegan".
            </p>
          </div>
        ) : (
          <div>
            <div className="filter-section">
              <div className="filter-label">
                <i className="bi bi-tag"></i> Filter by diet:
              </div>
              <div className="filter-pills-scroll">
                {DIETARY_TAGS.map((tag) => (
                  <button
                    key={tag}
                    className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="results-info">
              <span>
                Showing <strong>{filteredByTag.length}</strong> of {results.length} results
              </span>
              {activeTag !== 'All' && (
                <button className="btn-clear-filter" onClick={() => setActiveTag('All')}>
                  <i className="bi bi-x"></i> Clear filter
                </button>
              )}
            </div>

            {filteredByTag.length === 0 ? (
              <div className="no-results-inline">
                <i className="bi bi-funnel"></i>
                <h3>No matches for this filter</h3>
                <p>Try a different dietary tag or clear the filter.</p>
              </div>
            ) : (
              <div className="recipes-grid">
                {filteredByTag.map((recipe) => (
                  <a
                    href={`#recipe${recipe.id}`}
                    key={recipe.id}
                    className="recipe-card-link"
                    onClick={() => onRecipeClick && onRecipeClick(recipe.id)}
                  >
                    <div className="recipe-card">
                      <div className="recipe-image-container">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%234caf50"/%3E%3Ctext x="200" y="160" font-family="Arial" font-size="20" fill="white" text-anchor="middle"%3E${encodeURIComponent(recipe.title)}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <button
                          className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                          onClick={(e) => toggleFavorite(e, recipe.id)}
                        >
                          <i
                            className={`bi ${favorites.includes(recipe.id) ? 'bi-heart-fill' : 'bi-heart'}`}
                          ></i>
                        </button>
                        <div className="recipe-card-overlay">
                          <span className="view-label">
                            <i className="bi bi-eye"></i> View Recipe
                          </span>
                        </div>
                      </div>
                      <div className="recipe-card-body">
                        <div className="recipe-card-tags">
                          {recipe.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                          <span className="recipe-category-badge">{recipe.category}</span>
                        </div>
                        <h3 className="recipe-card-title">{recipe.title}</h3>
                        <p className="recipe-card-desc">{recipe.description}</p>
                        <div className="recipe-card-footer">
                          <div className="recipe-card-meta">
                            <span>
                              <i className="bi bi-fire"></i> {recipe.calories} kcal
                            </span>
                            <span>
                              <i className="bi bi-clock"></i> {recipe.prepTime}
                            </span>
                            <span>
                              <i className="bi bi-people"></i> {recipe.servings || 2}
                            </span>
                          </div>
                          <div className="macro-mini">
                            <span title="Protein">P: {recipe.nutrition?.protein || 0}g</span>
                            <span title="Carbs">C: {recipe.nutrition?.carbs || 0}g</span>
                            <span title="Fat">F: {recipe.nutrition?.fat || 0}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchResults;
