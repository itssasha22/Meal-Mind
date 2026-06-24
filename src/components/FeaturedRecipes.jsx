/**
 * FeaturedRecipes Component
 * Curated selection of top-rated recipes displayed prominently on the home page.
 * Features loading states, hover animations, and selection controls.
 */
import React, { useState, useEffect } from 'react'
import { ALL_RECIPES } from './RecipeDetail'

function FeaturedRecipes() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  // Simulate fetching featured recipes
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeatured(ALL_RECIPES.slice(0, 4))
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="featured-section">
        <div className="featured-container">
          <div className="section-header">
            <h2><i className="bi bi-star-fill"></i> Featured Recipes</h2>
            <p>Handpicked favorites loved by our community</p>
          </div>
          <div className="featured-grid loading-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="featured-card skeleton-card">
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

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="section-header">
          <h2><i className="bi bi-star-fill"></i> Featured Recipes</h2>
          <p>Handpicked favorites loved by our community</p>
        </div>
        <div className="featured-grid">
          {featured.map((recipe, index) => (
            <FeaturedCard key={recipe.id} recipe={recipe} rank={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * FeaturedCard - Individual featured recipe card with rank badge
 */
function FeaturedCard({ recipe, rank }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nutriplate-favorites')
    return saved ? JSON.parse(saved) : []
  })

  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => {
      const updated = prev.includes(recipe.id) ? prev.filter(f => f !== recipe.id) : [...prev, recipe.id]
      localStorage.setItem('nutriplate-favorites', JSON.stringify(updated))
      return updated
    })
  }

  const isFavorited = favorites.includes(recipe.id)
  const rankBadges = ['#ff5252', '#ff9800', '#ffc107', '#4caf50']
  const badgeColor = rankBadges[rank] || '#4caf50'

  return (
    <a href={`#recipe${recipe.id}`} className="featured-card-link">
      <div className="featured-card">
        <div className="featured-rank" style={{ backgroundColor: badgeColor }}>{rank + 1}</div>
        <div className="featured-image-container">
          {!imgLoaded && <div className="skeleton skeleton-image absolute"></div>}
          <img
            src={recipe.image}
            alt={recipe.title}
            className="featured-image"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280"%3E%3Crect width="400" height="280" fill="%234caf50"/%3E%3Ctext x="200" y="145" font-family="Arial" font-size="20" fill="white" text-anchor="middle"%3E${encodeURIComponent(recipe.title)}%3C/text%3E%3C/svg%3E`
            }}
          />
          <button
            className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
            onClick={toggleFavorite}
          >
            <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>
        <div className="featured-card-body">
          <div className="featured-tags">
            {recipe.tags.slice(0, 2).map(tag => (
              <span key={tag} className="featured-tag">{tag}</span>
            ))}
          </div>
          <h3 className="featured-title">{recipe.title}</h3>
          <p className="featured-desc">{recipe.description}</p>
          <div className="featured-meta">
            <span className="featured-calories"><i className="bi bi-fire"></i> {recipe.calories} kcal</span>
            <span className="featured-time"><i className="bi bi-clock"></i> {recipe.prepTime}</span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default FeaturedRecipes
