/**
 * SearchResults Component
 * Provides recipe search functionality with debounced API calls,
 * loading states, error handling, and empty state handling.
 * Supports filtering by category and search query.
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ALL_RECIPES } from './RecipeDetail'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts']
const TAGS = ['All', 'Vegetarian', 'Vegan', 'High-Protein', 'Gluten-Free', 'Low-Carb', 'Seafood', 'Spicy', 'Quick', 'Mediterranean']

function SearchResults({ initialQuery = '', initialCategory = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All')
  const [selectedTag, setSelectedTag] = useState('All')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nutriplate-favorites')
    return saved ? JSON.parse(saved) : []
  })

  // Debounced search effect
  useEffect(() => {
    if (!query.trim() && selectedCategory === 'All' && selectedTag === 'All') {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)
    const timer = setTimeout(() => {
      let filtered = [...ALL_RECIPES]

      if (query.trim()) {
        const q = query.toLowerCase()
        filtered = filtered.filter(r =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q)) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(q))
        )
      }

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(r => r.category === selectedCategory.toLowerCase())
      }

      if (selectedTag !== 'All') {
        filtered = filtered.filter(r => r.tags.includes(selectedTag))
      }

      // Sort by relevance when there's a query
      if (query.trim()) {
        filtered.sort((a, b) => {
          const aMatch = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          const bMatch = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
          return bMatch - aMatch
        })
      }

      setResults(filtered)
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [query, selectedCategory, selectedTag])

  const toggleFavorite = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem('nutriplate-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const clearSearch = () => {
    setQuery('')
    setSelectedCategory('All')
    setSelectedTag('All')
    setResults([])
    setSearched(false)
  }

  return (
    <section className="search-results" id="search">
      <div className="search-container-large">
        <div className="search-hero">
          <h2><i className="bi bi-search-heart"></i> Find Your Perfect Recipe</h2>
          <p>Search hundreds of healthy recipes by name, ingredient, or category.</p>

          {/* Search Input */}
          <div className="search-bar-large">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="search-filters">
          <div className="filter-group">
            <label>Category:</label>
            <div className="filter-pills">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {searched && (
            <div className="filter-group">
              <label>Dietary:</label>
              <div className="filter-pills">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          {(query || selectedCategory !== 'All' || selectedTag !== 'All') && (
            <button className="clear-filters-btn" onClick={clearSearch}>
              <i className="bi bi-x-lg"></i> Clear All Filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="search-results-area">
          {loading ? (
            <div className="loading-results">
              <div className="loading-spinner"></div>
              <p>Searching recipes...</p>
            </div>
          ) : searched && results.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="bi bi-search"></i>
              </div>
              <h3>No recipes found</h3>
              <p>We couldn't find any recipes matching "<strong>{query}</strong>". Try adjusting your search terms or filters.</p>
              <div className="no-results-suggestions">
                <p><strong>Suggestions:</strong></p>
                <ul>
                  <li>Check your spelling and try again</li>
                  <li>Use more general terms (e.g., "chicken" instead of "grilled lemon herb chicken")</li>
                  <li>Try selecting different dietary filters</li>
                  <li>Browse our featured recipes below</li>
                </ul>
              </div>
              <button className="btn-browse-all" onClick={clearSearch}>
                Browse All Recipes
              </button>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="results-count">
                Found <strong>{results.length}</strong> recipe{results.length !== 1 ? 's' : ''}
                {query && ` matching "${query}"`}
              </div>
              <div className="search-results-grid">
                {results.map(recipe => (
                  <a href={`#recipe${recipe.id}`} key={recipe.id} className="search-result-card">
                    <div className="search-result-image">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%234caf50"/%3E%3Ctext x="150" y="105" font-family="Arial" font-size="16" fill="white" text-anchor="middle"%3E${encodeURIComponent(recipe.title)}%3C/text%3E%3C/svg%3E`
                        }}
                      />
                      <button
                        className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                        onClick={(e) => toggleFavorite(e, recipe.id)}
                      >
                        <i className={`bi ${favorites.includes(recipe.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                      </button>
                    </div>
                    <div className="search-result-body">
                      <div className="search-result-tags">
                        {recipe.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="result-tag">{tag}</span>
                        ))}
                      </div>
                      <h4>{recipe.title}</h4>
                      <p>{recipe.description}</p>
                      <div className="search-result-meta">
                        <span><i className="bi bi-fire"></i> {recipe.calories} kcal</span>
                        <span><i className="bi bi-clock"></i> {recipe.prepTime}</span>
                        <span><i className="bi bi-people"></i> {recipe.servings || 2} servings</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          ) : !searched ? (
            <div className="search-prompt">
              <div className="prompt-content">
                <i className="bi bi-compass"></i>
                <h3>Start Your Search</h3>
                <p>Enter a recipe name, ingredient, or dietary preference above to discover delicious and healthy meals.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default SearchResults
