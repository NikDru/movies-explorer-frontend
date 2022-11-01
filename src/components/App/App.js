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
import authentificationApi from '../../utils/AuthentificationApi';
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

/*     this.closeAllPopups = this.closeAllPopups.bind(this);
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
    this.handleCardLike = this.handleCardLike.bind(this);
    this.handleCardDelete = this.handleCardDelete.bind(this);
    this.handleTrashButtonClick = this.handleTrashButtonClick.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this); */
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
    authentificationApi.editProfile(userInfo).then((res) => {
      this.setState((state) => ({
        currentUser: {...state.currentUser,
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
    authentificationApi.signIn(userInfo).then((res) => {
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
    authentificationApi.signUp(userInfo).then((res) => {
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
    authentificationApi.checkToken(token).then((res) => {
      if (res.email) {
        authentificationApi.setToken(token);
        this.setState({currentUser: {
              ...this.state.currentUser,
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
    localStorage.removeItem('token');
    this.setState((state) => ({
      currentUser: {
        ...state.currentUser,
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

/* function App(props) {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
    loggedIn: false
  });
  const [sideMenu, setSideMenu] = useState(false);
  let history = useHistory();

  const authenticateByToken = useCallback( (token) =>
  {
      authentificationApi.getUserInfo(token).then((res) => {
        if (res.email) {
          //api.setToken(token);
          const newUser = {
            name: res.name,
            email: res.email,
            loggedIn: true};
          setCurrentUser(newUser);
          authentificationApi.setToken(token);
          history.push('/movies');
        }
        else {
          return Promise.reject('Email from answer is not valid!');
        }
      })
      .catch((e) => console.log(`Error - ${e}`));
    }, []);


  const tokenCheck = useCallback( () =>
  {
    const token = localStorage.getItem('token');
    if (token) {
      authenticateByToken(token);
    }
  }, [authenticateByToken]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  function handleUpdateUser(userInfo) {
    authentificationApi.editProfile(userInfo)
      .then((res) => {
        const newCurrentUser = {...currentUser, ...res};
        setCurrentUser(newCurrentUser);
      })
      .catch((e) => console.log(`Error - ${e}`));
  }

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
        handleSignInSubmit({email: userInfo.email, password: userInfo.password});
      }
      else {
        return Promise.reject('Email from answer is not valid!');
      }
    })
    .catch((e) => console.log(`Error - ${e}`));
  }



  function signOut() {
    localStorage.removeItem('token');
    setCurrentUser({loggedIn: false})
    history.push('/');
  }


  function openSideMenu() {
    setSideMenu(true);
  }

  function closeSideMenu() {
    setSideMenu(false);
  } */

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
