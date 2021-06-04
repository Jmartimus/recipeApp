export interface incRecipe {
  uuid: string;
  title: string;
  description: string;
  images: { full: string; medium: string; small: string };
  servings: number;
  prepTime: number;
  cookTime: number;
  postDate: string;
  editDate: string;
  ingredients: [
    { uuid: string; amount: number; measurement: string; name: string }
  ];
  directions: [{ instructions: string; optional: Boolean }];
}