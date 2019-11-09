import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import PrivateRoute from './common/PrivateRoute';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from './components/dashboard/Dashboard';

// Check for token
if(localStorage.jwtToken) {
  // localStorage.clear();
  // set auth & token in header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set current user & Authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if(currentTime > decoded.exp) {
    // logout user
    store.dispatch(setCurrentUser());
    // window.location.href = '/login';
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
