import React from 'react';
import { NavLink } from 'react-router-dom';

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

const Mealcards = ({ detail = [], loading = false, favorites = [], onToggleFavorite }) => {
        const isSaved = (mealId) => favorites.some((meal) => meal.idMeal === mealId);

    return (
                <div className='meals-grid'>
                        {loading
                            ? skeletonCards.map((card) => (
                                    <article className='meal-card meal-card--loading' key={card}>
                                        <div className='meal-card__image skeleton-box' />
                                        <div className='skeleton-line skeleton-line--short' />
                                        <div className='skeleton-line' />
                                        <div className='meal-card__actions'>
                                            <div className='skeleton-pill' />
                                            <div className='skeleton-pill' />
                                        </div>
                                    </article>
                                ))
                            : detail.map((currentItem) => (
                                    <article className='meal-card' key={currentItem.idMeal}>
                                        <div className='meal-card__image-wrap'>
                                            <img src={currentItem.strMealThumb} alt={currentItem.strMeal} loading='lazy' />
                                            <span className='meal-badge'>{currentItem.strArea || 'World cuisine'}</span>
                                        </div>
                                        <div className='meal-card__content'>
                                            <h3>{currentItem.strMeal}</h3>
                                            <p>{currentItem.strCategory || 'Signature dish'} recipe with step-by-step instructions.</p>
                                        </div>
                                        <div className='meal-card__actions'>
                                            <NavLink className='primary-link' to={`/${currentItem.idMeal}`}>
                                                View recipe
                                            </NavLink>
                                            <button
                                                type='button'
                                                className='secondary-button'
                                                onClick={() => onToggleFavorite?.(currentItem)}
                                            >
                                                {isSaved(currentItem.idMeal) ? 'Saved' : 'Save'}
                                            </button>
                                        </div>
                                    </article>
                                ))}
        </div>
    )
}

export default Mealcards;