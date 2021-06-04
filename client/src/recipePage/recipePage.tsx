import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { incRecipe } from '../incRecipes.interface';
import './recipePage.scss'

function RecipePage() {
  return <div id="nothingness">You did it!<Link to="/"><button>Back to recipes</button></Link></div>
}

export default RecipePage;
