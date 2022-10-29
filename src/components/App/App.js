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
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import './App.css';
import filmsApi from '../../utils/BeatsMoviesApi';
import authentificationApi from '../../utils/AuthentificationApi';
import useWindowSize from '../../userHooks/useWindowSize';

function App(props) {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    loggedIn: false
  });
  const [sideMenu, setSideMenu] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [films, setFilms] = useState([]);
  let history = useHistory();

  useEffect(() => {
    //tokenCheck();
/*     filmsApi.getFilms()
      .then(res => setFilms(res))
      .catch(err => console.log(err)); */
  }, []);


  function handleSignInSubmit(userInfo) {
    authentificationApi.signIn(userInfo).then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        authenticateByToken(res.token);
      }
      else {
        return Promise.reject('Token is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  function handleSignUpSubmit(userInfo) {
    authentificationApi.signUp(userInfo).then((res) => {
      if (res.email === userInfo.email) {
        console.log("sign-up success");
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      authenticateByToken(token);
    }
  }

  function authenticateByToken(token) {
    authentificationApi.getUserInfo(token).then((res) => {
      if (res.email) {
        //api.setToken(token);
        const newUser = {email: res.email, loggedIn: true};
        setCurrentUser(newUser);
        history.push('/');
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  function signOut() {
    localStorage.removeItem('token');
    setCurrentUser({loggedIn: true})
  }


  function openSideMenu() {
    setSideMenu(true);
  }

  function closeSideMenu() {
    setSideMenu(false);
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/sign-up">
            <Register handleSubmit={handleSignUpSubmit}/>
          </Route>
          <Route exact path="/sign-in">
            <Login handleSubmit={handleSignInSubmit}/>
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
