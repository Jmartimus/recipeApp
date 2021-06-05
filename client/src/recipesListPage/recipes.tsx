import React, { useState } from 'react';
import axios from 'axios';
import './recipes.scss';
import { Link } from 'react-router-dom';
import { Recipe } from '../interfaces/incRecipes.interface';
import { useSetRecoilState } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import { Dialog, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import { AddRecipe } from '../addAndEdit/add';


function Recipes() {
  const [recipeList, setList] = useState<Recipe[]>();
  const [open, setOpen] = React.useState(false);
  const setRecipe = useSetRecoilState(chosenRec);
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data);
  };
  const setGS = (recipe: Recipe) => {
    setRecipe(recipe);
  };
  if (!recipeList) {
    getRecipes();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div id="background">
      <div id="recipesLargeContainer">
        {recipeList
          ? recipeList.map((recipe) => (
              <Link
                key={recipe.uuid}
                id="link"
                to="/recipePage"
                onClick={() => setGS(recipe)}
              >
                <div id="recipeContainer">
                  {/* <img
                    id="firstPagePic"
                    src={recipe.images.medium}
                    alt={recipe.description}
                  ></img> */}
                  <h1 id="firstPageTitle">{recipe.title}</h1>
                  <p id="firstPageDesc">{recipe.description}</p>
                </div>
              </Link>
            ))
          : ''}
      </div>
      <div id="buttonBar">
        <div id="btnContainer">
          <IconButton id="addBtn" onClick={handleClickOpen}>
            <AddCircle fontSize="large"/>
          </IconButton>
          <IconButton id="editBtn" onClick={handleClickOpen}>
            <EditIcon fontSize="large"/>
          </IconButton>
          <Dialog open={open} onClose={handleClose}><AddRecipe /></Dialog>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
