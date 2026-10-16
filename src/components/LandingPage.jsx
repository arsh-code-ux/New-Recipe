import React from 'react';
import { Link } from 'react-router-dom';

const featureChips = ['Healthy picks', 'Quick meals', 'Chef-style recipes', 'Step-by-step guidance'];

const discoverySteps = [
  { title: 'Search', text: 'Browse by keyword, cuisine, or ingredient to find dishes that match your mood.' },
  { title: 'Choose', text: 'Open any recipe card to inspect ingredients, cooking steps, and flavor notes.' },
  { title: 'Cook', text: 'Save favorites and follow the recipe all the way to a delicious result at home.' },
];

const categories = [
  { name: 'Breakfast', detail: 'Quick bites, protein-rich starts, and cozy early-morning favorites.' },
  { name: 'Lunch', detail: 'Balanced meals that are filling, fresh, and easy to prep ahead.' },
  { name: 'Dinner', detail: 'Comforting classics and elevated mains for family dinners and date nights.' },
  { name: 'Desserts', detail: 'Sweet treats and indulgent finishes for every celebration.' },
];

const featuredMeals = [
  { name: 'Crispy Chicken Bowl', tag: 'High protein', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80' },
  { name: 'Garden Pasta', tag: 'Fresh & light', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80' },
  { name: 'Berry Dessert', tag: 'Sweet finish', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80' },
];

function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-section landing-section--hero" id="top">
        <div className="hero-card hero-card--wide">
          <div className="hero-copy">
            <span className="eyebrow">Fresh flavors, smarter cooking</span>
            <h1>Find your next favorite meal.</h1>
            <p>
              Discover handpicked recipes, explore inspiring dishes, and open any meal to see ingredients,
              cooking steps, and recipe videos in a clean browsing experience.
            </p>

            <div className="hero-metrics">
              <div>
                <strong>200+</strong>
                <span>global recipes</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>easy browsing</span>
              </div>
              <div>
                <strong>Saved</strong>
                <span>favorite picks</span>
              </div>
            </div>

            <div className="hero-pills">
              {featureChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel__badge">Recipe discovery</div>
            <p>
              Start on the landing page, move to the recipe explorer, search your favorite dishes, and click any
              card for full instructions and a cooking video.
            </p>
            <Link className="primary-link" to="/recipes">
              Explore recipes
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="content-card">
          <div className="section-head">
            <span className="eyebrow">Why people love it</span>
            <h2>Everything you need for everyday cooking.</h2>
          </div>

          <div className="landing-feature-grid">
            {discoverySteps.map((item) => (
              <article key={item.title} className="info-tile">
                <span className="tile-number">0{discoverySteps.indexOf(item) + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="content-card">
          <div className="section-head">
            <span className="eyebrow">Popular picks</span>
            <h2>Browse by meal mood.</h2>
          </div>

          <div className="landing-category-grid">
            {categories.map((category) => (
              <article key={category.name} className="category-card">
                <h3>{category.name}</h3>
                <p>{category.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="content-card">
          <div className="section-head">
            <span className="eyebrow">Featured dishes</span>
            <h2>Fresh ideas for your next kitchen moment.</h2>
          </div>

          <div className="landing-showcase-grid">
            {featuredMeals.map((meal) => (
              <article key={meal.name} className="showcase-card">
                <img src={meal.image} alt={meal.name} />
                <div className="showcase-copy">
                  <span>{meal.tag}</span>
                  <h3>{meal.name}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="cta-banner">
          <div>
            <span className="eyebrow">Ready to explore?</span>
            <h2>Find a recipe that matches your cravings.</h2>
          </div>
          <Link className="primary-link" to="/recipes">
            Explore recipes
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
