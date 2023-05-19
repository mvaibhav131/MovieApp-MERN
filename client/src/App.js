import './App.css';
import Navigation from './components/header/navigation.js';
import FilmList from './components/film-list/film-list';
import Film from './components/film-item/film-item';
import Searched from './components/searched-list/searched-list';
import {Switch, Route} from 'react-router-dom';
import Favorites from './components/favorites/favorites';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <br />
      <Switch>

        <Route exact path='/'>
          <FilmList/>
        </Route>

        <Route exact path='/film/:id'>
          <Film/>
        </Route>

        <Route exact path='/search_results/:query'>
          <Searched/>
        </Route>

        <Route exact path='/favorites'>
          <Favorites/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;