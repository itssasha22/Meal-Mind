/**
 * Contact Component
 * Contact page with form, contact info, and map placeholder.
 * Includes form validation and simulation of form submission.
 */
import React, { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success, error
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setFormStatus('idle')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setFormStatus('submitting')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    }, 1200)
  }

  return (
    <section className="contact-page" id="contact">
      <div className="contact-wrapper">
        {/* Hero Banner */}
        <div className="contact-hero">
          <div className="contact-hero-overlay"></div>
          <div className="contact-hero-content">
            <span className="contact-hero-badge">Get in Touch</span>
            <h1>Contact <span className="accent">Us</span></h1>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
          </div>
        </div>

        <div className="contact-content-wrapper">
          <div className="section-header">
            <div className="section-icon-circle">
              <i className="bi bi-envelope"></i>
            </div>
            <h2>We'd Love to Hear From You</h2>
            <p>Fill out the form below or reach us through our social channels</p>
          </div>

          <div className="contact-grid">
            {/* Contact Info Cards */}
            <div className="contact-info-cards">
              <div className="info-card">
                <div className="info-card-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="info-card-content">
                  <h4>Email Us</h4>
                  <a href="mailto:hello@nutriplate.com">hello@nutriplate.com</a>
                  <span>We reply within 24 hours</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="info-card-content">
                  <h4>Call Us</h4>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                  <span>Mon–Fri, 9am–6pm EST</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info-card-content">
                  <h4>Visit Us</h4>
                  <span>123 Nutrition Ave</span>
                  <span>Health City, HC 10001</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <div className="info-card-content">
                  <h4>Live Chat</h4>
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              <h3>Send us a message</h3>

              {formStatus === 'success' ? (
                <div className="form-success">
                  <i className="bi bi-check-circle-fill"></i>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="name">Your Name</label>
                    <div className="input-with-icon">
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
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>

                  <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <i className="bi bi-envelope"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <div className="input-with-icon">
                      <i className="bi bi-chat-text"></i>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <span className="error-msg">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn-submit" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? (
                      <><span className="btn-spinner"></span> Sending...</>
                    ) : (
                      <><i className="bi bi-send"></i> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="contact-social-section">
            <h3>Follow Us</h3>
            <div className="social-links-grid">
              <a href="https://facebook.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-link-card">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </a>
              <a href="https://instagram.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-link-card">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="https://twitter.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-link-card">
                <i className="fab fa-twitter"></i>
                <span>Twitter / X</span>
              </a>
              <a href="https://youtube.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-link-card">
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              <a href="https://pinterest.com/nutriplate" target="_blank" rel="noopener noreferrer" className="social-link-card">
                <i className="fab fa-pinterest-p"></i>
                <span>Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
