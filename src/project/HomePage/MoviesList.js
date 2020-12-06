import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getSessionUser } from "../../services/userService";

export class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      title: "",
      user: { username: "" },
    };
  }

  componentDidMount() {
    getSessionUser()
      .then((response) => {
        if (response.status !== 200) {
        } else {
          return response.json();
        }
      })
      .then((user) => this.setState({ user: { username: user.username } }))
      .catch((error) => {});
    this.componentDidMount = true;
  }

  titleChange = (evt) => {
    this.setState({ title: evt.target.value });
  };

  searchMovies = () => {
    axios
      .get(`https://www.omdbapi.com/?apikey=4dc3a14a&s=${this.state.title}`)
      .then((response) => this.setState({ movies: response.data.Search }));
  };

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <h1 className="d-flex justify-content-center">Moview</h1>
          {this.state.user.username === "" && (
            <div className="d-flex justify-content-center">
              <button
                className="btn default-color"
                onClick={() => this.props.history.push(`/login`)}
              >
                Login
              </button>
              <button
                className="btn default-color"
                onClick={() => this.props.history.push(`/policy`)}
              >
                Sign up
              </button>
            </div>
          )}
          {this.state.user.username !== "" && (
            <h3 className="d-flex justify-content-center">
              Welcome Back, {this.state.user.username}!
            </h3>
          )}
          <div className="row">
            <input
              className="form-control col-8"
              onChange={(event) => this.titleChange(event)}
              value={this.state.title}
            />
            <button
              className="btn default-color col-2"
              onClick={this.searchMovies}
            >
              Search
            </button>
          </div>
          <ul className="list-group">
            {this.state.movies.map((movie) => (
              <li key={movie.imdbID} className="list-group-item">
                <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
