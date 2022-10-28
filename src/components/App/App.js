import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import filmsApi from '../../utils/BeatsMoviesApi';
import useWindowSize from '../../userHooks/useWindowSize';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [sideMenu, setSideMenu] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [films, setFilms] = useState([]);

/*   useEffect(() => {
    setSignedIn(true);
    filmsApi.getFilms()
      .then(res => setFilms(res))
      .catch(err => console.log(err));
  }, []); */


  function openSideMenu() {
    setSideMenu(true);
  }

  function closeSideMenu() {
    setSideMenu(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/sign-up">
            <Register />
          </Route>
          <Route exact path="/sign-in">
            <Login />
          </Route>
          <ProtectedRoute exact path="/movies">
            <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
            <Movies />
  {/*           <Preloader /> */}
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/saved-movies">
            <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
            <SavedMovies />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute exact path="/">
            <Header signedIn={signedIn} onSideMenuClick={openSideMenu}/>
            <Main />
            <Footer />
          </ProtectedRoute>
          <Route path="*">
              <NotFound />
            </Route>
        </Switch>
        {
          <Menu styleElements='white' onSideMenuClose={closeSideMenu} isOpen={sideMenu}/>
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App);
