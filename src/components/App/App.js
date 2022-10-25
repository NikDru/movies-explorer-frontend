import React, { useState } from 'react';
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
import NotFound from '../NotFound/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

function App() {
  const [sideMenu, setSideMenu] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  function openSideMenu() {
    setSideMenu(true);
  }

  function closeSideMenu() {
    setSideMenu(false);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-up">
          <Register />
        </Route>
        <Route exact path="/sign-in">
          <Login />
        </Route>
        <Route exact path="/movies">
          <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
          <Movies />
{/*           <Preloader /> */}
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
          <SavedMovies />
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Header signedIn={signedIn} style='white' onSideMenuClick={openSideMenu}/>
          <Profile />
        </Route>
        <Route exact path="/">
          <Header signedIn={signedIn} onSideMenuClick={openSideMenu}/>
          <Main />
          <Footer />
        </Route>
        <Route path="*">
            <NotFound />
          </Route>
      </Switch>
      {
        <Menu styleElements='white' onSideMenuClose={closeSideMenu} isOpen={sideMenu}/>
      }
    </div>
  );
}

export default withRouter(App);
