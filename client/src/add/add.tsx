import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {
  Direction,
  Ingredient,
  Recipe,
} from '../interfaces/incRecipes.interface';
import './add.scss';
import { timeStamper } from '../timestamp';
import { AddCircle } from '@material-ui/icons';
import { Specials } from '../interfaces/specials.interface';
import { useRecoilValue } from 'recoil';
import { ingredientList } from '../recoil/atoms';

export const AddRecipe = () => {
  const URL = 'http://localhost:3001/';
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    uuid: '',
    title: '',
    description: '',
    images: { full: '', medium: '', small: '' },
    servings: NaN,
    prepTime: NaN,
    cookTime: NaN,
    postDate: '',
    editDate: '',
    ingredients: [],
    directions: [
      {
        instructions: '',
        optional: false,
      },
    ],
  });
  const importedIngredientList = useRecoilValue(ingredientList);
  const [choice, setChoice] = useState<string>('');
  const [settingNewIngredient, setSettingNewIngredient] =
    useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    uuid: '',
    amount: 0,
    measurement: '',
    name: '',
  });
  const [settingNewDirection, setSettingNewDirection] =
    useState<boolean>(false);
  const [newDirection, setNewDirection] = useState<Direction>({
    instructions: '',
    optional: false,
  });
  const [newSpecial, setNewSpecial] = useState<Specials>({
    uuid: '',
    ingredientId: '',
    type: '',
    title: '',
    geo: '',
    text: '',
  });
  const [matchIngredient, setMatchedIngredient] = useState<Ingredient>();

  const getRecipes = async () => {
    const response = await axios.get('http://localhost:3001/recipes');
    console.log(response.data);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChoice(event.target.value as string);
  };
  const createRecipe = async () => {
    if (
      newRecipe.title !== '' &&
      newRecipe.description !== '' &&
      newRecipe.servings > 0 &&
      newRecipe.prepTime > 0 &&
      newRecipe.cookTime > 0
    ) {
      const response = await axios.post(`${URL}${'recipes'}`, {
        title: newRecipe.title,
        description: newRecipe.description,
        images: { full: '', medium: '', small: '' },
        servings: newRecipe.servings,
        prepTime: newRecipe.prepTime,
        cookTime: newRecipe.cookTime,
        postDate: timeStamper(),
        ingredients: [...newRecipe.ingredients],
        directions: [...newRecipe.directions],
      });
      setNewRecipe({
        uuid: '',
        title: '',
        description: '',
        images: { full: '', medium: '', small: '' },
        servings: NaN,
        prepTime: NaN,
        cookTime: NaN,
        postDate: '',
        editDate: '',
        ingredients: [],
        directions: [
          {
            instructions: '',
            optional: false,
          },
        ],
      });
      alert('Recipe created!');
    } else {
      alert('Fill all fields please');
    }
  };

  const createIngredient = () => {
    const finishIngredient = () => {
      setSettingNewIngredient(false);
      setNewRecipe({
        ...newRecipe,
        ingredients: [...newRecipe.ingredients, newIngredient],
      });
    };
    return (
      <Dialog
        open={settingNewIngredient}
        onClose={() => setSettingNewIngredient(false)}
        className="specialContainer"
      >
        <h1 id="addIngredientTitle">
          Add Ingredient<hr></hr>
        </h1>
        <FormControl className="ingDirFormContainer">
          <div className="inputContainer">
            <div className="inputRow">
              <p className="recipeInputTitles">Name</p>
              <TextField
                variant="outlined"
                className="ingDirInputFields"
                value={newIngredient.name}
                placeholder="name of ingredient"
                type="text"
                onChange={(e) =>
                  setNewIngredient({ ...newIngredient, name: e.target.value })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Measurement</p>
              <TextField
                variant="outlined"
                className="ingDirInputFields"
                value={newIngredient.measurement}
                placeholder="What measurement?"
                type="text"
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    measurement: e.target.value,
                  })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Amount</p>
              <TextField
                variant="outlined"
                className="ingDirInputFields"
                value={newIngredient.amount}
                placeholder="How many?"
                type="number"
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    amount: parseInt(e.target.value),
                  })
                }
              ></TextField>
            </div>
          </div>
          <Button onClick={finishIngredient} id="submitIngredient">
            Submit Ingredient
          </Button>
        </FormControl>
      </Dialog>
    );
  };
  const createDirection = () => {
    const finishDirection = () => {
      setSettingNewDirection(false);
      setNewRecipe({
        ...newRecipe,
        directions: [...newRecipe.directions, newDirection],
      });
    };
    return (
      <Dialog
        open={settingNewDirection}
        onClose={() => setSettingNewDirection(false)}
        className="specialContainer"
      >
        <h1 id="addRecipeTitle">
          Add Instruction<hr></hr>
        </h1>
        <FormControl className="ingDirFormContainer">
          <div className="inputContainer">
            <div className="inputRow">
              <p className="recipeInputTitles">Name</p>
              <TextField
                variant="outlined"
                value={newDirection.instructions}
                className="ingDirInputFields"
                placeholder="Write Instruction"
                type="text"
                onChange={(e) =>
                  setNewDirection({
                    ...newDirection,
                    instructions: e.target.value,
                  })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Step Optional?</p>
              <Select
                labelId=""
                variant="outlined"
                id="dropdownDir"
                value={newDirection.optional}
                onChange={(e) =>
                  setNewDirection({
                    ...newDirection,
                    optional: Boolean(e.target.value),
                  })
                }
              >
                <MenuItem value="false">False</MenuItem>
                <MenuItem value="true">True</MenuItem>
              </Select>
            </div>
            <Button onClick={finishDirection} id="submitDirection">
              Submit Direction
            </Button>
          </div>
        </FormControl>
      </Dialog>
    );
  };
  const matchIngredients = (chosenId: any) => {
    for (const ingredients of importedIngredientList) {
      for (const ingredient of ingredients) {
        if (ingredient.uuid === chosenId) {
          setMatchedIngredient(ingredient);
        }
      }
    }
    setNewSpecial({
      ...newSpecial,
      ingredientId: chosenId,
    });
  };
  const submitSpecial = async () => {
    if (
      newSpecial.title !== '' &&
      newSpecial.type !== '' &&
      newSpecial.text !== '' &&
      newSpecial.ingredientId !== ''
    ) {
      const response = await axios.post(`${URL}${'specials'}`, {
        uuid: '',
        ingredientId: newSpecial.ingredientId,
        type: newSpecial.type,
        title: newSpecial.title,
        geo: newSpecial.geo,
        text: newSpecial.text,
      });
      setNewSpecial({
        uuid: '',
        ingredientId: '',
        type: '',
        title: '',
        geo: '',
        text: '',
      });
      alert('Special created!');
    } else {
      alert('Special cannot be created. Try again later');
    }
  };

  return (
    <div id="addContainer">
      {choice === '' ? (
        <div id="largeFormContainer">
          <h1 id="firstFormTitle">
            Add a Recipe or Special Ingredient!<hr></hr>
          </h1>

          <FormControl id="formContainer">
            <InputLabel id="firstQuestion">What do you want to add?</InputLabel>
            <Select
              labelId=""
              variant="outlined"
              id="dropdown"
              value={choice}
              onChange={handleChange}
            >
              <MenuItem value="recipes">Recipe</MenuItem>
              <MenuItem value="specials">Special ingredient</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        ''
      )}
      {choice === 'recipes' ? (
        <FormControl id="recipeInputContainer">
          <h1 id="recipeCardTitle">
            Recipe Card<hr></hr>
          </h1>
          <div id="inputContainer">
            <div className="inputRow">
              <p className="recipeInputTitles">Title </p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newRecipe.title}
                placeholder="title of your recipe..."
                type="text"
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, title: e.target.value })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Description</p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newRecipe.description}
                placeholder="type a recipe description..."
                type="text"
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, description: e.target.value })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Serves </p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newRecipe.servings}
                placeholder="How many servings?"
                type="number"
                onChange={(e) =>
                  setNewRecipe({
                    ...newRecipe,
                    servings: parseInt(e.target.value),
                  })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Prep Time</p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newRecipe.prepTime}
                placeholder="How many minutes of preperation time?"
                type="number"
                onChange={(e) =>
                  setNewRecipe({
                    ...newRecipe,
                    prepTime: parseInt(e.target.value),
                  })
                }
              ></TextField>
            </div>

            <div className="inputRow">
              <p className="recipeInputTitles">Cook Time</p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newRecipe.cookTime}
                placeholder="How many minutes of cook time?"
                type="number"
                onChange={(e) =>
                  setNewRecipe({
                    ...newRecipe,
                    cookTime: parseInt(e.target.value),
                  })
                }
              ></TextField>
            </div>
          </div>
          <div className="addedContainer">
            <hr></hr>
            <p id="ingredientsAddedTitle">Ingredients Added:</p>
            {settingNewIngredient ? createIngredient() : ''}
            {newRecipe.ingredients.map((ingredient) => (
              <p id="addedIng">
                {ingredient.amount} {ingredient.measurement} {ingredient.name}
              </p>
            ))}
            <Button
              id="addNewIngredientBtn"
              onClick={() => setSettingNewIngredient(true)}
              startIcon={<AddCircle />}
            >
              add ingredient
            </Button>
          </div>
          <div className="addedContainer">
            <hr></hr>
            <p id="directionsAddedTitle">Directions Added:</p>
            {settingNewDirection ? createDirection() : ''}
            {newDirection
              ? newRecipe.directions.map((direction) => (
                  <p id="addedDirection">
                    {direction.instructions} {direction.optional}
                  </p>
                ))
              : ''}
            <Button
              id="addNewDirectionBtn"
              onClick={() => setSettingNewDirection(true)}
              startIcon={<AddCircle />}
            >
              add direction
            </Button>
            <hr></hr>
          </div>
          <div id="submitBtnContainer">
            <Button id="submitRecipeBtn" onClick={createRecipe}>
              Submit Recipe
            </Button>
          </div>
        </FormControl>
      ) : (
        ''
      )}
      {choice === 'specials' ? (
        <FormControl id="newSpecialInputContainer">
          <h1 id="specialIngredientTitle">
            Add a Special Ingredient<hr></hr>
          </h1>
          <div className="inputContainer">
            <div className="inputRow">
              <p className="recipeInputTitles">Title </p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newSpecial.title}
                placeholder="Title of special"
                type="text"
                onChange={(e) =>
                  setNewSpecial({ ...newSpecial, title: e.target.value })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Type</p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newSpecial.type}
                placeholder="What type of special?"
                type="text"
                onChange={(e) =>
                  setNewSpecial({ ...newSpecial, type: e.target.value })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Text </p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newSpecial.text}
                placeholder="Describe the special"
                type="text"
                onChange={(e) =>
                  setNewSpecial({
                    ...newSpecial,
                    text: e.target.value,
                  })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Geolocation</p>
              <TextField
                variant="outlined"
                className="recipeInputs"
                value={newSpecial.geo}
                placeholder="Latitude and Longitude"
                type="text"
                onChange={(e) =>
                  setNewSpecial({
                    ...newSpecial,
                    geo: e.target.value,
                  })
                }
              ></TextField>
            </div>
            <div className="inputRow">
              <p className="recipeInputTitles">Ingredient</p>
              <Select
                labelId=""
                variant="outlined"
                id="dropdownSpecial"
                type="string"
                value={newSpecial.ingredientId}
                onChange={(e) => matchIngredients(e.target.value)}
              >
                {importedIngredientList.map((ingredients) =>
                  ingredients.map((ingredient) => (
                    <MenuItem value={ingredient.uuid}>
                      {ingredient.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </div>
            <Button id="submitSpecialBtn" onClick={submitSpecial}>Submit Special</Button>
          </div>
        </FormControl>
      ) : (
        ''
      )}
    </div>
  );
};
