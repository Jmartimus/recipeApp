import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { incRecipe } from '../interfaces/incRecipes.interface';
import { chosenRec } from '../recoil/atoms';
import axios from 'axios';
import './recipePage.scss';
import { Specials } from '../interfaces/specials.interface';

function RecipePage() {
  const sentRec: incRecipe = useRecoilValue(chosenRec);
  const [recipe, setRecipe] = useState<incRecipe>();
  const [specials, setSpecials] = useState<Specials[]>();
  const getSpecials = async () => {
    const response = await axios.get('http://localhost:3001/specials');
    setSpecials(response.data);
  };
  // const findSpecial = (specials: Specials[]) => {
  //   const { uuid } = specials;
  //   if (recipe) {
  //     const matches = recipe.ingredients.filter(
  //       (ingredientId) =>
  //         ingredientId.uuid.includes(uuid)
  //     );
  //   }
  // }
  // if (!specials) {
  //   getSpecials();
  // }
  // console.log(specials)
  if (recipe !== sentRec) {
    setRecipe(sentRec);
  }
  return (
    <div id="recPageBack">
      {recipe ? (
        <div id="recContainer">
          <img alt={recipe.description} src={recipe.images.medium}></img>
          <h1 id="recipeTitle">{recipe.title}</h1>
          <p id="recipeDesc">{recipe.description}</p>

          <div id="miniContainer">
            <h2 id="ingredientsTitle">Ingredients </h2>
            <h2 id="servingsTitle">
              Original recipe yeilds {recipe.servings} servings
            </h2>
          </div>
          <ul id="ingredientsList">
            {recipe.ingredients.map((ingredients) => (
              <li id="ingredient">
                {' '}
                <input type="checkbox" />
                {ingredients.amount} {ingredients.measurement}{' '}
                {ingredients.name}
              </li>
            ))}
          </ul>
          <h2 id="directionsTitle">Directions </h2>
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
