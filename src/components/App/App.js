import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import NotFound from '../NotFound/NotFound';
import { Route, Switch, withRouter  } from 'react-router-dom';
import './App.css';
import moviesExplorerApi from '../../utils/MoviesExplorerApi';
import ErrorPopup from '../ErrorPopup/ErrorPopup';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: '',
        email: '',
        loggedIn: false
      },
      sideMenu: false,
      errorPopup: false,
      apiErrorMessage: ''
    }
    this.nextPath = props.history.location.pathname;
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.openSideMenu = this.openSideMenu.bind(this);
    this.closeSideMenu = this.closeSideMenu.bind(this);
    this.closeErrorPopup = this.closeErrorPopup.bind(this);
    this.setApiError = this.setApiError.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    if (this.state.currentUser.loggedIn === false) {
      this.tokenCheck();
    }
  }

  handleUpdateUser(userInfo) {
    moviesExplorerApi.editProfile(userInfo)
      .then((res) => {
        this.setState((state) => ({
          currentUser: {
            name: res.name,
            loggedIn: true,
            email: res.email
          }
        }));
      })
      .catch((e) => this.setApiError(e));
  }

  handleSignInSubmit(userInfo) {
    moviesExplorerApi.signIn(userInfo)
      .then((res) => {
        if (res.token) {
          this.nextPath = '/';
          localStorage.setItem('token', res.token);
          this.authenticateByToken(res.token);
        }
        else {
          return Promise.reject('Token is not valid!');
        }
      })
      .catch((e) => this.setApiError(e));
  }

  handleSignUpSubmit(userInfo) {
    moviesExplorerApi.signUp(userInfo)
      .then((res) => {
        if (res.email === userInfo.email) {
          this.handleSignInSubmit({email: userInfo.email, password: userInfo.password});
        }
        else {
          return Promise.reject('Email from answer is not valid!');
        }
      })
      .catch((e) => {
        this.setApiError(e)
      });
  }

  tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticateByToken(token);
    }
  }

  authenticateByToken(token) {
    moviesExplorerApi.checkToken(token)
      .then((res) => {
        if (res.email) {
          moviesExplorerApi.setToken(token);
          this.setState({currentUser: {
                name: res.name,
                loggedIn: true,
                email: res.email
              }
            },
            () => {
              this.props.history.push(this.nextPath);
              //this.props.history.goForward();
            }
          );
        }
        else {
          return Promise.reject('Email from answer is not valid!');
        }
      })
      .catch((e) => this.setApiError(e));
  }

  signOut() {
    moviesExplorerApi.deleteToken();
    localStorage.clear();
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

  setApiError(error) {
    this.setState({
      errorPopup: true,
      apiErrorMessage: error
    })
  }

  closeErrorPopup(evt) {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
      this.setState({
        errorPopup: false,
        apiErrorMessage: ''
      });
    }
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
              <Register handleSubmit={this.handleSignUpSubmit} />
            </Route>
            <Route exact path="/sign-in">
              <Login handleSubmit={this.handleSignInSubmit} />
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
              errorSetter={this.setApiError}
              >
            </ProtectedRoute>
            <ProtectedRoute
              onSideMenuClick={this.openSideMenu}
              exact path="/saved-movies"
              component={SavedMovies}
              errorSetter={this.setApiError}
              >
            </ProtectedRoute>
            <ProtectedRoute
              onSideMenuClick={this.openSideMenu}
              exact path="/profile"
              component={Profile}
              onExit={this.signOut}
              handleSubmit={this.handleUpdateUser}
              errorSetter={this.setApiError}
              >
            </ProtectedRoute>
            <Route path="*" component={NotFound} />
          </Switch>
          <Menu
            styleElements='white'
            onSideMenuClose={this.closeSideMenu}
            isOpen={this.state.sideMenu}
          />
          <ErrorPopup
            isOpen={this.state.errorPopup}
            onClose={this.closeErrorPopup}
            errorMessage={this.state.apiErrorMessage}
          />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
