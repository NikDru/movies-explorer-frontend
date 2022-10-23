import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import NotFound from '../NotFound/NotFound';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

function App() {
  const signedIn = true;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-up">
          <Register />
        </Route>
        <Route exact path="/sign-in">
          <Register />
        </Route>
        <Route exact path="/movies">
          <Header signedIn={signedIn} style='white'/>
          <Movies />
          <Preloader />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header signedIn={signedIn} style='white'/>
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Header signedIn={signedIn} style='white'/>
          <Profile />
        </Route>
        <Route exact path="/">
          <Header signedIn={signedIn}/>
          <Main />
          <Footer />
        </Route>
      </Switch>
      <Menu style = 'white'/>
    </div>
  );
}

export default withRouter(App);
