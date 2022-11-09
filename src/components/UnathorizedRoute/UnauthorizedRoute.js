import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const UnauthorizedRoute = ({ component: Component, ...props }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <Route>
      {() =>
        currentUser.loggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    </Route>
  );
};

export default UnauthorizedRoute;
