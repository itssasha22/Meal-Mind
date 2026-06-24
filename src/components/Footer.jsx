/**
 * Footer Component
 * Displays site navigation links, social media icons, and newsletter signup.
 * Provides consistent X/Footer across all pages for professional branding.
 */
import React, { useState } from 'react'

function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setEmail('')
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Stay Healthy & Informed</h3>
            <p>Subscribe to get weekly nutrition tips, healthy recipes, and wellness advice delivered to your inbox.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="newsletter-input-wrapper">
              <i className="bi bi-envelope"></i>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Column */}
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <i className="fas fa-leaf"></i>
              <span>Nutri Plate</span>
            </div>
            <p className="footer-tagline">
              Empowering you to make smarter food choices and live a healthier, happier life through better nutrition.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://youtube.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://pinterest.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home"><i className="bi bi-chevron-right"></i> Home</a></li>
              <li><a href="#about"><i className="bi bi-chevron-right"></i> About Us</a></li>
              <li><a href="#recipes"><i className="bi bi-chevron-right"></i> Recipes</a></li>
              <li><a href="#tracker"><i className="bi bi-chevron-right"></i> Calorie Tracker</a></li>
              <li><a href="#blog"><i className="bi bi-chevron-right"></i> Blog</a></li>
              <li><a href="#contact"><i className="bi bi-chevron-right"></i> Contact</a></li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="footer-col">
            <h4>Meal Categories</h4>
            <ul className="footer-links">
              <li><a href="#recipes?category=breakfast"><i className="bi bi-egg-fried"></i> Breakfast</a></li>
              <li><a href="#recipes?category=lunch"><i className="bi bi-basket"></i> Lunch</a></li>
              <li><a href="#recipes?category=dinner"><i className="bi bi-cup-hot"></i> Dinner</a></li>
              <li><a href="#recipes?category=snacks"><i className="bi bi-cookie"></i> Snacks</a></li>
              <li><a href="#recipes?category=dessert"><i className="bi bi-cake2"></i> Desserts</a></li>
              <li><a href="#recipes?category=smoothies"><i className="bi bi-cup-straw"></i> Smoothies</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <i className="bi bi-geo-alt"></i>
                <span>123 Nutrition Avenue,<br />Health City, HC 10001</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <a href="mailto:hello@nutriplate.com">hello@nutriplate.com</a>
              </li>
              <li>
                <i className="bi bi-telephone"></i>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </li>
              <li>
                <i className="bi bi-clock"></i>
                <span>Mon-Fri: 9am - 6pm EST</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Nutri Plate. All rights reserved. Made with <i className="bi bi-heart-fill"></i> for healthier living.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
