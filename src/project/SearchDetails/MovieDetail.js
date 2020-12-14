import React from "react";
import axios from "axios";
import {
  createReview,
  findReviewsForMovie,
  flagReview,
} from "../../services/reviewService";
import {editUser, getSessionUser, getUser} from "../../services/userService";
import { Link } from "react-router-dom";
import './movieDetail.style.css'
class MovieDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: "",
      review: "",
      fetchedReviews: [],
      user: { username: "", blocked: false, friends: [] },
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
          user: user,
        })
      )
      .catch((error) => {});
  }

  setReviewText = (evt) => {
    this.setState({ review: evt.target.value });
  };

  addReview = () => {
    createReview(
      this.state.review,
      this.state.movie.imdbID,
      this.state.movie.Title
    )
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

  addFriend = async (friendName) => {
    let response = await getUser(friendName);
    let friend = await response.json();
    friend.friends.push(this.state.user._id);
    this.setState({user: {...this.state.user, friends: [...this.state.user.friends, friend._id]}})
    console.log(friend);
    console.log(this.state.user)
    editUser(friend).then(response => console.log(response))
    editUser(this.state.user).then(response => console.log(response))
  }

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-10">
          <div
            className="alert alert-danger d-none"
            role="alert"
            id="alert-box"
          ></div>
          <h1 className="d-flex justify-content-center">
            {this.state.movie.Title}
          </h1>
          <img
            className="rounded mx-auto d-block"
            src={this.state.movie.Poster}
            alt="movie poster"
          />
          <div className="list-group special-color">
            <div className="list-group-item special-color-dark">
              <h3>Released:</h3>
              <h5>{this.state.movie.Year}</h5>
            </div>
            <div className="list-group-item special-color-dark">
              <h3>Genre:</h3>
              <h5> {this.state.movie.Genre}</h5>
            </div>
            <div className="list-group-item special-color-dark">
              <h3>Director:</h3>
              <h5> {this.state.movie.Director}</h5>
            </div>
            <div className="list-group-item special-color-dark">
              <h3>Actors:</h3>
              <h5> {this.state.movie.Actors}</h5>
            </div>
            <div className="list-group-item special-color-dark">
              <h3> Summary:</h3>
              <h5> {this.state.movie.Plot}</h5>
            </div>
          </div>
          {this.state.user.username !== "" && !this.state.user.blocked && (
            <div className="row" id="review-box">
              <textarea
                className="form-control col-10"
                rows="3"
                onChange={this.setReviewText}
                placeholder="write a review here"
              ></textarea>
              <button
                className="btn btn-primary btn-sm fa fa-plus fa-4x"
                id="add-review-btn"
                onClick={this.addReview}
              >
                {/* Add Review */}
              </button>
            </div>
          )}
          {this.state.user.username === "" && (
            <div className="row">
              <textarea
                className="form-control col-10"
                rows="3"
                onChange={this.setReviewText}
                placeholder="write a review here"
              ></textarea>
              <button
                className="btn btn-primary btn-sm fa fa-plus fa-4x"
                id="add-review-btn"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                {/* Add Review */}
              </button>
            </div>
          )}
          <ul className="list-group">
            {this.state.fetchedReviews.map((review) => (
              <li
                key={review._id}
                className="list-group-item unique-color lighten-1"
              >
                {review.text}-{" "}
                <Link style={{color: "pink"}} to={"/profile/" + review.username}>
                  {review.username}
                </Link>
                {this.state.user.username !== "" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.flagReview(review)}
                  >
                    Flag review
                  </button>
                )}
                {(this.state.user.username !== "" && !this.state.user.friends.includes(review.userId) && this.state.user._id !== review.userId) &&
                  <button
                      className="btn btn-primary"
                      onClick={() => this.addFriend(review.username)}
                  >
                    Add Friend
                  </button>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MovieDetail;
