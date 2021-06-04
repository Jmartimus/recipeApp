import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { incRecipe } from '../incRecipes.interface';
import { chosenRec } from '../recoil/atoms';
import './recipePage.scss';

function RecipePage() {
  const sentRec: incRecipe = useRecoilValue(chosenRec);
  const [recipe, setRecipe] = useState<incRecipe>();
  if (recipe !== sentRec) { setRecipe(sentRec); }
  return (
    <div id="recPageBack">
      {recipe ? (
        <div id="recContainer">
          <img alt={recipe.description} src={recipe.images.medium}></img>
          <h1 id="recipeTitle">{recipe.title}</h1>
          <p id="recipeDesc">{recipe.description}</p>
          <p id="servingsTitle">Servings: {recipe.servings}</p>
          <h2 id="ingredientsTitle">Ingredients: </h2>
          <ul id="ingredientsList">
            {recipe.ingredients.map((ingredients) => (
              <li id="ingredient"> <input type="checkbox"/>
                {ingredients.amount} {ingredients.measurement} {' '}
                {ingredients.name}
              </li>
            ))}
          </ul>
          <ol id="directionsList">
            {recipe.directions.map((directions) => (
              <li id="direction">{directions.instructions}</li>
            ))}
          </ol>
          <Link to="/">
        <button>Back to recipes</button>
      </Link>
        </div>
      ) : (
        ''
      )}

      
    </div>
  );
}

export default RecipePage;
