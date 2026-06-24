/**
 * Navbar Component
 * Primary navigation bar with responsive hamburger menu for mobile.
 * Features fixed positioning, backdrop blur glass effect, and active link highlighting.
 * Supports hash-based routing navigation.
 */
import React, { useState, useEffect } from 'react'

function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when a link is clicked
    const handleClick = () => setMobileOpen(false)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home', icon: 'bi-house' },
    { href: '#about', label: 'About', icon: 'bi-info-circle' },
    { href: '#recipes', label: 'Recipes', icon: 'bi-book' },
    { href: '#tracker', label: 'Calorie Tracker', icon: 'bi-calendar-check' },
    { href: '#blog', label: 'Blog', icon: 'bi-journal-text' },
    { href: '#contact', label: 'Contact', icon: 'bi-envelope' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-content">
        {/* Brand Logo */}
        <a href="#home" className="nav-brand" onClick={(e) => e.stopPropagation()}>
          <div className="brand-icon">
            <i className="fas fa-leaf"></i>
          </div>
          <span className="brand-text">Nutri<span className="brand-accent">Plate</span></span>
        </a>

        {/* Desktop Navigation */}
        <ul className={`nav_links ${mobileOpen ? 'nav-links-open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#search" className="nav-search-btn" onClick={(e) => e.stopPropagation()}>
              <i className="bi bi-search"></i>
            </a>
          </li>
          <li>
            <a href="#signin" className="nav-cta-btn" onClick={(e) => e.stopPropagation()}>
              <i className="bi bi-person"></i>
              <span>Sign In</span>
            </a>
          </li>
        </ul>

        {/* Right-side icons */}
        <div className="nav-actions">
          <a href="#search" className="nav-icon-btn search-icon" onClick={(e) => e.stopPropagation()}>
            <i className="bi bi-search"></i>
          </a>
          <a href="#signin" className="nav-icon-btn signin-icon" onClick={(e) => e.stopPropagation()}>
            <i className="bi bi-person-circle"></i>
          </a>
          {/* Hamburger Toggle */}
          <button
            className={`hamburger ${mobileOpen ? 'hamburger-open' : ''}`}
            onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen) }}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${mobileOpen ? 'overlay-visible' : ''}`} onClick={() => setMobileOpen(false)}></div>
    </nav>
  )
}

export default Navbar
