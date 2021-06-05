import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chosenRec } from '../recoil/atoms';
import axios from 'axios';
import './recipePage.scss';
import { Specials } from '../interfaces/specials.interface';
import { Ingredient } from '../interfaces/incRecipes.interface';

function SentRecPage() {
  const sentRec = useRecoilValue(chosenRec);
  const [specials, setSpecials] = useState<Specials[]>();
  useEffect(() => {
    const getSpecials = async () => {
      const response = await axios.get('http://localhost:3001/specials');
      setSpecials(response.data);
    };
    getSpecials();
  }, []);
  
  const findSpecial = (specials: Specials[]) => {
    specials.map((special) => {
      const specialMatch = sentRec.ingredients.find(
        (ingredient) => ingredient.uuid === special.ingredientId
      );
      console.log(specialMatch);
    });
  };
  const findSpecials = (ingredient: Ingredient) => {
    if (!specials) {
      return [];
    }
    const matches = []
    for (const special of specials) {
      if (special.ingredientId === ingredient.uuid) {
        matches.push(special);
      }
    }
    return matches;
  };


  if (specials) {
    findSpecial(specials);
  }

  return (
    <div id="recPageBack">
      {sentRec ? (
        <div id="recContainer">
          <img alt={sentRec.description} src={sentRec.images.medium}></img>
          <h1 id="sentRecTitle">{sentRec.title}</h1>
          <p id="sentRecDesc">{sentRec.description}</p>

          <div id="miniContainer">
            <h2 id="ingredientsTitle">Ingredients </h2>
            <h2 id="servingsTitle">
              
              Original recipe yields {sentRec.servings} servings
            </h2>
          </div>
          <ul id="ingredientsList">
            {sentRec.ingredients.map((ingredient) => (
              <li id="ingredient">
                {' '}
                <input type="checkbox" />
                {ingredient.amount} {ingredient.measurement}{' '}
                {ingredient.name}<div>{findSpecials(ingredient).map(special => <div>{special.title}</div>)}</div>
              </li>
            ))}
          </ul>
          <h2 id="directionsTitle">Directions </h2>
          <ol id="directionsList">
            {sentRec.directions.map((directions) => (
              <li id="direction">{directions.instructions}</li>
            ))}
          </ol>
          <Link to="/">
            <button>Back to sentRecs</button>
          </Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default SentRecPage;
