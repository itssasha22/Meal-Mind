/**
 * Blog Component
 * Blog and nutrition articles section with category filtering.
 * Each post has a mock article reader view with author info and timestamps.
 */
import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: '5 Superfoods to Boost Your Immunity',
    description:
      'Discover the top superfoods that can help strengthen your immune system and keep you healthy year-round.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', // Superfoods
    date: 'June 15, 2024',
    readTime: '5 min read',
    category: 'Health',
    author: 'Dr. Sarah Mitchell',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4caf50&color=fff',
    content:
      'Superfoods are nutrient-dense foods that offer exceptional health benefits. From blueberries and spinach to salmon and turmeric, incorporating these powerhouse ingredients into your daily diet can boost immunity, improve heart health, and reduce inflammation. Read on to discover five essential superfoods and creative ways to include them in your meals.',
  },
  {
    id: 2,
    title: 'Meal Planning Tips for Busy Professionals',
    description:
      'Learn how to efficiently plan your meals and maintain a balanced diet even with a hectic schedule.',
    image: 'https://images.unsplash.com/photo-1504674900947-acb8c46a77d8?w=800&q=80', // Meal Planning
    date: 'June 10, 2024',
    readTime: '7 min read',
    category: 'Lifestyle',
    author: 'Mark Thompson',
    authorAvatar: 'https://ui-avatars.com/api/?name=Mark+Thompson&background=ff9800&color=fff',
    content:
      'A busy professional life often means reaching for quick, unhealthy options. But with a few simple strategies — like batch cooking, meal prep Sundays, and smart grocery lists — you can nourish your body without sacrificing time. This guide covers time-saving techniques, essential pantry staples, and a sample week-long meal plan.',
  },
  {
    id: 3,
    title: 'The Benefits of Mindful Eating',
    description:
      'Explore the concept of mindful eating and how it can improve your relationship with food and overall health.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', // Mindful Eating
    date: 'June 5, 2024',
    readTime: '6 min read',
    category: 'Wellness',
    author: 'Emily Chen',
    authorAvatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=9c27b0&color=fff',
    content:
      "Mindful eating is a practice that encourages you to be fully present during meals, savoring each bite and listening to your body's hunger and fullness cues. Research shows it can reduce binge eating, improve digestion, and foster a healthier relationship with food. Learn simple techniques to bring mindfulness to your next meal.",
  },
  {
    id: 4,
    title: '10 High-Protein Breakfast Ideas',
    description: 'Kickstart your morning with these delicious protein-rich breakfast recipes.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Breakfast
    date: 'May 28, 2024',
    readTime: '5 min read',
    category: 'Recipes',
    author: 'Chef James Rivera',
    authorAvatar: 'https://ui-avatars.com/api/?name=James+Rivera&background=2196f3&color=fff',
    content:
      'A high-protein breakfast sets the tone for the entire day, keeping you full, focused, and energized. From fluffy protein pancakes to savory egg bowls and overnight chia pudding, these recipes make it easy to hit your daily protein goals right from the start of your day.',
  },
  {
    id: 5,
    title: 'Understanding Macronutrients: A Beginner Guide',
    description:
      'Learn the basics of proteins, carbs, and fats and how to balance them for optimal health.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', // Macronutrients
    date: 'May 20, 2024',
    readTime: '8 min read',
    category: 'Health',
    author: 'Dr. Sarah Mitchell',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=4caf50&color=fff',
    content:
      'Macronutrients — proteins, carbohydrates, and fats — are the three main nutrients your body needs in larger amounts. Understanding how they work together, their individual roles, and the right proportions for your goals is key to building a sustainable and healthy diet.',
  },
  {
    id: 6,
    title: 'The Benefits of a Plant-Based Diet',
    description: 'Why more people are switching to plant-based eating and how you can start today.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', // Plant-Based
    date: 'May 15, 2024',
    readTime: '6 min read',
    category: 'Lifestyle',
    author: 'Emily Chen',
    authorAvatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=9c27b0&color=fff',
    content:
      "Plant-based diets are linked to lower risks of heart disease, improved weight management, and better gut health. Whether you're fully vegan or just looking to add more plants to your plate, this comprehensive guide covers the benefits, common misconceptions, and practical tips for a smooth transition.",
  },
];

const BLOG_CATEGORIES = ['All', 'Health', 'Lifestyle', 'Wellness', 'Recipes'];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  if (selectedPost) {
    return (
      <section className="blog-page" id="blog">
        <div className="blog-container">
          {/* Back Button */}
          <button className="blog-back-btn" onClick={() => setSelectedPost(null)}>
            <i className="bi bi-arrow-left"></i> Back to Articles
          </button>

          {/* Article View */}
          <article className="blog-article">
            <div className="article-header">
              <span className="article-category">{selectedPost.category}</span>
              <h1>{selectedPost.title}</h1>
              <div className="article-meta">
                <div className="article-author">
                  <img
                    src={selectedPost.authorAvatar}
                    alt={selectedPost.author}
                    className="author-avatar"
                  />
                  <div>
                    <strong>{selectedPost.author}</strong>
                    <span className="article-date">
                      {selectedPost.date} · {selectedPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="article-image-container">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400"%3E%3Crect width="900" height="400" fill="%234caf50"/%3E%3Ctext x="450" y="210" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3E${encodeURIComponent(selectedPost.title)}%3C/text%3E%3C/svg%3E`;
                }}
              />
            </div>

            <div className="article-body">
              <p className="article-lead">{selectedPost.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h3>Key Takeaways</h3>
              <ul className="article-takeaways">
                <li>Consistency is more important than perfection when building healthy habits.</li>
                <li>Small, sustainable changes lead to long-term results.</li>
                <li>
                  Always consult with a healthcare professional before making significant dietary
                  changes.
                </li>
              </ul>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
              <blockquote>
                "The groundwork for all happiness is good health." — Leigh Hunt
              </blockquote>
            </div>

            <div className="article-footer">
              <div className="tags-list">
                {selectedPost.category && (
                  <span className="article-tag">{selectedPost.category}</span>
                )}
                <span className="article-tag">Nutrition</span>
                <span className="article-tag">Wellness</span>
              </div>
              <div className="share-buttons">
                <span>Share:</span>
                <a href="#" className="share-btn">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="share-btn">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="share-btn">
                  <i className="bi bi-link-45deg"></i>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-page" id="blog">
      <div className="blog-container">
        <div className="section-header">
          <div className="section-icon-circle">
            <i className="bi bi-journal-text"></i>
          </div>
          <h2>Nutrition Blog & Articles</h2>
          <p>Expert advice, recipes, and tips for a healthier lifestyle</p>
        </div>

        {/* Category Filters */}
        <div className="filter-section">
          <div className="filter-pills-scroll">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card" onClick={() => setSelectedPost(post)}>
              <div className="blog-card-image">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"%3E%3Crect width="400" height="240" fill="%23ff9800"/%3E%3Ctext x="200" y="130" font-family="Arial" font-size="18" fill="white" text-anchor="middle"%3E${encodeURIComponent(post.title)}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <span className="blog-card-category">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="blog-card-meta">
                  <div className="blog-card-author">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="blog-author-avatar"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"%3E%3Ccircle cx="15" cy="15" r="15" fill="%234caf50"/%3E%3C/svg%3E`;
                      }}
                    />
                    <span className="blog-author-name">{post.author}</span>
                  </div>
                  <div className="blog-card-time">
                    <span>
                      <i className="bi bi-calendar"></i> {post.date}
                    </span>
                    <span>
                      <i className="bi bi-clock"></i> {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
