import React, { useState } from 'react';
import axios from 'axios';
import './recipes.scss';
import { Link } from 'react-router-dom';
import { incRecipe } from '../incRecipes.interface';
import { useSetRecoilState } from 'recoil';
import { chosenRec } from '../recoil/atoms';

//all recipes.com for idea of display

function Recipes() {
  const [recipeList, setList] = useState<incRecipe[]>();
  const setRecipe = useSetRecoilState(chosenRec);
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data);
  };
  const setGS = (recipe: incRecipe) => {
    setRecipe(recipe);
  };
  if (!recipeList) {
    getRecipes();
  }

  return (
    <div>
      {/* <img alt="Stuff" src={recipeList ? recipeList[0].images.full : ''}></img> */}
      {/* <img src="/img/italian_meatballs.jpg"></img> */}
      <div id="recipesLargeContainer">
        {recipeList
          ? recipeList.map((recipe) => (
              <Link id="link" to="/recipePage" onClick={() => setGS(recipe)}>
                <div key={recipe.uuid} id="recipeContainer">
                  {/* <img id="firstPagePic" src={recipe.images.small} alt={recipe.description}></img> */}
                  <img
                    id="firstPagePic"
                    src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                  ></img>
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
