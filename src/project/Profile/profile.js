import React from "react";
import { getSessionUser, getUser, blockUser } from "../../services/userService";
import {
  findAllReviews,
  findReviewsForUser,
  deleteReview,
} from "../../services/reviewService";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", role: "", blocked: false },
      reviews: [],
      loggedInUser: {},
    };
  }

  deleteReview = (reviewId) =>
    deleteReview(reviewId)
      .then((response) => findAllReviews())
      .then((reviews) => {
        const flaggedReviews = reviews.filter(
          (review) => review.flagged === true
        );
        this.setState({ reviews: flaggedReviews });
      });

  blockUser = (username) =>
    blockUser(username).then((response) => alert(username + " blocked"));

  componentDidMount() {
    getSessionUser()
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("login first");
        } else {
          return response.json();
        }
      })
      .then((user) => this.setState({ loggedInUser: user }))
      .catch((error) => {
        document.getElementById("alert-box").innerHTML = error.message;
        document.getElementById("alert-box").className = "alert alert-danger";
      });
    if (this.props.username) {
      getUser(this.props.username)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("No such user exists");
          } else {
            return response.json();
          }
        })
        .then((user) =>
          this.setState({ user: user }, () =>
            findReviewsForUser(this.state.user.username).then((reviews) => {
              console.log(reviews);
              this.setState({ reviews: reviews });
            })
          )
        )
        .catch((error) => {
          document.getElementById("alert-box").innerHTML = error.message;
          document.getElementById("alert-box").className = "alert alert-danger";
        });
    } else {
      getSessionUser()
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("login first");
          } else {
            return response.json();
          }
        })
        .then((user) =>
          this.setState({ user: user }, () => {
            if (this.state.user.role === "user") {
              findReviewsForUser(this.state.user.username).then((reviews) => {
                this.setState({ reviews: reviews });
              });
            } else if (this.state.user.role === "admin") {
              findAllReviews().then((reviews) => {
                const flaggedReviews = reviews.filter(
                  (review) => review.flagged === true
                );
                this.setState({ reviews: flaggedReviews });
              });
            }
          })
        )
        .catch((error) => {
          document.getElementById("alert-box").innerHTML = error.message;
          document.getElementById("alert-box").className = "alert alert-danger";
        });
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <h1 className="d-flex justify-content-center">Profile</h1>
          <div
            className="alert alert-danger d-none"
            role="alert"
            id="alert-box"
          ></div>
          <h1 className="d-flex justify-content-center">
            {this.state.user.username}
          </h1>
          {this.state.loggedInUser &&
            this.state.loggedInUser.username === this.state.user.username && (
              <h3 className="d-flex justify-content-center">
                Role: {this.state.user.role}
              </h3>
            )}
          {this.state.user.role === "user" && (
            <div>
              {this.state.user.blocked && (
                <h3>You're blocked, you cannot comment</h3>
              )}
              <h3>Reviews</h3>
              <ul className="list-group">
                {this.state.reviews.map((review) => (
                  <li
                    key={review._id}
                    className="list-group-item unique-color lighten-1"
                  >
                    {review.text}- {review.movieId}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {this.state.user.role === "admin" && (
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
                      onClick={() => this.deleteReview(review._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.blockUser(review.username)}
                    >
                      Block User
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}
