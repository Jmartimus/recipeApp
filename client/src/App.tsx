import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipes from './recipesListPage/recipes';
import RecipePage from './recipePage/recipePage';
import './app.scss';
//I want to be able to click the picure or title of the recipe and it takes you to a new page which is a full size page of the recipe.
//I also need to get the pictures to show up

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/recipePage">
            <RecipePage />
          </Route>
          <Route path="/">
            <Recipes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
