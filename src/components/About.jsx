import React from 'react';

function About() {
  const features = [
    {
      icon: 'bi-calendar-check',
      title: 'Meal Planning',
      desc: 'Plan your weekly meals with our intuitive tools and personalized recommendations.',
    },
    {
      icon: 'bi-clipboard-data',
      title: 'Nutrition Tracking',
      desc: 'Log meals, monitor calories, and track macros to meet your health goals.',
    },
    {
      icon: 'bi-journal-bookmark',
      title: 'Recipe Library',
      desc: 'Access 500+ curated, nutritionist-approved recipes with detailed ingredient lists and instructions.',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Progress Analytics',
      desc: 'Visualize your nutrition trends with beautiful dashboards and insightful reports.',
    },
  ];

  const teamValues = [
    { icon: 'fa-heart', label: 'Passion' },
    { icon: 'fa-shield-halved', label: 'Trustworthiness' },
    { icon: 'fa-lightbulb', label: 'Innovation' },
    { icon: 'fa-earth-americas', label: 'Accessibility' },
  ];

  return (
    <section className="about-page" id="about">
      {/* Hero Banner */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-hero-badge">Our Story</span>
          <h1>
            About <span className="accent">Nutri Plate</span>
          </h1>
          <p>Building a healthier world, one meal at a time</p>
        </div>
      </div>

      <div className="about-content-wrapper">
        {/* Mission Statement */}
        <div className="about-mission">
          <div className="mission-text">
            <div className="section-icon-circle">
              <i className="fas fa-seedling"></i>
            </div>
            <h2>Our Mission</h2>
            <p>
              At Nutri Plate, we believe that good nutrition is the cornerstone of a healthy and
              fulfilling life. Founded in 2026, our mission is to bridge the gap between convenience
              and healthy eating — making nutritious, delicious meals accessible to everyone,
              regardless of their cooking experience.
            </p>
            <p>
              We partner with registered dietitians, professional chefs, and food scientists to
              craft recipes that are not only delicious but also nutritionally balanced. Every
              recipe on our platform comes with detailed nutritional information to help you make
              informed decisions about what you eat.
            </p>
            <p>
              Whether you're an athlete looking to optimize performance, a busy professional trying
              to eat healthier, or a parent cooking nutritious meals for your family — Nutri Plate
              is your trusted companion in the journey toward better health and well-being.
            </p>
          </div>
          <div className="mission-visual">
            <div className="mission-cards">
              {teamValues.map((val, i) => (
                <div
                  key={i}
                  className="mission-value-card"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <i className={`fas ${val.icon}`}></i>
                  <span>{val.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="about-features">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>Everything you need for a healthier lifestyle</p>
          </div>
          <div className="features-grid">
            {features.map((feat, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <i className={`bi ${feat.icon}`}></i>
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats-section">
          <h3>Our Impact So Far</h3>
          <div className="stats-grid">
            <div className="stat-card-large">
              <span className="stat-number">500+</span>
              <span className="stat-label">Healthy Recipes</span>
              <span className="stat-desc">Curated by nutrition experts</span>
            </div>
            <div className="stat-card-large">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Users</span>
              <span className="stat-desc">Worldwide community</span>
            </div>
            <div className="stat-card-large">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Meals Logged</span>
              <span className="stat-desc">Tracking health goals</span>
            </div>
            <div className="stat-card-large">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">User Rating</span>
              <span className="stat-desc">From app store reviews</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <div className="cta-card">
            <h2>Ready to Start Your Healthier Journey?</h2>
            <p>
              Join thousands of users who have transformed their eating habits with Nutri Plate.
            </p>
            <div className="cta-buttons">
              <a href="#recipes" className="btn-primary">
                <i className="bi bi-book"></i> Explore Recipes
              </a>
              <a href="#tracker" className="btn-outline-primary">
                <i className="bi bi-calendar-check"></i> Start Tracking
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
