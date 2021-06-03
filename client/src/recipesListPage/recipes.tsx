import React, { useState } from 'react';
import axios from 'axios';
import './recipes.scss';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import RecipePage from '../recipePage/recipePage';
import { incRecipe } from '../incRecipes.interface';

//all recipes.com for idea of display

function Recipes() {
  const [recipeList, setList] = useState<incRecipe[]>();
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data);
  };
  console.log(recipeList);
  console.log(recipeList ? typeof recipeList[0].images.full : '');
  if (!recipeList) {
    getRecipes();
  }

  return (
    <Router>
      <div>
        {/* <img alt="Stuff" src={recipeList ? recipeList[0].images.full : ''}></img> */}
        {/* <img src="/img/italian_meatballs.jpg"></img> */}
        <div id="recipesLargeContainer">
          {recipeList
            ? recipeList.map((recipe) => (
              <div key={recipe.uuid} id="recipeContainer">
                {/* <Route path="/recipePage">
                  <RecipePage props={recipe}/>
          </Route> */}
                  {/* <img id="firstPagePic" src={recipe.images.small} alt={recipe.description}></img> */}
                  <img
                    id="firstPagePic"
                    src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                >
                  {/* <Link to="/recipePage"></Link> */}
                </img>
                  <h1 id="firstPageTitle">{recipe.title}</h1>
                  <p id="firstPageDesc">{recipe.description}</p>
                  {/* <p>Servings: {recipe.servings}</p> */}
                  {/* <ul>
                    {recipe.ingredients.map((ingredients) => (
                      <li>{ingredients.amount} {ingredients.measurement} of {ingredients.name}: </li>
                    ))}
                  </ul> */}
                </div>
              ))
            : ''}
        </div>
      </div>
      </Router>

  );
}

export default Recipes;
