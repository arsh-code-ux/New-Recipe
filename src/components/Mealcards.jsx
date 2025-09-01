import React from 'react';
// import './App.css'
import { NavLink } from 'react-router-dom';

const Mealcards = ({detail}) => {
    console.log(detail);
    return (
        <div className='meals'>
            {!detail ? "" : detail.map((currentItem) => {
                return (
                <div className='mealImg'>
                   <img src={currentItem.strMealThumb} alt={currentItem.name}/>
                   <p>{currentItem.strMeal}</p>
                   <NavLink to={`/${currentItem.idMeal}`}><button>Recipe</button></NavLink>
                   
                </div>
                
                )
              })
            }
        </div>
    )
}

export default Mealcards;