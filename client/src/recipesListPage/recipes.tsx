import React, { useState } from 'react';
import axios from 'axios';
import './recipes.scss';
import { Link } from 'react-router-dom';
import { IncRecipe } from '../interfaces/incRecipes.interface';
import { useSetRecoilState } from 'recoil';
import { chosenRec } from '../recoil/atoms';

//all recipes.com for idea of display

function Recipes() {
  const [recipeList, setList] = useState<IncRecipe[]>();
  const setRecipe = useSetRecoilState(chosenRec);
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data);
  };
  const setGS = (recipe: IncRecipe) => {
    setRecipe(recipe);
  };
  if (!recipeList) {
    getRecipes();
  }
  return (
    <div>
      <div id="recipesLargeContainer">
        {recipeList
          ? recipeList.map((recipe) => (
              <Link id="link" to="/recipePage" onClick={() => setGS(recipe)}>
                <div key={recipe.uuid} id="recipeContainer">
                  <img id="firstPagePic" src={recipe.images.medium} alt={recipe.description}></img>
                  <h1 id="firstPageTitle">{recipe.title}</h1>
                  <p id="firstPageDesc">{recipe.description}</p>
                </div>
              </Link>
            ))
          : ''}
      </div>
    </div>
  );
}

export default Recipes;
