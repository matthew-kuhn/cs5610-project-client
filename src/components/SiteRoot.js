import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from "./HomePage";

export default class SiteRoot extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" render={(props) => <HomePage {...props} />} />
      </Router>
    );
  }
}
