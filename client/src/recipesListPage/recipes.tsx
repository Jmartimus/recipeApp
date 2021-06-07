import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './recipes.scss';
import { useHistory } from 'react-router-dom';
import { Recipe } from '../interfaces/incRecipes.interface';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import { Dialog, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { AddRecipe } from '../add/add';

function Recipes() {
  const [recipeList, setList] = useState<Recipe[]>();
  const sentRec = useRecoilValue(chosenRec);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const setRecipe = useSetRecoilState(chosenRec);
  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    setList(response.data);
  };
  const history = useHistory();
  useEffect(() => {
    setRecipe({ ...sentRec, uuid: '' });
    setMounted(true);
  }, []);
  useEffect(() => {
    if (sentRec.uuid && mounted) {
      history.push('/recipePage');
    }
  }, [sentRec, mounted]);
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
              <div key={recipe.uuid} id="link" onClick={() => setGS(recipe)}>
                <div id="recipeContainer">
                  <img
                    id="firstPagePic"
                    src={recipe.images.medium}
                    alt={recipe.description}
                  ></img>
                  <h1 id="firstPageTitle">
                    <hr></hr>
                    {recipe.title}
                  </h1>
                  <p id="firstPageDesc">{recipe.description}</p>
                </div>
              </div>
            ))
          : ''}
      </div>
      <div id="buttonBar">
        <div id="btnContainer">
          <IconButton id="addBtn" onClick={handleClickOpen}>
            <AddCircle fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <AddRecipe />
      </Dialog>
    </div>
  );
}

export default Recipes;
