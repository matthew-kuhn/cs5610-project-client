import React from "react";
import { Link } from "react-router-dom";
import { getSessionUser } from "../../services/userService";
import { findAllReviews } from "../../services/reviewService";
import logo from "../../clapperboard-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./moviesList.style.css";
import "../../index.css";

export class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      user: { username: "" },
      reviews: [],
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
      .then((user) => {
        if (user) {
          this.setState({ user: user });
        }
      })
      .catch((error) => {});
    findAllReviews().then((reviews) => {
      this.setState({ reviews: reviews });
    });
    this.componentDidMount = true;
  }

  titleChange = (evt) => {
    this.setState({ title: evt.target.value });
  };

  searchMovies = () => {
    if (this.state.title === "") {
      this.props.history.push("/search");
    } else {
      this.props.history.push(`/search/${this.state.title}`);
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <br />
          <h1 className="d-flex justify-content-center">Moview</h1>
          <img
            src={logo}
            alt="Moview logo"
            id="logo"
            className="rounded mx-auto d-block"
          />
          {this.state.user && this.state.user.username === "" && (
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
          <br />
          <br />
          {this.state.user && this.state.user.username !== "" && (
            <h3 className="d-flex justify-content-center col-12">
              Welcome Back, {this.state.user.username}!
            </h3>
          )}
          <br />
          <div className="row">
            <input
              className="form-control col-12 col-md-8"
              onChange={(event) => this.titleChange(event)}
              value={this.state.title}
            />
            <button
              className="btn btn-sm default-color col-12 col-md-3"
              id="search-btn"
              onClick={this.searchMovies}
            >
              <FontAwesomeIcon icon={faSearch} size="3x" />
            </button>
          </div>
          {this.state.user &&
            this.state.user.username !== "" &&
            this.state.user.role === "admin" && (
              <div>
                <h3>Flagged Reviews</h3>
                <ul className="list-group">
                  {this.state.reviews.map((review) => (
                    <li
                      key={review._id}
                      className="list-group-item unique-color lighten-1"
                    >
                      {review.text}- {review.username}
                      <button
                        className="btn btn-primary"
                        onClick={() => this.deleteReviewAdmin(review._id)}
                      >
                        Delete
                      </button>
                      {!this.state.user.blockedUsers
                        .map((user) => user._id)
                        .includes(review.userId) && (
                        <button
                          className="btn btn-danger"
                          onClick={() => this.blockUser(review.userId)}
                        >
                          Block User
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {this.state.user && this.state.user.username !== "" && (
            <div>
              <h3 className="d-flex justify-content-center">
                Catch Up With Your Friends!
              </h3>
              <ul className="list-group">
                {this.state.user.friends.map((friend) => (
                  <li
                    key={friend._id}
                    className="list-group-item unique-color lighten-1"
                  >
                    <Link
                      className="text-white"
                      to={`/profile/${friend.username}`}
                    >
                      {friend.username}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3>Recent Reviews</h3>
          <ul className="list-group">
            {this.state.reviews
              .reverse()
              .slice(
                0,
                this.state.reviews.length < 5 ? this.state.reviews.length : 5
              )
              .map((review) => (
                <li
                  key={review._id}
                  className="list-group-item unique-color lighten-1"
                >
                  <Link
                    to={`/movie/${review.movieId}`}
                    style={{ color: "pink" }}
                  >
                    {review.movieTitle}:
                  </Link>
                  {review.text} -
                  <Link
                    to={"/profile/" + review.username}
                    style={{ color: "pink" }}
                  >
                    {review.username}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
