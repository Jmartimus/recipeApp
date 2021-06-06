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
import { Direction, Ingredient, Recipe } from '../interfaces/incRecipes.interface';
import './add.scss';
import { timeStamper } from '../timestamp';
import { AddCircle } from '@material-ui/icons';

//add a button to the ingredient function and edit fields and such.

export const AddRecipe = () => {
  const URL = 'http://localhost:3001/';
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    uuid: '',
    title: '',
    description: '',
    images: { full: '', medium: '', small: '' },
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    postDate: '',
    editDate: '',
    ingredients: [
      {
        uuid: '',
        amount: 0,
        measurement: '',
        name: '',
      },
    ],
    directions: [
      {
        instruction: '',
        optional: false,
      },
    ],
  });
  const [choice, setChoice] = useState<string>('');
  const [settingNewIngredient, setSettingNewIngredient] = useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    uuid: '',
    amount: NaN,
    measurement: '',
    name: '',
  });
  const [settingNewDirection, setSettingNewDirection] = useState<boolean>(false);
  const [newDirection, setNewDirection] = useState<Direction>({
    instruction: '',
   optional: false,
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChoice(event.target.value as string);
  };
  const createRecipe = async () => {
    const response = await axios.post(`${URL}${'recipes'}`, {
      title: newRecipe.title,
      description: newRecipe.description,
      postDate: timeStamper(),
    });
    console.log(response);
    setNewRecipe({ ...newRecipe, title: '', description: '', postDate: '' });
    alert('Recipe created!');
    // setRecentPost(response.data);
  };

  const createIngredient = () => {
    const finishIngredient = () => {
      setSettingNewIngredient(false);
      setNewRecipe({...newRecipe, ingredients:[...newRecipe.ingredients, newIngredient]})
    }
    return (
      <Dialog open={settingNewIngredient}
      onClose={() => setSettingNewIngredient(false)}
      className="specialContainer">
      <FormControl className="ingDirFormContainer">
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
          <TextField
            variant="outlined"
            className="ingDirInputFields"
          value={newIngredient.measurement}
          placeholder="What measurement?"
          type="text"
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, measurement: e.target.value })
          }
        ></TextField>
          <TextField
            variant="outlined"
            className="ingDirInputFields"
          value={newIngredient.amount}
          placeholder="How many?"
          type="number"
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, amount: parseInt(e.target.value) })
          }
        ></TextField>
        <Button onClick={finishIngredient} id="submitIngredient">Submit Ingredient</Button>
      </FormControl></Dialog>
    );
  };
  const createDirection = () => {
    const finishDirection = () => {
      setSettingNewDirection(false);
      setNewRecipe({...newRecipe, directions:[...newRecipe.directions, newDirection]})
    }
    return (
      <Dialog open={settingNewDirection}
      onClose={() => setSettingNewDirection(false)}
      className="specialContainer">
      <FormControl>
        <TextField
          value={newDirection.instruction}
          placeholder="Write one instructional step"
          type="text"
          onChange={(e) =>
            setNewDirection({ ...newDirection, instruction: e.target.value })
          }
          ></TextField>
          <InputLabel id="firstQuestion">
            What do you want to add?
          </InputLabel>
          <Select
              labelId=""
              variant="outlined"
            id="dropdown"
            value={newDirection.optional}
            onChange={(e) =>
              setNewDirection({ ...newDirection, optional: Boolean(e.target.value) })
            }
          >
            <MenuItem value='false'>False</MenuItem>
            <MenuItem value='true'>True</MenuItem>
          </Select>
        <Button onClick={finishDirection} id="submitDirection">Submit Direction</Button>
      </FormControl></Dialog>
    );
  }; 

  // const addSpecialIngredient = async () => {
  //   const response = await axios.post(
  //     `${URL}${'specials'}`
  //     // { title: post.title, body: post.body },
  //   );
  //   console.log(response);
  //   // setPost({ id: NaN, title: '', body: '' });
  //   // setRecentPost(response.data);
  // };

  return (
    <div id="addContainer">
      {choice === '' ? (
        <div id="largeFormContainer">
          <h1 id="firstFormTitle">Add a Recipe or Special Ingredient!<hr></hr></h1>
          
        <FormControl id="formContainer">
          <InputLabel id="firstQuestion">
            What do you want to add?
          </InputLabel>
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
        </FormControl></div>
      ) : (
        ''
      )}
      {choice === 'recipes' ? (
        <FormControl id='recipeInputContainer'>
          <h1 id="recipeCardTitle">Recipe Card<hr></hr></h1><div id="inputContainer">
          <div className="inputRow"><p className="recipeInputTitles">Title </p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.title}
            placeholder="title of your recipe..."
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, title: e.target.value })
            }
          ></TextField></div>
          <div className="inputRow"><p className="recipeInputTitles">Description</p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.description}
            placeholder="type a recipe description..."
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, description: e.target.value })
            }
          ></TextField></div>
          <div className="inputRow"><p className="recipeInputTitles">Serves </p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.servings}
            placeholder="How many servings?"
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) })
            }
          ></TextField></div>
          <div className="inputRow"><p className="recipeInputTitles">Prep Time</p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.prepTime}
            placeholder="How many minutes of preperation time?"
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, prepTime: parseInt(e.target.value) })
            }
          ></TextField></div>
          
          <div className="inputRow"><p className="recipeInputTitles">Cook Time</p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.cookTime}
            placeholder="How many minutes of cook time?"
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, cookTime: parseInt(e.target.value) })
            }
          ></TextField></div>
          <div className="inputRow"><p className="recipeInputTitles">Serves</p><TextField
            variant="outlined"
            className="recipeInputs"
            value={newRecipe.servings}
            placeholder="How many servings?"
            type="text"
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) })
            }
          ></TextField></div></div>
          <Button id="addNewIngredientBtn"onClick={() => setSettingNewIngredient(true)} startIcon={<AddCircle />}>add ingredient</Button>
          {settingNewIngredient ? createIngredient() : ''}
          {newIngredient.name !== '' ? newRecipe.ingredients.map(ingredient => <p>{ingredient.amount} {ingredient.measurement} {ingredient.name}</p>) : ''}
          <Button id="addNewDirectionBtn"onClick={() => setSettingNewDirection(true)} startIcon={<AddCircle />}>add direction</Button>
          {settingNewDirection ? createDirection() : ''}
          {newDirection ? newRecipe.directions.map(direction => <p>{direction.instruction} {direction.optional}</p>): ''}
          <Button id="submitRecipeBtn" onClick={createRecipe}>Submit Recipe</Button>
        </FormControl>
      ) : (
        ''
      )}
      {/* {choice === 'specials' ? (
        <FormControl>
          <TextField
            value={post.title}
            placeholder="type your title here..."
            type="text"
            onChange={(e) =>
              setPost({ id: post.id, title: e.target.value, body: post.body })
            }
          ></TextField>
          <TextField
            value={post.body}
            placeholder="type your post here..."
            type="text"
            onChange={(e) =>
              setPost({ id: post.id, title: post.title, body: e.target.value })
            }
          ></TextField>
        </FormControl>
      ) : (
        ''
      )} */}
    </div>
  );
};
