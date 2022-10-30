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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        email: '',
        loggedIn: false
      },
      sideMenu: false,

    }

    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);
  }



  handleSignInSubmit(userInfo) {
    authentificationApi.signIn(userInfo).then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        this.authenticateByToken(res.token);
      }
      else {
        return Promise.reject('Token is not valid!');
      }
    })
    .catch((e) =>
      {
        this.setState(
          {
            isSuccessTooltipStatus: false,
            isInfoTooltipPopupOpen: true
          },
          () => {
            console.log(`Error - ${e}`);
          }
        );
      }
    );
  }

  handleSignUpSubmit(userInfo) {
    authentificationApi.signUp(userInfo).then((res) => {
      if (res.email === userInfo.email) {
        this.setState(
          {
            isSuccessTooltipStatus: true,
            isInfoTooltipPopupOpen: true
          },
          () => {
            this.props.history.push('/sign-in');
          }
        );
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) =>
      {
        this.setState(
          {
            isSuccessTooltipStatus: false,
            isInfoTooltipPopupOpen: true
          },
          () => {
            console.log(`Error - ${e}`);
          }
        );
      }
    );
  }

  tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticateByToken(token);
    }
  }

  authenticateByToken(token) {
    authentificationApi.getUserInfo(token).then((res) => {
      if (res.email) {
        //api.setToken(token);
        this.setState({currentUser: {
              ...this.state.currentUser,
              loggedIn: true,
              email: res.email
            }
          },
          () => {
            //this.getUserData();
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
    localStorage.removeItem('token');
    this.setState((state) => ({
      currentUser: {
        ...state.currentUser,
        loggedIn: false,
        email: ''
      }
      }),
      () => {
        this.props.history.push('/sign-in');
      }
    );
  }


  openSideMenu() {
    this.setState({
      sideMenu: true
    });
  }

  closeSideMenu() {
    this.setState({
      sideMenu: false
    });
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
{/*       <Header signedIn={props.loggedIn} style='white' onSideMenuClick={props.openSideMenu}/> */}
            <ProtectedRoute exact path="/movies"
              component={Movies}
              loggedIn={this.state.currentUser.loggedIn}
              onSideMenuClick={this.openSideMenu}
            >
    {/*           <Preloader /> */}
            </ProtectedRoute>
            <ProtectedRoute exact path="/saved-movies">
              <Header signedIn={this.state.currentUser.loggedIn} style='white' onSideMenuClick={this.openSideMenu}/>
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile">
              <Header signedIn={this.state.currentUser.loggedIn} style='white' onSideMenuClick={this.openSideMenu}/>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/"
              component={
                <>
                  <Header signedIn={this.state.currentUser.loggedIn} onSideMenuClick={this.openSideMenu}/>
                  <Main />
                  <Footer />
                </>
              }
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
