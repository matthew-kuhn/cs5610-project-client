import React from "react";
import axios from "axios";
import {
  createReview,
  findReviewsForMovie,
  flagReview,
} from "../../services/reviewService";
import { getSessionUser } from "../../services/userService";

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      review: "",
      fetchedReviews: [],
      user: { username: "", blocked: false },
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.omdbapi.com/?apikey=4dc3a14a&i=${this.props.movieId}`)
      .then((response) =>
        this.setState({ movie: response.data }, () =>
          findReviewsForMovie(this.state.movie.imdbID).then((reviews) =>
            this.setState({ fetchedReviews: reviews })
          )
        )
      );
    getSessionUser()
      .then((response) => {
        if (response.status !== 200) {
        } else {
          return response.json();
        }
      })
      .then((user) =>
        this.setState({
          user: { username: user.username, blocked: user.blocked },
        })
      )
      .catch((error) => {});
  }

  setReviewText = (evt) => {
    this.setState({ review: evt.target.value });
  };

  addReview = () => {
    createReview(this.state.review, this.state.movie.imdbID, this.state.movie.Title)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("login before adding a review");
        } else {
          return findReviewsForMovie(this.state.movie.imdbID);
        }
      })
      .then((reviews) => this.setState({ fetchedReviews: reviews }))
      .catch((error) => {
        document.getElementById("alert-box").innerHTML = error.message;
        document.getElementById("alert-box").className = "alert alert-danger";
      });
  };

  flagReview = (review) => {
    flagReview(review).then((response) => console.log(response));
  };

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <div
            className="alert alert-danger d-none"
            role="alert"
            id="alert-box"
          ></div>
          <h1 className="d-flex justify-content-center">
            {this.state.movie.Title}
          </h1>
          <img
            className="d-flex justify-content-center"
            src={this.state.movie.Poster}
            alt="movie poster"
          />
          <p>Released: {this.state.movie.Year}</p>
          <p>Genre: {this.state.movie.Genre}</p>
          <p>Director: {this.state.movie.Director}</p>
          <p>Actors: {this.state.movie.Actors}</p>
          <p>Summary: {this.state.movie.Plot}</p>
          {this.state.user.username !== "" && !this.state.user.blocked && (
            <div className="row">
              <textarea
                className="form-control col-8"
                rows="3"
                onChange={this.setReviewText}
                placeholder="write a review here"
              ></textarea>
              <button
                className="btn btn-primary col-3"
                onClick={this.addReview}
              >
                Add Review
              </button>
            </div>
          )}
          {this.state.user.username === "" && (
            <div className="row">
              <textarea
                className="form-control col-8"
                rows="3"
                onChange={this.setReviewText}
                placeholder="write a review here"
              ></textarea>
              <button
                className="btn btn-primary col-3"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Add Review
              </button>
            </div>
          )}
          <ul className="list-group">
            {this.state.fetchedReviews.map((review) => (
              <li
                key={review._id}
                className="list-group-item unique-color lighten-1"
              >
                {review.text}- {review.username}
                {this.state.user.username !== "" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.flagReview(review)}
                  >
                    Flag review
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
