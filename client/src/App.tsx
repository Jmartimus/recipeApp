import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipes from './recipesListPage/recipes';
import RecipePage from './recipePage/recipePage';
import './app.scss';

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
