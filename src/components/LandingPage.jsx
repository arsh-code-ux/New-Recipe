import React from 'react';
import { Link } from 'react-router-dom';

const featureChips = ['Healthy picks', 'Quick meals', 'Chef-style recipes', 'Step-by-step guidance'];

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
              Start from the landing page, open the recipe explorer, search your favorite dishes, and click any
              card to view the full recipe details and watch tutorial videos.
            </p>
            <Link className="primary-link" to="/recipes">
              Explore recipes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
