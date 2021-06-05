import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import axios from 'axios';
import './recipePage.scss';
import { Specials } from '../interfaces/specials.interface';
import { Ingredient, Direction } from '../interfaces/incRecipes.interface';
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
  const [currentSpecial, setCurrentSpecial] = useState<Specials>();
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>();
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  //1. fix checkbox to work for each ingredient and change css of checkbox
  //2. create input page ("+" button with material Icon on the bottom recipe page that opens a modal with a form to input a new recipe or special)
  //3. edit recipes and specials page ("edit document" button with material Icon on other side of recipe page that opens a modal with the option to edit specials or recipes.)
  //4. background moves when modal opens 

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
            {sentRec.ingredients.map((ingredient: Ingredient) => (
              <li key={ingredient.uuid} id="ingredient">
                {' '}
                <Checkbox checked={checked} onClick={() => setCurrentIngredient(ingredient)} onChange={handleChange}></Checkbox>
                {ingredient.amount} {ingredient.measurement} {ingredient.name}
                <div>
                  {findSpecials(ingredient).map((special) => (
                    <div id="specialBtnContainer">
                      <Button
                        id="specialBtn"
                        onClick={() => setCurrentSpecial(special)}
                      >
                        Click for specials on this item!
                      </Button>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {currentSpecial ? (
            <Dialog
              open={Boolean(currentSpecial)}
              onClick={() => setCurrentSpecial(undefined)}
              id="specialContainer"
            >
              <DialogTitle>Special!</DialogTitle>
              <List key={currentSpecial.uuid} id="special">
                <ListItem id="specialTitle">
                  What: {currentSpecial.title}
                </ListItem>
                <ListItem id="specialText">
                  Where: {currentSpecial.text}
                </ListItem>
              </List>
            </Dialog>
          ) : (
            ''
          )}
          <h2 id="directionsTitle">Directions </h2>
          <ol id="directionsList">
            {sentRec.directions.map((direction: Direction, i: number) => (
              <li key={i} id="direction">
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
