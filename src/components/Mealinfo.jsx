import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Mealinfo() {
    const { mealid } = useParams();
    const [info, setInfo] = useState()
    console.log(mealid);

    const getInfo = async () => {
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
        const data = await get.json();
        console.log(data.meals[0]);
        setInfo(data.meals[0]);
    }
     if(info != ""){
        getInfo();
     }
    return (
        <div className="mealinfoPage">
        {
            !info ? "Data not Found" :
            <div className='mealinfo'>
            <img className="infoImg" src={info.strMealThumb} alt={info.strMeal} /> 
            <div className='info'>
            <h1>Recipe Details</h1>
            <button>{info.strMeal}</button>
            <h3>Instruction's</h3>
            <p>{info.strInstructions}</p>
            </div>
        </div>

        }
        </div>
    )
}

export default Mealinfo;