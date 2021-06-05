export interface Ingredient {
  uuid: string;
  amount: number;
  measurement: string;
  name: string;
}

export interface IncRecipe {
  uuid: string;
  title: string;
  description: string;
  images: { full: string; medium: string; small: string };
  servings: number;
  prepTime: number;
  cookTime: number;
  postDate: string;
  editDate: string;
  ingredients: Ingredient[];
  directions: { instructions: string; optional: Boolean }[];
}
