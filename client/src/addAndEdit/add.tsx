import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Recipe } from '../interfaces/incRecipes.interface';
import './add.scss';
import { timeStamper } from '../timestamp';

// example of date format for postDate. "postDate": "01/20/2018 05:15:03 PM"  Create an exportable function that timestamps.
//add a button to the ingredient function and edit fields and such.

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
        instructions: '',
        optional: false,
      },
    ],
  });
  const [choice, setChoice] = useState<string>('');
  const [newIngredient, setNewIngredient] = useState<Boolean>(false);

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
    return (
      <FormControl>
        <TextField
          value={newRecipe.title}
          placeholder="title of your recipe..."
          type="text"
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, title: e.target.value })
          }
        ></TextField>
        <TextField
          value={newRecipe.description}
          placeholder="type a recipe description..."
          type="text"
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, description: e.target.value })
          }
        ></TextField>
        <TextField
          value={newRecipe.servings}
          placeholder="How many servings?"
          type="number"
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) })
          }
        ></TextField>
        <TextField
          value={newRecipe.prepTime}
          placeholder="How many minutes of preperation time?"
          type="number"
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, prepTime: parseInt(e.target.value) })
          }
        ></TextField>
        <Button id="submitIngredient">Submit Ingredient</Button>
      </FormControl>
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
          <h1>Recipe Card<hr></hr></h1><div id="inputContainer">
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
          <Button id="addNewIngredientBtn"onClick={() => setNewIngredient(true)}>add ingredient</Button>
          {newIngredient ? createIngredient() : ''}
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
