/**
 * Facts Component
 * "Did You Know?" Nutrition Facts Carousel
 * Auto-rotates through interesting nutrition facts with dot indicators.
 * Users can click indicators or swipe to navigate between facts.
 */
import React, { useState, useEffect } from 'react'

const nutritionFacts = [
  {
    id: 1,
    icon: 'bi-apple',
    color: '#ff5252',
    text: "Apples contain fiber, vitamins, and antioxidants. A medium-sized apple contains about 95 calories, making it a healthy snack choice for many diets.",
  },
  {
    id: 2,
    icon: 'bi-fish',
    color: '#2196f3',
    text: "Salmon is rich in omega-3 fatty acids, which support heart health and reduce inflammation. A 3-ounce serving provides around 175 calories.",
  },
  {
    id: 3,
    icon: 'bi-basket3',
    color: '#9c27b0',
    text: "Blueberries are packed with antioxidants and vitamin C. One cup contains approximately 84 calories and supports brain health.",
  },
  {
    id: 4,
    icon: 'bi-cup-straw',
    color: '#4caf50',
    text: "Greek yogurt contains probiotics for gut health and about 150 calories per 6-ounce serving. It's also a great source of protein.",
  },
  {
    id: 5,
    icon: 'bi-briefcase',
    color: '#ff9800',
    text: "Almonds provide healthy fats and protein. A quarter-cup serving contains around 200 calories and helps keep you feeling full longer.",
  },
  {
    id: 6,
    icon: 'bi-basket2',
    color: '#009688',
    text: "Dark chocolate (70%+ cacao) is rich in antioxidants and can improve heart health. Just one ounce (28g) adds about 170 calories.",
  },
  {
    id: 7,
    icon: 'bi-cup-hot',
    color: '#795548',
    text: "Green tea contains catechins that may boost metabolism. A cup has only 2 calories and provides valuable antioxidants.",
  }
]

function Facts() {
  const [currentFact, setCurrentFact] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % nutritionFacts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const prevFact = () => {
    setIsPaused(true)
    setCurrentFact((prev) => (prev - 1 + nutritionFacts.length) % nutritionFacts.length)
  }

  const nextFact = () => {
    setIsPaused(true)
    setCurrentFact((prev) => (prev + 1) % nutritionFacts.length)
  }

  return (
    <section className="facts-section" id="featured">
      <div className="facts-container">
        <div className="section-header">
          <div className="section-icon">
            <i className="bi bi-lightbulb"></i>
          </div>
          <h2>Did You Know?</h2>
          <p>Fun and fascinating nutrition facts to inspire healthier choices</p>
        </div>

        <div className="facts-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <button className="carousel-btn carousel-prev" onClick={prevFact} aria-label="Previous fact">
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="facts-display">
            <div className="facts-icon-circle" style={{ backgroundColor: `${nutritionFacts[currentFact].color}20`, color: nutritionFacts[currentFact].color }}>
              <i className={`bi ${nutritionFacts[currentFact].icon}`}></i>
            </div>
            <blockquote className="facts-text">
              "{nutritionFacts[currentFact].text}"
            </blockquote>
            <div className="facts-category-label">
              <span className="facts-dot" style={{ backgroundColor: nutritionFacts[currentFact].color }}></span>
              Nutrition Tip #{nutritionFacts[currentFact].id}
            </div>
          </div>

          <button className="carousel-btn carousel-next" onClick={nextFact} aria-label="Next fact">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="facts-indicators">
          {nutritionFacts.map((fact, index) => (
            <button
              key={fact.id}
              className={`fact-indicator ${index === currentFact ? 'active' : ''}`}
              onClick={() => { setIsPaused(true); setCurrentFact(index) }}
              style={index === currentFact ? { backgroundColor: fact.color } : {}}
              aria-label={`Show fact ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facts
