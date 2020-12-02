import React from "react";
import axios from "axios";
import {
  createReview,
  findReviewsForMovie,
} from "../../services/reviewService";
import { getSessionUser } from "../../services/userService";

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      review: "",
      fetchedReviews: [],
      user: { username: "" },
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
      .then((user) => this.setState({ user: { username: user.username } }))
      .catch((error) => {});
  }

  setReviewText = (evt) => {
    this.setState({ review: evt.target.value });
  };

  addReview = () => {
    // todo
    // this is probably not correct behavior, you don't want the review box or button to
    // even show up if you're not logged in
    console.log(this.state.review);
    console.log(this.state.movie.imdbID);
    createReview(this.state.review, this.state.movie.imdbID)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("login before adding a review");
        } else {
          return findReviewsForMovie(this.state.movie.imdbID);
        }
      })
      .then((reviews) => this.setState({ fetchedReviews: reviews }))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
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
          {this.state.user.username !== "" && (
            <div className="row">
              <textarea
                className="form-control col-8"
                rows="3"
                onChange={this.setReviewText}
                placeholder="write a review here"
              >
                {this.state.review}
              </textarea>
              <button
                className="btn btn-primary col-3"
                onClick={this.addReview}
              >
                Add Review
              </button>
            </div>
          )}
          <ul>
            {this.state.fetchedReviews.map((review) => (
              <li>{review.text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
