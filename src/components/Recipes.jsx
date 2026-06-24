/**
 * Recipes Component
 * Main recipe browsing and management section.
 * Features: search, filter by category/tag, favorites, loading/error states,
 * recipe cards with nutrition info, and pagination-ready card grid.
 */
import React, { useState, useEffect } from 'react'
import { ALL_RECIPES } from './RecipeDetail'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts']

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nutriplate-favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTag, setActiveTag] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setRecipes(ALL_RECIPES)
      setLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  const toggleFavorite = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem('nutriplate-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const filteredRecipes = recipes.filter(recipe => {
    const q = searchTerm.toLowerCase()
    const matchesSearch = !q ||
      recipe.title.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.tags.some(t => t.toLowerCase().includes(q)) ||
      recipe.ingredients.some(i => i.name.toLowerCase().includes(q))
    const matchesCategory = activeFilter === 'All' || recipe.category === activeFilter.toLowerCase()
    const matchesTag = activeTag === 'All' || recipe.tags.includes(activeTag)
    return matchesSearch && matchesCategory && matchesTag
  })

  if (loading) {
    return (
      <section className="recipes-page" id="recipes">
        <div className="recipes-container">
          <div className="section-header">
            <h2><i className="bi bi-book"></i> Discover Recipes</h2>
            <p>Loading our delicious collection...</p>
          </div>
          <div className="recipes-loading">
            {[1, 2, 3, 4, 5, 6].map(i => (
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
    )
  }

  if (error) {
    return (
      <section className="recipes-page" id="recipes">
        <div className="recipes-container">
          <div className="error-state-large">
            <i className="bi bi-exclamation-triangle"></i>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              <i className="bi bi-arrow-clockwise"></i> Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="recipes-page" id="recipes">
      <div className="recipes-container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-icon-circle">
            <i className="bi bi-book"></i>
          </div>
          <h2>Discover Recipes</h2>
          <p>Browse our collection of {recipes.length}+ healthy, delicious recipes</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar-container">
          <div className="search-bar">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by recipe name, ingredient, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm('')}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-section">
          <div className="filter-label">
            <i className="bi bi-grid"></i> Categories:
          </div>
          <div className="filter-pills-scroll">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'Breakfast' && <i className="bi bi-egg-fried"></i>}
                {cat === 'Lunch' && <i className="bi bi-basket"></i>}
                {cat === 'Dinner' && <i className="bi bi-cup-hot"></i>}
                {cat === 'Snacks' && <i className="bi bi-cookie"></i>}
                {cat === 'Desserts' && <i className="bi bi-cake2"></i>}
                {cat === 'All' && <i className="bi bi-grid"></i>}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Tags Filter (shown when searching) */}
        {searchTerm && (
          <div className="filter-section">
            <div className="filter-label">
              <i className="bi bi-tag"></i> Dietary:
            </div>
            <div className="filter-pills-scroll">
              {['All', 'Vegetarian', 'Vegan', 'High-Protein', 'Gluten-Free', 'Low-Carb', 'Seafood', 'Spicy'].map(tag => (
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
        )}

        {/* Results Count */}
        <div className="results-info">
          {searchTerm || activeFilter !== 'All' || activeTag !== 'All' ? (
            <span>Showing <strong>{filteredRecipes.length}</strong> of {recipes.length} recipes</span>
          ) : (
            <span>Showing all <strong>{recipes.length}</strong> recipes</span>
          )}
          {(searchTerm || activeFilter !== 'All' || activeTag !== 'All') && (
            <button className="btn-clear-filter" onClick={() => { setSearchTerm(''); setActiveFilter('All'); setActiveTag('All') }}>
              <i className="bi bi-x"></i> Clear filters
            </button>
          )}
        </div>

        {/* Recipe Cards Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="no-results-inline">
            <i className="bi bi-search"></i>
            <h3>No recipes found</h3>
            <p>Try adjusting your search terms or browse different categories.</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <a href={`#recipe${recipe.id}`} key={recipe.id} className="recipe-card-link">
                <div className="recipe-card">
                  <div className="recipe-image-container">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%234caf50"/%3E%3Ctext x="200" y="160" font-family="Arial" font-size="20" fill="white" text-anchor="middle"%3E${encodeURIComponent(recipe.title)}%3C/text%3E%3C/svg%3E`
                      }}
                    />
                    <button
                      className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                      onClick={(e) => toggleFavorite(e, recipe.id)}
                    >
                      <i className={`bi ${favorites.includes(recipe.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>
                    <div className="recipe-card-overlay">
                      <span className="view-label"><i className="bi bi-eye"></i> View Recipe</span>
                    </div>
                  </div>
                  <div className="recipe-card-body">
                    <div className="recipe-card-tags">
                      {recipe.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                      <span className="recipe-category-badge">{recipe.category}</span>
                    </div>
                    <h3 className="recipe-card-title">{recipe.title}</h3>
                    <p className="recipe-card-desc">{recipe.description}</p>
                    <div className="recipe-card-footer">
                      <div className="recipe-card-meta">
                        <span><i className="bi bi-fire"></i> {recipe.calories} kcal</span>
                        <span><i className="bi bi-clock"></i> {recipe.prepTime}</span>
                        <span><i className="bi bi-people"></i> {recipe.servings || 2}</span>
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
    </section>
  )
}

export default Recipes
