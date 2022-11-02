import React, { useEffect, useState, useCallback } from 'react';
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
import moviesExplorerApi from '../../utils/MoviesExplorerApi';
import useWindowSize from '../../userHooks/useWindowSize';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: '',
        email: '',
        loggedIn: false
      },
      sideMenu: false
    }
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.tokenCheck();
  }

  handleUpdateUser(userInfo) {
    moviesExplorerApi.editProfile(userInfo).then((res) => {
      this.setState((state) => ({
        currentUser: {
          name: res.name,
          loggedIn: true,
          email: res.email
        }
      }));
      this.resetPopupsState();
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  handleSignInSubmit(userInfo) {
    moviesExplorerApi.signIn(userInfo).then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.authenticateByToken(res.token);
      }
      else {
        return Promise.reject('Token is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  handleSignUpSubmit(userInfo) {
    moviesExplorerApi.signUp(userInfo).then((res) => {
      if (res.email === userInfo.email) {
        this.handleSignInSubmit({email: userInfo.email, password: userInfo.password});
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticateByToken(token);
    }
  }

  authenticateByToken(token) {
    moviesExplorerApi.checkToken(token).then((res) => {
      if (res.email) {
        moviesExplorerApi.setToken(token);
        this.setState({currentUser: {
              name: res.name,
              loggedIn: true,
              email: res.email
            }
          },
          () => {
            this.props.history.push('/movies');
          }
        );
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }

  signOut() {
    moviesExplorerApi.deleteToken();
    localStorage.removeItem('token');
    this.setState((state) => ({
      currentUser: {
        name: '',
        loggedIn: false,
        email: ''
      }
      }),
      () => {
        this.props.history.push('/');
      }
    );
  }

  openSideMenu() {
    this.setState({sideMenu : true});
  }

  closeSideMenu() {
    this.setState({sideMenu : false});
  }
  render() {
  return (
      <div className="app">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Switch>
            <Route exact path="/sign-up">
              <Register handleSubmit={this.handleSignUpSubmit}/>
            </Route>
            <Route exact path="/sign-in">
              <Login handleSubmit={this.handleSignInSubmit}/>
            </Route>
            <Route exact path="/">
              <Main
                onSideMenuClick={this.openSideMenu}
              />
            </Route>
            <ProtectedRoute
              onSideMenuClick={this.openSideMenu}
              exact path="/movies"
              component={Movies}
              >
    {/*           <Preloader /> */}
            </ProtectedRoute>
            <ProtectedRoute
              onSideMenuClick={this.openSideMenu}
              exact path="/saved-movies"
              component={SavedMovies}
              >
            </ProtectedRoute>
            <ProtectedRoute
              onSideMenuClick={this.openSideMenu}
              exact path="/profile"
              component={Profile}
              onExit={this.signOut}
              handleSubmit={this.handleUpdateUser}
              >
            </ProtectedRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          {
            <Menu styleElements='white' onSideMenuClose={this.closeSideMenu} isOpen={this.state.sideMenu}/>
          }
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
