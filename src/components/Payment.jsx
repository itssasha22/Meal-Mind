/**
 * Payment Component
 * Realistic-looking payment UI with card processors (Visa, Mastercard, PayPal, Apple Pay).
 * UI-only mock — no real transactions processed.
 */
import React, { useState } from 'react'

const CARD_LOGOS = {
  visa: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg',
  mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
  amex: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
  paypal: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
}

function detectCardBrand(number) {
  const n = number.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  return null
}

function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
  return digits
}

export default function Payment() {
  const [method, setMethod] = useState('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [status, setStatus] = useState('idle') // idle | processing | success | error
  const [errors, setErrors] = useState({})
  const [flipped, setFlipped] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)

  // Auto-detect from number, fall back to manual selection
  const brand = detectCardBrand(cardNumber) || selectedBrand

  const validate = () => {
    const e = {}
    if (!cardName.trim()) e.cardName = 'Name is required'
    if (cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number'
    if (expiry.length < 5) e.expiry = 'Enter a valid expiry date'
    if (cvv.length < 3) e.cvv = 'Enter a valid CVV'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('processing')
    setTimeout(() => setStatus('success'), 2000)
  }

  const handlePayPalClick = () => {
    setStatus('processing')
    setTimeout(() => setStatus('success'), 2200)
  }

  if (status === 'success') {
    return (
      <section className="payment-page" id="payment">
        <div className="payment-container">
          <div className="payment-success">
            <div className="success-icon"><i className="bi bi-check-circle-fill"></i></div>
            <h2>Payment Successful!</h2>
            <p>Welcome to NutriPlate Premium. Your account has been upgraded.</p>
            <a href="#home" className="btn-primary"><i className="bi bi-house"></i> Back to Home</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="payment-page" id="payment">
      {/* Hero Banner */}
      <div className="payment-hero-banner">
        <div className="payment-banner-content">
          <div className="payment-banner-icon"><i className="fas fa-crown"></i></div>
          <h1 className="payment-banner-title">Unlock Premium Nutrition</h1>
          <p className="payment-banner-subtitle">Join thousands upgrading their meal planning journey</p>
        </div>
      </div>

      <div className="payment-container">
        <div className="payment-grid">

          {/* Benefits */}
          <div className="payment-benefits">
            <h2>What You Get</h2>
            <div className="benefits-list">
              {[
                { icon: 'bi-book-half', title: '500+ Premium Recipes', desc: 'Exclusive meals from professional nutritionists' },
                { icon: 'bi-graph-up', title: 'Advanced Tracking', desc: 'Detailed macro & micro nutrient analysis' },
                { icon: 'bi-calendar3', title: 'Meal Plans', desc: 'Personalized weekly meal planning' },
                { icon: 'bi-download', title: 'Download Recipes', desc: 'Save recipes offline as PDFs' },
                { icon: 'bi-star', title: 'Priority Support', desc: '24/7 nutrition expert assistance' },
                { icon: 'bi-shield-check', title: 'Ad-Free Experience', desc: 'Clean interface, zero interruptions' },
              ].map((b, i) => (
                <div key={i} className="benefit-item">
                  <div className="benefit-icon"><i className={`bi ${b.icon}`}></i></div>
                  <div className="benefit-text"><h4>{b.title}</h4><p>{b.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Card */}
          <div className="payment-sidebar">
            <div className="payment-card">

              <div className="payment-price-display">
                <span className="payment-price-label">ONE-TIME</span>
                <div className="payment-price-row">
                  <span className="currency">$</span>
                  <span className="amount">9.99</span>
                </div>
                <p className="payment-price-subtitle">Lifetime premium access · No recurring fees</p>
              </div>

              {/* Method Tabs */}
              <div className="payment-method-tabs">
                <button
                  className={`method-tab ${method === 'card' ? 'active' : ''}`}
                  onClick={() => setMethod('card')}
                >
                  <i className="bi bi-credit-card"></i> Card
                </button>
                <button
                  className={`method-tab ${method === 'paypal' ? 'active' : ''}`}
                  onClick={() => setMethod('paypal')}
                >
                  <img src={CARD_LOGOS.paypal} alt="PayPal" className="method-logo" />
                </button>
                <button
                  className={`method-tab ${method === 'apple' ? 'active' : ''}`}
                  onClick={() => setMethod('apple')}
                >
                  <i className="fab fa-apple"></i> Pay
                </button>
              </div>

              {/* === Card Form === */}
              {method === 'card' && (
                <>
                  {/* Card Brand Picker */}
                  <div className="card-brand-picker">
                    <p className="card-brand-picker-label">Select your card type</p>
                    <div className="card-brand-options">
                      {['visa', 'mastercard', 'amex'].map(b => (
                        <button
                          key={b}
                          type="button"
                          className={`card-brand-option ${brand === b ? 'active' : ''}`}
                          onClick={() => { setSelectedBrand(b); setCardNumber('') }}
                        >
                          <img src={CARD_LOGOS[b]} alt={b} />
                          <span>{b === 'amex' ? 'Amex' : b.charAt(0).toUpperCase() + b.slice(1)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Card Preview */}
                  <div className={`card-preview ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                    <div className="card-preview-front">
                      <div className="card-chip"><i className="bi bi-sim"></i></div>
                      <div className="card-number-display">
                        {(cardNumber || '•••• •••• •••• ••••').padEnd(19, '•')}
                      </div>
                      <div className="card-preview-bottom">
                        <div>
                          <div className="card-preview-label">Card Holder</div>
                          <div className="card-preview-value">{cardName || 'FULL NAME'}</div>
                        </div>
                        <div>
                          <div className="card-preview-label">Expires</div>
                          <div className="card-preview-value">{expiry || 'MM/YY'}</div>
                        </div>
                        <div className="card-brand-logo">
                          {brand && <img src={CARD_LOGOS[brand]} alt={brand} />}
                        </div>
                      </div>
                    </div>
                    <div className="card-preview-back">
                      <div className="card-stripe"></div>
                      <div className="card-cvv-row">
                        <span className="card-cvv-label">CVV</span>
                        <span className="card-cvv-value">{cvv ? '•'.repeat(cvv.length) : '•••'}</span>
                      </div>
                      {brand && <img src={CARD_LOGOS[brand]} alt={brand} className="card-brand-back" />}
                    </div>
                  </div>
                  <p className="card-flip-hint">Click card to flip</p>

                  <form onSubmit={handleSubmit} className="card-pay-form" noValidate>
                    <div className={`form-group ${errors.cardName ? 'has-error' : ''}`}>
                      <label>Cardholder Name</label>
                      <div className="input-with-icon">
                        <i className="bi bi-person"></i>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={e => setCardName(e.target.value.toUpperCase())}
                          onFocus={() => setFlipped(false)}
                        />
                      </div>
                      {errors.cardName && <span className="error-msg">{errors.cardName}</span>}
                    </div>

                    <div className={`form-group ${errors.cardNumber ? 'has-error' : ''}`}>
                      <label>Card Number</label>
                      <div className="input-with-icon card-number-input">
                        <i className="bi bi-credit-card"></i>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                          onFocus={() => setFlipped(false)}
                          maxLength={19}
                        />
                        <div className="card-brand-indicators">
                          {['visa', 'mastercard', 'amex'].map(b => (
                            <img
                              key={b}
                              src={CARD_LOGOS[b]}
                              alt={b}
                              className={`brand-indicator ${brand === b ? 'active' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row-split">
                      <div className={`form-group ${errors.expiry ? 'has-error' : ''}`}>
                        <label>Expiry Date</label>
                        <div className="input-with-icon">
                          <i className="bi bi-calendar"></i>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={e => setExpiry(formatExpiry(e.target.value))}
                            onFocus={() => setFlipped(false)}
                            maxLength={5}
                          />
                        </div>
                        {errors.expiry && <span className="error-msg">{errors.expiry}</span>}
                      </div>
                      <div className={`form-group ${errors.cvv ? 'has-error' : ''}`}>
                        <label>CVV</label>
                        <div className="input-with-icon">
                          <i className="bi bi-shield-lock"></i>
                          <input
                            type="text"
                            placeholder="•••"
                            value={cvv}
                            onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            onFocus={() => setFlipped(true)}
                            onBlur={() => setFlipped(false)}
                            maxLength={4}
                          />
                        </div>
                        {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
                      </div>
                    </div>

                    <button type="submit" className="btn-pay" disabled={status === 'processing'}>
                      {status === 'processing'
                        ? <><span className="btn-spinner"></span> Processing...</>
                        : <><i className="bi bi-lock-fill"></i> Pay $9.99 Securely</>
                      }
                    </button>
                  </form>
                </>
              )}

              {/* === PayPal === */}
              {method === 'paypal' && (
                <div className="paypal-section">
                  <img src={CARD_LOGOS.paypal} alt="PayPal" className="paypal-logo-large" />
                  <p>You will be redirected to PayPal to complete your payment securely.</p>
                  <button
                    className="btn-paypal"
                    onClick={handlePayPalClick}
                    disabled={status === 'processing'}
                  >
                    {status === 'processing'
                      ? <><span className="btn-spinner"></span> Redirecting...</>
                      : <><img src={CARD_LOGOS.paypal} alt="" /> Pay with PayPal</>
                    }
                  </button>
                </div>
              )}

              {/* === Apple Pay === */}
              {method === 'apple' && (
                <div className="apple-pay-section">
                  <i className="fab fa-apple apple-pay-icon"></i>
                  <p>Use Face ID or Touch ID to pay instantly with Apple Pay.</p>
                  <button
                    className="btn-apple-pay"
                    onClick={handlePayPalClick}
                    disabled={status === 'processing'}
                  >
                    {status === 'processing'
                      ? <><span className="btn-spinner"></span> Processing...</>
                      : <><i className="fab fa-apple"></i> Pay with Apple Pay</>
                    }
                  </button>
                </div>
              )}

              {/* Security Badge */}
              <div className="payment-security">
                <i className="bi bi-lock-fill"></i>
                <span>256-bit SSL encrypted · Secure checkout</span>
                <div className="security-logos">
                  <img src={CARD_LOGOS.visa} alt="Visa" />
                  <img src={CARD_LOGOS.mastercard} alt="Mastercard" />
                  <img src={CARD_LOGOS.paypal} alt="PayPal" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
