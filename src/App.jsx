import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Facts from './components/Facts';
import AuthSection from './components/AuthSection';
import About from './components/About';
import Recipes from './components/Recipes';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FeaturedRecipes from './components/FeaturedRecipes';
import CalorieTracker from './components/CalorieTracker';
import RecipeDetail from './components/RecipeDetail';
import SearchResults from './components/SearchResults';
import Payment from './components/Payment';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [recipeDetailId, setRecipeDetailId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace('#', '') || 'home';

    const recipeMatch = hash.match(/^recipe(\d+)$/);
    if (recipeMatch) {
      setRecipeDetailId(parseInt(recipeMatch[1]));
      setActiveSection('recipe');
      return;
    }

    // Extract search query from hash e.g. #search?q=pasta
    if (hash.startsWith('search')) {
      const params = new URLSearchParams(hash.replace('search?', ''));
      setSearchQuery(params.get('q') || '');
      setActiveSection('search');
      setRecipeDetailId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hash === 'recipes') {
      setActiveSection('recipes');
      setRecipeDetailId(null);
    } else {
      setActiveSection(hash);
      setRecipeDetailId(null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const renderSection = () => {
    if (activeSection === 'recipe' && recipeDetailId) {
      return (
        <RecipeDetail recipeId={recipeDetailId} onBack={() => (window.location.hash = 'recipes')} />
      );
    }

    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            <FeaturedRecipes />
            <Facts />
          </>
        );
      case 'about':
        return <About />;
      case 'recipes':
        return <Recipes />;
      case 'search':
        return (
          <SearchResults
            query={searchQuery}
            onRecipeClick={(id) => {
              setRecipeDetailId(id);
              setActiveSection('recipe');
            }}
          />
        );
      case 'tracker':
        return <CalorieTracker />;
      case 'blog':
        return <Blog />;
      case 'payment':
        return <Payment />;
      case 'contact':
        return <Contact />;
      case 'signin':
        return <AuthSection />;
      default:
        return (
          <>
            <Hero />
            <FeaturedRecipes />
            <Facts />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Navbar activeSection={activeSection} setSearchQuery={setSearchQuery} />
      <main className="main-content">{renderSection()}</main>
      {activeSection !== 'recipe' && <Footer />}
    </div>
  );
}

export default App;
