/**
 * Hero Component
 * Landing page hero section with compelling headline, subtitle, and call-to-action.
 * Features a full-viewport background image with gradient overlay for text readability.
 */
import React from 'react'
import { ALL_RECIPES } from './RecipeDetail'

function Hero() {
  const featuredForHero = ALL_RECIPES.slice(0, 3)

  return (
    <header className="hero" id="home">
      <div className="hero-bg">
        <img
          src="/hero-background.jpeg"
          alt=""
          className="hero-bg-img"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="hero-gradient"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <i className="bi bi-emoji-smile"></i> Your Health Journey Starts Here
        </div>
        <h1 className="hero-title">
          Eat Smart.<br />
          <span className="hero-title-accent">Live Well.</span>
        </h1>
        <p className="hero-subtitle">
          Discover thousands of nutritious recipes, track your daily calories,
          and build healthier eating habits — all in one beautiful platform.
        </p>
        <div className="hero-actions">
          <a href="#recipes" className="btn-primary">
            <i className="bi bi-book"></i> Explore Recipes
          </a>
          <a href="#tracker" className="btn-secondary">
            <i className="bi bi-calendar-check"></i> Track Calories
          </a>
        </div>

        {/* Hero Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">500+</span>
            <span className="hero-stat-label">Healthy Recipes</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">50K+</span>
            <span className="hero-stat-label">Happy Users</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">4.9</span>
            <span className="hero-stat-label">Rating</span>
          </div>
        </div>

        {/* Mini Recipe Teaser Carousel */}
        <div className="hero-teaser">
          <div className="teaser-scroll">
            {featuredForHero.map(recipe => (
              <a key={recipe.id} href={`#recipe${recipe.id}`} className="teaser-card">
                <div className="teaser-img">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 70"%3E%3Crect width="100" height="70" fill="%234caf50"/%3E%3C/svg%3E`
                    }}
                  />
                </div>
                <span className="teaser-label">{recipe.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="teaser-cal"><i className="bi bi-fire"></i> {recipe.calories}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <a href="#featured">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll Down</span>
        </a>
      </div>
    </header>
  )
}

export default Hero
