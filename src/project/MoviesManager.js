import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MoviesList} from "./HomePage/MoviesList";
import MovieDetail from "./SearchDetails/MovieDetail";
import Login from "./Login/login";
import Profile from "./Profile/profile";
import Register from "./Register/register";


export default class MoviesManager extends React.Component {

    render() {
        return (
            <Router>
                <Route
                    exact path={'/'}
                    component={MoviesList}
                />
                <Route
                    exact path={'/login'}
                    component={Login}
                />
                <Route
                    exact path={'/profile/:username'}
                    render={(props) =>
                        <Profile
                            {...props}
                            username={props.match.params.username}
                        />
                    }
                />
                <Route
                    exact path={'/profile'}
                    component={Profile}
                />
                <Route
                    exact path={'/register'}
                    component={Register}
                />
                <Route
                    exact path={'/movie/:movieId'}
                    render={(props) =>
                        <MovieDetail
                            {...props}
                            movieId={props.match.params.movieId}
                        />
                    }
                />
            </Router>
        )
    }
}

