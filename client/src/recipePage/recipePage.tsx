import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import axios from 'axios';
import './recipePage.scss';
import { Specials } from '../interfaces/specials.interface';
import { Ingredient, Direction } from '../interfaces/incRecipes.interface';
import { Button, Checkbox, Dialog, List, ListItem } from '@material-ui/core';

function RecipePage() {
  const sentRec = useRecoilValue(chosenRec);
  const [specials, setSpecials] = useState<Specials[]>();
  const [currentSpecial, setCurrentSpecial] = useState<Specials>();
  const [checkedArray, setCheckedArray] = useState<
    { id: string; checked: boolean }[]
  >([]);
  const history = useHistory();
  useEffect(() => {
    if (!sentRec.uuid) {
      history.push('/');
    }
    const getSpecials = async () => {
      const response = await axios.get('http://localhost:3001/specials');
      setSpecials(response.data);
    };
    getSpecials();
  }, []);
  useEffect(() => {
    const checkListArray = sentRec.ingredients.map((ingredient) => ({
      id: ingredient.uuid,
      checked: false,
    }));
    setCheckedArray(checkListArray);
  }, [sentRec.ingredients]);
  const checkForCheck = (ingredientId: string) => {
    const isChecked = checkedArray.find(
      (item) => item.id === ingredientId
    )?.checked;
    return !!isChecked;
  };
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
  const handleChange = (ingredientId: string) => {
    const checkedArrayClone = [...checkedArray];
    for (const item of checkedArrayClone) {
      if (item.id === ingredientId) {
        item.checked = !item.checked;
        break;
      }
    }
    setCheckedArray(checkedArrayClone);
  };

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
          <hr></hr>
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
                <Checkbox
                  checked={checkForCheck(ingredient.uuid)}
                  onChange={() => handleChange(ingredient.uuid)}
                ></Checkbox>
                {ingredient.amount} {ingredient.measurement} {ingredient.name}
                <div>
                  {findSpecials(ingredient).map((special) => (
                    <div id="specialBtnContainer">
                      <Button
                        key={special.uuid}
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
              <h2 id="saleItem">
                Special!<hr></hr>
              </h2>
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
          <hr></hr>
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
