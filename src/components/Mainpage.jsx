import React, { useEffect, useMemo, useState } from 'react';
import Mealcards from './Mealcards';

const featurePills = ['Handpicked dishes', 'Fast search', 'Recipe details', 'Favorites saved'];
const quickSearches = ['chicken', 'pasta', 'dessert', 'salad', 'soup', 'vegan'];

const Mainpage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('chicken');
  const [submittedSearch, setSubmittedSearch] = useState('chicken');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recipe-favorites')) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchMeals = async () => {
      const trimmedTerm = submittedSearch.trim();

      if (!trimmedTerm) {
        setData([]);
        setMsg('Please enter something meaningful to search.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setMsg('');

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(trimmedTerm)}`
        );
        const result = await response.json();
        const meals = result.meals ?? [];
        setData(meals);
        setSelectedMeal(meals[0] ?? null);
        setMsg(meals.length ? '' : `No recipes found for "${trimmedTerm}".`);
      } catch {
        setData([]);
        setSelectedMeal(null);
        setMsg('Unable to load recipes right now. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [submittedSearch]);

  const heroMetrics = useMemo(
    () => [
      { value: '200+', label: 'global recipes' },
      { value: '100%', label: 'screen-fit sections' },
      { value: 'Local', label: 'favorite storage' },
    ],
    []
  );

  const ingredients = useMemo(() => {
    if (!selectedMeal) return [];

    return Array.from({ length: 20 }, (_, index) => {
      const ingredient = selectedMeal[`strIngredient${index + 1}`];
      const measure = selectedMeal[`strMeasure${index + 1}`];

      if (!ingredient || ingredient.trim() === '') {
        return null;
      }

      return `${ingredient}${measure && measure.trim() ? ` - ${measure}` : ''}`;
    }).filter(Boolean);
  }, [selectedMeal]);

  const steps = useMemo(() => {
    if (!selectedMeal?.strInstructions) return [];

    return selectedMeal.strInstructions
      .split('. ')
      .map((step) => step.trim())
      .filter(Boolean)
      .slice(0, 8);
  }, [selectedMeal]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  const handleQuickSearch = (term) => {
    setSearch(term);
    setSubmittedSearch(term);
  };

  const toggleFavorite = (meal) => {
    setFavorites((current) => {
      const isAlreadySaved = current.some((item) => item.idMeal === meal.idMeal);

      if (isAlreadySaved) {
        return current.filter((item) => item.idMeal !== meal.idMeal);
      }

      return [...current, meal];
    });
  };

  const selectMeal = (meal) => {
    setSelectedMeal(meal);
    document.getElementById('recipe-focus')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const favoriteMeals = useMemo(
    () => favorites.slice(0, 4),
    [favorites]
  );

  return (
    <main className="landing-page">
      <section className="landing-section landing-section--hero" id="top">
        <div className="hero-card hero-card--wide">
          <div className="hero-copy">
            <span className="eyebrow">Fresh flavors, smarter cooking</span>
            <h1>Find your next favorite meal.</h1>
            <p>
              A warm, modern recipe landing page built to guide visitors from discovery to delicious detail with one smooth scroll and a clear search flow.
            </p>
            <div className="hero-metrics">
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-pills">
              {featurePills.map((pill) => (
                <span key={pill}>{pill}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel__badge">Built for easy browsing</div>
            <p>
              Use the quick searches below to explore dishes, open a recipe card, and jump directly into ingredients, steps, and saved favorites.
            </p>
            <a className="primary-link" href="#discover">
              Explore recipes
            </a>
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--discover" id="discover">
        <div className="section-card section-card--split">
          <div>
            <span className="eyebrow">Discover</span>
            <h2>Search the recipe library</h2>
            <p className="section-lead">
              Use quick chips or free text search. The results grid stays responsive and adapts to desktop, tablet, and mobile screens.
            </p>
          </div>

          <form className="search-panel search-panel--compact" onSubmit={handleSubmit}>
            <label className="search-label" htmlFor="recipe-search">
              Find your next meal
            </label>
            <div className="search-bar">
              <input
                id="recipe-search"
                type="search"
                placeholder="Search dishes, ingredients, or cuisine..."
                value={search}
                onChange={handleInput}
              />
              <button type="submit">Search</button>
            </div>

            <div className="quick-filters" aria-label="Quick recipe searches">
              {quickSearches.map((term) => (
                <button type="button" key={term} onClick={() => handleQuickSearch(term)}>
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>

        <div className="section-note">
          <span>{favorites.length} saved recipe{favorites.length === 1 ? '' : 's'}</span>
          <span>{data.length} search result{data.length === 1 ? '' : 's'}</span>
        </div>

        {msg ? <p className="status-message status-message--center">{msg}</p> : null}

        <Mealcards
          detail={data}
          loading={loading}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectMeal={selectMeal}
        />
      </section>

      <section className="landing-section landing-section--focus" id="recipe-focus">
        <div className="section-card section-card--focus">
          <div className="section-heading section-heading--large">
            <div>
              <span className="eyebrow">Focus section</span>
              <h2>{selectedMeal ? selectedMeal.strMeal : 'Select a recipe to focus'}</h2>
            </div>
            <p>
              {selectedMeal ? `${selectedMeal.strArea || 'Global'} • ${selectedMeal.strCategory || 'Signature dish'}` : 'Use the cards above to switch the detail view.'}
            </p>
          </div>

          {selectedMeal ? (
            <div className="focus-layout">
              <div className="focus-media">
                <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
              </div>

              <div className="focus-copy">
                <div className="detail-tags detail-tags--large">
                  {selectedMeal.strTags ? selectedMeal.strTags.split(',').map((tag) => <span key={tag}>{tag}</span>) : <span>Chef approved</span>}
                </div>

                <div className="focus-blocks">
                  <section className="detail-card detail-card--soft">
                    <h3>Ingredients</h3>
                    <ul className="ingredient-list">
                      {ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="detail-card detail-card--soft">
                    <h3>Instructions</h3>
                    <div className="instruction-list">
                      {steps.map((step, index) => (
                        <p key={`${index}-${step}`}>
                          <strong>Step {index + 1}.</strong> {step}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="detail-actions">
                  <button type="button" className="secondary-button" onClick={() => toggleFavorite(selectedMeal)}>
                    {favorites.some((item) => item.idMeal === selectedMeal.idMeal) ? 'Saved to favorites' : 'Save to favorites'}
                  </button>
                  {selectedMeal.strYoutube ? (
                    <a className="primary-link" href={selectedMeal.strYoutube} target="_blank" rel="noreferrer">
                      Watch video
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="detail-empty-state detail-empty-state--inline">
              <p>No recipe selected yet. Pick one from the search results above.</p>
            </div>
          )}
        </div>
      </section>

      <section className="landing-section landing-section--favorites">
        <div className="section-card section-card--favorites">
          <div className="section-heading section-heading--large">
            <div>
              <span className="eyebrow">Saved collection</span>
              <h2>Your favorite recipes</h2>
            </div>
            <p>Stored locally in your browser.</p>
          </div>

          {favoriteMeals.length ? (
            <div className="favorites-grid">
              {favoriteMeals.map((meal) => (
                <button key={meal.idMeal} type="button" className="favorite-card" onClick={() => selectMeal(meal)}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                  <div>
                    <strong>{meal.strMeal}</strong>
                    <span>{meal.strArea || 'World cuisine'}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="detail-empty-state detail-empty-state--inline">
              <p>Save recipes from the grid to build a personalized short list here.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Mainpage;
