import React from "react";
import { Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const UnauthorizedRoute = ({ component: Component, ...props }) => {
  const history = useHistory();

  const currentUser = React.useContext(CurrentUserContext);
  return (
    <Route>
      {() =>
        !currentUser.loggedIn ?
          <Component {...props} /> :
          history.push('/')
      }
    </Route>
  );
};

export default UnauthorizedRoute;
