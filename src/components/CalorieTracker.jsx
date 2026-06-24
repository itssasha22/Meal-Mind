/**
 * CalorieTracker Component
 * Daily calorie tracking dashboard that allows users to log meals by category
 * and tracks daily nutritional intake against personal goals.
 * Data is persisted in localStorage.
 */
import React, { useState, useEffect } from 'react'

const MEAL_CATEGORIES = [
  { id: 'breakfast', label: 'Breakfast', icon: 'bi-egg-fried', color: '#ff9800' },
  { id: 'lunch', label: 'Lunch', icon: 'bi-basket', color: '#4caf50' },
  { id: 'dinner', label: 'Dinner', icon: 'bi-cup-hot', color: '#2196f3' },
  { id: 'snacks', label: 'Snacks', icon: 'bi-cookie', color: '#9c27b0' }
]

const SAMPLE_MEALS = [
  { id: 'sample-1', name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 54, fat: 6, category: 'breakfast' },
  { id: 'sample-2', name: 'Grilled Chicken Salad', calories: 450, protein: 35, carbs: 15, fat: 22, category: 'lunch' },
  { id: 'sample-3', name: 'Salmon with Vegetables', calories: 520, protein: 38, carbs: 18, fat: 28, category: 'dinner' },
  { id: 'sample-4', name: 'Greek Yogurt', calories: 150, protein: 15, carbs: 12, fat: 4, category: 'snacks' },
  { id: 'sample-5', name: 'Avocado Toast', calories: 280, protein: 8, carbs: 30, fat: 14, category: 'breakfast' },
  { id: 'sample-6', name: 'Turkey Wrap', calories: 410, protein: 28, carbs: 32, fat: 16, category: 'lunch' },
]

function CalorieTracker() {
  const [meals, setMeals] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('breakfast')
  const [selectedMeal, setSelectedMeal] = useState('')
  const [customName, setCustomName] = useState('')
  const [customCalories, setCustomCalories] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [dailyGoal, setDailyGoal] = useState(2000)
  const [editingGoal, setEditingGoal] = useState(false)

  // Load meals from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem('nutriplate-meals')
    if (savedMeals) {
      const parsed = JSON.parse(savedMeals)
      const today = new Date().toDateString()
      const todayMeals = parsed.filter(m => new Date(m.date).toDateString() === today)
      setMeals(todayMeals)
    }
    const savedGoal = localStorage.getItem('nutriplate-goal')
    if (savedGoal) setDailyGoal(JSON.parse(savedGoal))
  }, [])

  // Persist meals to localStorage
  useEffect(() => {
    if (meals.length > 0) {
      const savedMeals = localStorage.getItem('nutriplate-meals')
      const allMeals = savedMeals ? JSON.parse(savedMeals) : []
      const today = new Date().toDateString()
      const todayMeals = allMeals.filter(m => new Date(m.date).toDateString() === today)
      const otherMeals = allMeals.filter(m => new Date(m.date).toDateString() !== today)
      const updated = [...otherMeals, ...meals]
      localStorage.setItem('nutriplate-meals', JSON.stringify(updated))
    }
  }, [meals])

  const addMeal = (mealData) => {
    const newMeal = {
      ...mealData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMeals(prev => [...prev, newMeal])
    setSelectedMeal('')
    setCustomName('')
    setCustomCalories('')
    setShowForm(false)
  }

  const removeMeal = (id) => {
    setMeals(prev => prev.filter(m => m.id !== id))
  }

  const handleAddSample = () => {
    const meal = SAMPLE_MEALS.find(m => m.id === selectedMeal)
    if (meal) {
      addMeal({
        name: meal.name,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
        category: selectedCategory
      })
    }
  }

  const handleAddCustom = () => {
    const calories = parseInt(customCalories)
    if (customName.trim() && !isNaN(calories) && calories > 0) {
      addMeal({
        name: customName.trim(),
        calories,
        protein: Math.round(calories * 0.15 / 4),
        carbs: Math.round(calories * 0.5 / 4),
        fat: Math.round(calories * 0.35 / 9),
        category: selectedCategory
      })
    }
  }

  const handleGoalChange = (newGoal) => {
    const goal = parseInt(newGoal)
    if (!isNaN(goal) && goal > 0) {
      setDailyGoal(goal)
      localStorage.setItem('nutriplate-goal', JSON.stringify(goal))
      setEditingGoal(false)
    }
  }

  // Calculate totals
  const totals = meals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0),
    protein: acc.protein + (meal.protein || 0),
    carbs: acc.carbs + (meal.carbs || 0),
    fat: acc.fat + (meal.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const remaining = dailyGoal - totals.calories
  const progressPercent = Math.min((totals.calories / dailyGoal) * 100, 100)
  const isOverGoal = remaining < 0

  const getMealsByCategory = (catId) => meals.filter(m => m.category === catId)

  return (
    <section className="calorie-tracker" id="tracker">
      <div className="tracker-container">
        <div className="tracker-header">
          <h2><i className="bi bi-calendar-check"></i> Daily Calorie Tracker</h2>
          <p className="tracker-subtitle">Track your daily nutrition intake and stay on top of your health goals</p>
        </div>

        {/* Daily Progress Card */}
        <div className="tracker-progress-card">
          <div className="progress-header">
            <div className="progress-info">
              <h3>Today's Progress</h3>
              {editingGoal ? (
                <div className="goal-edit">
                  <input
                    type="number"
                    defaultValue={dailyGoal}
                    onBlur={(e) => handleGoalChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGoalChange(e.target.value)}
                    autoFocus
                    className="goal-input"
                  />
                  <span>kcal goal</span>
                </div>
              ) : (
                <div className="goal-display" onClick={() => setEditingGoal(true)} title="Click to edit">
                  <span className="goal-number">{dailyGoal.toLocaleString()}</span>
                  <span className="goal-label">kcal daily goal</span>
                  <i className="bi bi-pencil"></i>
                </div>
              )}
            </div>
            <div className="progress-ring-container">
              <CircularProgress percent={progressPercent} calories={totals.calories} />
            </div>
          </div>

          {/* Macro Nutrients */}
          <div className="macros-grid">
            <MacroCard label="Calories" value={totals.calories} goal={dailyGoal} unit="kcal" color="#4caf50" icon="bi-fire" />
            <MacroCard label="Protein" value={totals.protein} goal={Math.round(dailyGoal * 0.15 / 4)} unit="g" color="#ff5252" icon="bi-droplet" />
            <MacroCard label="Carbs" value={totals.carbs} goal={Math.round(dailyGoal * 0.5 / 4)} unit="g" color="#2196f3" icon="bi-wheat" />
            <MacroCard label="Fat" value={totals.fat} goal={Math.round(dailyGoal * 0.35 / 9)} unit="g" color="#ff9800" icon="bi-droplet-fill" />
          </div>

          {/* Status Message */}
          <div className={`status-message ${isOverGoal ? 'over-goal' : 'on-track'}`}>
            {isOverGoal ? (
              <><i className="bi bi-exclamation-triangle"></i> You've exceeded your daily calorie goal by {(Math.abs(remaining)).toLocaleString()} kcal. Consider a lighter meal!</>
            ) : (
              <><i className="bi bi-check-circle"></i> You have <strong>{remaining.toLocaleString()} kcal</strong> remaining for today. Great job staying on track!</>
            )}
          </div>
        </div>

        {/* Add Meal Form */}
        <div className="add-meal-card">
          <h3><i className="bi bi-plus-circle"></i> Add Meal</h3>
          <div className="category-tabs">
            {MEAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat.id); setShowForm(false); setSelectedMeal('') }}
                style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
              >
                <i className={cat.icon}></i>
                {cat.label}
              </button>
            ))}
          </div>

          {!showForm ? (
            <div className="add-meal-actions">
              <button className="btn-add-sample" onClick={() => setShowForm(true)}>
                <i className="bi bi-journal-plus"></i> Log a Meal from Recipe
              </button>
              <button className="btn-add-custom" onClick={() => { setShowForm(true); setSelectedCategory(selectedCategory) }}>
                <i className="bi bi-pencil-square"></i> Enter Custom Meal
              </button>
            </div>
          ) : (
            <div className="meal-form">
              {!customName && (
                <div className="sample-meals-select">
                  <label>Quick Add from Recipes:</label>
                  <select value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                    <option value="">-- Select a meal --</option>
                    {SAMPLE_MEALS.map(meal => (
                      <option key={meal.id} value={meal.id}>{meal.name} ({meal.calories} kcal)</option>
                    ))}
                  </select>
                  <button className="btn-add-sample-meal" onClick={handleAddSample} disabled={!selectedMeal}>
                    Add to {MEAL_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                  </button>
                </div>
              )}

              <div className="divider">
                <span>OR ENTER CUSTOM</span>
              </div>

              <div className="custom-meal-form">
                <div className="form-row">
                  <div className="input-group">
                    <i className="bi bi-journal-text"></i>
                    <input
                      type="text"
                      placeholder="Meal name"
                      value={customName}
                      onChange={(e) => { setCustomName(e.target.value); setSelectedMeal('') }}
                    />
                  </div>
                  <div className="input-group">
                    <i className="bi bi-fire"></i>
                    <input
                      type="number"
                      placeholder="Calories"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn-add-custom-meal" onClick={handleAddCustom} disabled={!customName.trim() || !customCalories}>
                  <i className="bi bi-check-lg"></i> Add to {MEAL_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </button>
              </div>

              <button className="btn-cancel-form" onClick={() => { setShowForm(false); setSelectedMeal(''); setCustomName(''); setCustomCalories('') }}>
                <i className="bi bi-x-lg"></i> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Meals by Category */}
        <div className="tracker-meals-section">
          <h3><i className="bi bi-list-ul"></i> Today's Meals</h3>
          {meals.length === 0 ? (
            <div className="empty-meals">
              <i className="bi bi-utensils"></i>
              <p>No meals logged yet today. Start by adding a meal above to track your nutrition!</p>
            </div>
          ) : (
            <div className="meals-by-category">
              {MEAL_CATEGORIES.map(cat => {
                const catMeals = getMealsByCategory(cat.id)
                if (catMeals.length === 0) return null
                const catTotal = catMeals.reduce((sum, m) => sum + m.calories, 0)
                return (
                  <div key={cat.id} className="meal-category-group" style={{ borderLeftColor: cat.color }}>
                    <div className="category-group-header">
                      <i className={cat.icon} style={{ color: cat.color }}></i>
                      <span className="category-group-name">{cat.label}</span>
                      <span className="category-group-total">{catTotal} kcal</span>
                    </div>
                    {catMeals.map(meal => (
                      <div key={meal.id} className="meal-item">
                        <div className="meal-item-info">
                          <span className="meal-item-name">{meal.name}</span>
                          {meal.protein && <span className="meal-item-macros">P: {meal.protein}g · C: {meal.carbs}g · F: {meal.fat}g</span>}
                        </div>
                        <div className="meal-item-right">
                          <span className="meal-item-calories">{meal.calories} kcal</span>
                          <span className="meal-item-time">{meal.timestamp}</span>
                          <button className="meal-remove-btn" onClick={() => removeMeal(meal.id)} title="Remove meal">
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * CircularProgress - SVG-based progress ring showing calorie consumption
 */
function CircularProgress({ percent, calories }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference
  const displayPercent = Math.round(Math.min(percent, 100))

  return (
    <div className="progress-ring-wrapper">
      <svg className="progress-ring" viewBox="0 0 200 200">
        <circle
          className="progress-ring-bg"
          cx="100"
          cy="100"
          r={radius}
        />
        <circle
          className="progress-ring-fill"
          cx="100"
          cy="100"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            stroke: percent > 100 ? '#e53935' : percent > 80 ? '#ff9800' : '#4caf50'
          }}
        />
      </svg>
      <div className="progress-ring-text">
        <span className="progress-percent">{displayPercent}%</span>
        <span className="progress-calories">{calories.toLocaleString()} kcal</span>
      </div>
    </div>
  )
}

/**
 * MacroCard - Displays individual macro nutrient info with a mini progress bar
 */
function MacroCard({ label, value, goal, unit, color, icon }) {
  const percent = goal > 0 ? Math.min((value / goal) * 100, 100) : 0

  return (
    <div className="macro-card">
      <div className="macro-icon" style={{ backgroundColor: `${color}20`, color }}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="macro-info">
        <span className="macro-label">{label}</span>
        <div className="macro-bar-container">
          <div className="macro-bar" style={{ width: `${percent}%`, backgroundColor: color }}></div>
        </div>
        <div className="macro-values">
          <span className="macro-current">{value}{unit}</span>
          <span className="macro-goal">/ {goal}{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default CalorieTracker
