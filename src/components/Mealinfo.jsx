import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Mealinfo() {
    const { mealid } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const getInfo = async () => {
            setLoading(true);
            setError('');

            try {
                const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`, {
                    signal: controller.signal,
                });
                const data = await get.json();
                setInfo(data.meals?.[0] ?? null);

                if (!data.meals?.[0]) {
                    setError('Recipe not found.');
                }
            } catch (fetchError) {
                if (fetchError.name !== 'AbortError') {
                    setError('Unable to load recipe details right now.');
                }
            } finally {
                setLoading(false);
            }
        };

        getInfo();

        return () => controller.abort();
    }, [mealid]);

    const ingredients = useMemo(() => {
        if (!info) {
            return [];
        }

        return Array.from({ length: 20 }, (_, index) => {
            const ingredient = info[`strIngredient${index + 1}`];
            const measure = info[`strMeasure${index + 1}`];

            if (!ingredient || ingredient.trim() === '') {
                return null;
            }

            return `${ingredient}${measure && measure.trim() ? ` - ${measure}` : ''}`;
        }).filter(Boolean);
    }, [info]);

    const steps = info?.strInstructions
        ? info.strInstructions
            .split('. ')
            .map((step) => step.trim())
            .filter(Boolean)
        : [];

    if (loading) {
        return (
            <div className="meal-detail-page">
                <div className="detail-shell detail-shell--loading">
                    <div className="skeleton-box detail-hero__image" />
                    <div className="detail-copy">
                        <div className="skeleton-line skeleton-line--short" />
                        <div className="skeleton-line" />
                        <div className="skeleton-line" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !info) {
        return (
            <div className="meal-detail-page">
                <div className="detail-shell detail-empty-state">
                    <h1>Recipe unavailable</h1>
                    <p>{error || 'This recipe could not be loaded.'}</p>
                    <Link className="primary-link" to="/recipes">
                        Back to search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="meal-detail-page">
            <article className="detail-shell">
                <div className="detail-hero">
                    <div className="detail-media-wrap">
                        <img className="detail-hero__image" src={info.strMealThumb} alt={info.strMeal} />
                    </div>

                    <div className="detail-header">
                        <span className="detail-kicker">{info.strArea || 'Global favorite'}</span>
                        <h1>{info.strMeal}</h1>

                        <div className="detail-submeta">
                            <span>{info.strCategory || 'Featured dish'}</span>
                            <span>•</span>
                            <span>{ingredients.length} ingredients</span>
                        </div>

                        <div className="detail-tags">
                            {info.strTags ? info.strTags.split(',').map((tag) => <span key={tag}>{tag}</span>) : <span>Chef approved</span>}
                        </div>
                    </div>
                </div>

                <div className="recipe-content-grid">
                    <section className="detail-card">
                        <h2>Ingredients</h2>
                        <div className="ingredient-list">
                            {ingredients.map((ingredient) => (
                                <div key={ingredient} className="ingredient-item">
                                    <span className="ingredient-dot" aria-hidden="true" />
                                    <span>{ingredient}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="detail-card detail-card--instructions">
                        <h2>Instructions</h2>
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
                    {info.strYoutube ? (
                        <a className="primary-link" href={info.strYoutube} target="_blank" rel="noreferrer">
                            Watch video
                        </a>
                    ) : null}
                    {info.strSource ? (
                        <a className="secondary-link" href={info.strSource} target="_blank" rel="noreferrer">
                            Original source
                        </a>
                    ) : null}
                </div>
            </article>
        </div>
    )
}

export default Mealinfo;