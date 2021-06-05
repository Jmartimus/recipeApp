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
        instructions: '',
        optional: false,
      },
    ],
  });
  const [choice, setChoice] = useState<string>();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChoice(event.target.value as string);
  };
  const createRecipe = async () => {
    const response = await axios.post(`${URL}${'recipes'}`, {
      title: newRecipe.title,
      description: newRecipe.description,
    });
    console.log(response);
    setNewRecipe({ ...newRecipe, title: '', description: '' });
    alert('Recipe created!');
    // setRecentPost(response.data);
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
    <div>
      <FormControl>
        <InputLabel id="firstQuestion">
          Add a Recipe or Special Ingredient?
        </InputLabel>
        <Select
          labelId=""
          id="demo-simple-select"
          value={choice}
          onChange={handleChange}
        >
          <MenuItem value="recipes">recipes</MenuItem>
          <MenuItem value="specials">specials</MenuItem>
        </Select>
      </FormControl>
      {choice === 'recipes' ? (
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
          <Button onClick={createRecipe}></Button>
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
