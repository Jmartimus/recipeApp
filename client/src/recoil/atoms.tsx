//install recoil and create an atom that carries the recipe from recipes to recipePage in incRecipe format
import { atom } from 'recoil';
import { IncRecipe } from '../interfaces/incRecipes.interface';

export const chosenRec = atom<IncRecipe>({
  key: 'chosenRec',
  default: {
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
      { uuid: '', amount: 0, measurement: '', name: '' }
    ],
    directions: [{ instructions: '', optional: false }],
  },
});