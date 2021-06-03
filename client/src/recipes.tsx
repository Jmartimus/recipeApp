import React, {useState} from 'react';
import axios from 'axios';

//make an interface for each type of incoming information like in the useStatehook

function Recipes() {
  const [recipeList, setList] = useState<{uuid:string, title: string}[]>();
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data)
  }
  console.log(recipeList);
  console.log(recipeList ? recipeList[0].uuid : '')

  return (
    <div>
      <button onClick={getRecipes}></button>
      <ul>{recipeList ? recipeList.map((recipe) => ( <li key={recipe.uuid}>{recipe.title}</li>)): '' }</ul>

    </div>
  );
}

export default Recipes;
