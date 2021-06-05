import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import axios from 'axios';
import './recipePage.scss';
import { Specials } from '../interfaces/specials.interface';
import { Ingredient } from '../interfaces/incRecipes.interface';
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core';

function RecipePage() {
  const sentRec = useRecoilValue(chosenRec);
  const [specials, setSpecials] = useState<Specials[]>();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    const getSpecials = async () => {
      const response = await axios.get('http://localhost:3001/specials');
      setSpecials(response.data);
    };
    getSpecials();
  }, []);
  const findSpecials = (ingredient: Ingredient) => {
    if (!specials) {
      return [];
    }
    const matches = [];
    for (const special of specials) {
      if (special.ingredientId === ingredient.uuid) {
        matches.push(special);
      }
    }
    return matches;
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  //1. fix modal to display just 1 special item info
  //2. fix checkbox to work for each ingredient and change css of checkbox
  //3. create input page ("+" button with material Icon on the bottom recipe page that opens a modal with a form to input a new recipe or special)
  //4. edit recipes and specials page ("edit document" button with material Icon on other side of recipe page that opens a modal with the option to edit specials or recipes.)

  return (
    <div id="recPageBack">
      {sentRec ? (
        <div id="recContainer">
          <h1 id="recipeTitle">{sentRec.title}</h1>
          <p id="recipeDesc">{sentRec.description}</p>
          <div id="recipeImageContainer">
            <img
              alt={sentRec.description}
              src={sentRec.images.medium}
              id="recipeImage"
            ></img>
          </div>
          <div id="miniContainer">
            <h2 id="ingredientsTitle">Ingredients </h2>
            <h2 id="servingsTitle">
              Original recipe yields {sentRec.servings} servings
            </h2>
          </div>
          <ul id="ingredientsList">
            {sentRec.ingredients.map((ingredient) => (
              <li key={ingredient.uuid} id="ingredient">
                {' '}
                <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                {ingredient.amount} {ingredient.measurement} {ingredient.name}
                <div>
                  {findSpecials(ingredient).map((special) => (
                    <div id="specialBtnContainer">
                      <Button id="specialBtn" onClick={handleClickOpen}>
                        Click for specials on this item!
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        id="specialContainer"
                      >
                        <DialogTitle>Special!</DialogTitle>
                        <List key={special.uuid} id="special">
                          <ListItem id="specialTitle">
                            What: {special.title}
                          </ListItem>
                          <ListItem id="specialText">
                            Where: {special.text}
                          </ListItem>
                        </List>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <h2 id="directionsTitle">Directions </h2>
          <ol id="directionsList">
            {sentRec.directions.map((direction, index) => (
              <li key={index} id="direction">
                {direction.instructions}
              </li>
            ))}
          </ol>
          <div id="buttonContainer">
            <Link id="backLink" to="/">
              <Button id="backButton">Back to recipes</Button>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default RecipePage;
