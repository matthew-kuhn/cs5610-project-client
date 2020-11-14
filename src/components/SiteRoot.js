import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./HomePage";

export default class SiteRoot extends React.Component {
  render() {
    return (
      <Router>
        <Route
          path="/"
          exact={true}
          render={(props) => <HomePage {...props} />}
        />
        <Route path="/profile/:userId" exact={true} />
        <Route path="/reviews" exact={true} />
        <Route path="/polls" exact={true} />
        <Route path="/login" exact={true} />
        <Route path="/register" exact={true} />
        <Route path="/search" exact={true} />
      </Router>
    );
  }
}
