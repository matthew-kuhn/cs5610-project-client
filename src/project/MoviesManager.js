import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MoviesList} from "./HomePage/MoviesList";
import MovieDetail from "./SearchDetails/MovieDetail";
import Login from "./Login/login";
import Profile from "./Profile/profile";
import Register from "./Register/register";
import {logOut} from "../services/userService";
import Policy from "./Policy/policy";
import policy from "./Policy/policy";

export default class MoviesManager extends React.Component {
    render() {
        return (
            <div className="fill special-color">
                <Router>
                    <div className="nav navbar red darken-3 text-white">
                        <Link className="text-white" to="/">
                            Home
                        </Link>
                        <Link className="text-white float-right" to="/login">
                            Log in
                        </Link>
                        <span onClick={logOut}>
              <Link className="text-white" to="/">
                Log Out
              </Link>
            </span>
                    </div>
                    <Route exact path={"/"} component={MoviesList}/>
                    <Route exact path={"/login"} component={Login}/>
                    <Route
                        exact
                        path={"/profile/:username"}
                        render={(props) => (
                            <Profile {...props} username={props.match.params.username}/>
                        )}
                    />
                    <Route exact path={"/profile"} component={Profile}/>
                    <Route exact path={"/register"} component={Register}/>
                    <Route
                        exact
                        path={"/movie/:movieId"}
                        render={(props) => (
                            <MovieDetail {...props} movieId={props.match.params.movieId}/>
                        )}
                    />
                    <Route exact path={"/policy"} component={Policy}/>
                </Router>
            </div>
        );
    }
}
