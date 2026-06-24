/**
 * AuthSection Component
 * User authentication page (sign-in / sign-up).
 * Features form validation, loading states, password visibility toggle,
 * and social login options.
 */
import React, { useState } from 'react'

function AuthSection() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')

  const validateForm = () => {
    const newErrors = {}
    if (isSignUp && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setErrors({})
    setSuccessMsg('')
    setTimeout(() => {
      setLoading(false)
      setSuccessMsg(isSignUp ? 'Account created successfully! Redirecting...' : `Welcome back, ${formData.email}!`)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    }, 1500)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setErrors({})
    setSuccessMsg('')
    setShowPassword(false)
  }

  return (
    <section className="auth-section" id="signin">
      <div className="auth-wrapper">
        {/* Sign In / Sign Up Card */}
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <i className="fas fa-leaf"></i>
            </div>
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isSignUp ? 'Start your healthier journey today' : 'Sign in to access your dashboard'}</p>
          </div>

          {successMsg && (
            <div className="auth-success">
              <i className="bi bi-check-circle-fill"></i>
              <p>{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {isSignUp && (
              <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="name">Full Name</label>
                <div className="input-group">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <span className="field-error"><i className="bi bi-exclamation-circle"></i> {errors.name}</span>}
              </div>
            )}

            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="field-error"><i className="bi bi-exclamation-circle"></i> {errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <i className="bi bi-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="field-error"><i className="bi bi-exclamation-circle"></i> {errors.password}</span>}
            </div>

            {isSignUp && (
              <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <span className="field-error"><i className="bi bi-exclamation-circle"></i> {errors.confirmPassword}</span>}
              </div>
            )}

            {!isSignUp && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom"></span>
                  Remember me
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="loading-spinner-small"></span>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <>{isSignUp ? 'Create Account' : 'Sign In'}</>
              )}
            </button>
          </form>

          {!isSignUp && (
            <div className="auth-divider">
              <span>or continue with</span>
            </div>
          )}

          {!isSignUp && (
            <div className="social-login">
              <button className="social-btn google-btn">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-btn apple-btn">
                <i className="fab fa-apple"></i> Apple
              </button>
            </div>
          )}

          <p className="auth-footer">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className="toggle-btn" onClick={toggleMode}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Side Info Panel */}
        <div className="auth-side-info">
          <div className="auth-side-content">
            <h3>Why Join Nutri Plate?</h3>
            <ul>
              <li><i className="bi bi-check-circle-fill"></i> Access 500+ healthy recipes</li>
              <li><i className="bi bi-check-circle-fill"></i> Track calories and macros daily</li>
              <li><i className="bi bi-check-circle-fill"></i> Get personalized meal recommendations</li>
              <li><i className="bi bi-check-circle-fill"></i> Save your favorite recipes</li>
              <li><i className="bi bi-check-circle-fill"></i> Join a supportive community</li>
            </ul>
            <div className="auth-side-stats">
              <div className="auth-stat">
                <strong>50K+</strong>
                <span>Active Users</span>
              </div>
              <div className="auth-stat">
                <strong>1M+</strong>
                <span>Meals Tracked</span>
              </div>
              <div className="auth-stat">
                <strong>4.9</strong>
                <span>App Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthSection
