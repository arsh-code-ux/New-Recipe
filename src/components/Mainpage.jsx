import React, { useState } from 'react';
import Mealcards from './Mealcards';
import Mealinfo from './Mealinfo';

const Mainpage = () => {
   const [data, setData] =  useState();
   const [search, setseach] = useState("");
   const [msg, setmsg] = useState("");

  const handleInput = (e) => {
    setseach(e.target.value)
  }

    const myFun = async () => {
      if(search === ""){
        setmsg("Please enter something.");
      } else{
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            const res = await get.json();
            // console.log(res.meals); 
            setData(res.meals) 
            setmsg(""); 
      }
    }
  // console.log(data);
    
    return (
      <>
      <h1 className='heading'>Food Recipe App</h1>
      <div className="container">
        <div className="searchBar">
            <input type="text" placeholder="search dishes" onChange={handleInput}/>
            <button onClick={myFun}>search</button>
        </div>
      </div>
        <h3>{msg}</h3>
    <div>
      <Mealcards detail={data}/>
    </div>
      </>
    )
}
export default Mainpage;
