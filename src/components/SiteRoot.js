import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";

export default class SiteRoot extends React.Component {
  render() {
    return (
      <Router>
        <Route
          path="/"
          exact={true}
          render={(props) => <HomePage {...props} />}
        />
        <Route
          path="/profile/:userId"
          exact={true}
          render={(props) => (
            <Profile userId={props.match.params.userId} {...props} />
          )}
        />
        <Route path="/reviews" exact={true} />
        <Route path="/polls" exact={true} />
        <Route
          path="/login"
          exact={true}
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/register"
          exact={true}
          render={(props) => <Register {...props} />}
        />
        <Route
          path="/search"
          exact={true}
          render={(props) => <Search {...props} />}
        />
      </Router>
    );
  }
}
