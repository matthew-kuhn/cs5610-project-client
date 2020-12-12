import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MoviesList } from "./HomePage/MoviesList";
import MovieDetail from "./SearchDetails/MovieDetail";
import Login from "./Login/login";
import Profile from "./Profile/profile";
import Register from "./Register/register";
import { logOut, getSessionUser } from "../services/userService";
import Policy from "./Policy/policy";

export default class MoviesManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loggedInUser: {},
    };
  }

  logout = () => {
    logOut().then((window.location.href = "/"));
  };

  refresh = (user) => {
    this.setState({ loggedIn: true });
    this.setState({ loggedInUser: user });
  };

  componentDidMount() {
    getSessionUser()
      .then((response) => {
        if (response.status !== 200) {
        } else {
          this.setState({ loggedIn: true });
          return response.json();
        }
      })
      .then((user) => this.setState({ loggedInUser: user }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state !== prevState &&
      prevState.loggedIn === false &&
      this.state.loggedIn === true
    ) {
      getSessionUser()
        .then((response) => {
          if (response.status !== 200) {
          } else {
            this.setState({ loggedIn: true });
            return response.json();
          }
        })
        .then((user) => this.setState({ loggedInUser: user }));
    }
  }

  render() {
    return (
      <div className="fill special-color">
        <Router>
          <div className="nav navbar red darken-3 text-white">
            <Link className="text-white" to="/">
              Home
            </Link>
            {!this.state.loggedIn && (
              <Link className="text-white float-right" to="/login">
                Log in
              </Link>
            )}
            {this.state.loggedIn && (
              <Link className="text-white float-right" to="/profile">
                Profile
              </Link>
            )}
            {this.state.loggedIn && <span onClick={this.logout}>Log Out</span>}
          </div>
          <Route exact path={"/"} component={MoviesList} />
          <Route
            exact
            path={"/login"}
            render={(props) => <Login {...props} updateParent={this.refresh} />}
          />
          <Route
            exact
            path={"/profile/:username"}
            render={(props) => (
              <Profile {...props} username={props.match.params.username} />
            )}
          />
          <Route exact path={"/profile"} component={Profile} />
          <Route exact path={"/register"} component={Register} />
          <Route
            exact
            path={"/movie/:movieId"}
            render={(props) => (
              <MovieDetail {...props} movieId={props.match.params.movieId} />
            )}
          />
          <Route exact path={"/policy"} component={Policy} />
        </Router>
      </div>
    );
  }
}
