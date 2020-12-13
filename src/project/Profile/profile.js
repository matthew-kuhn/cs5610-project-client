import React from "react";
import {
  getSessionUser,
  getUser,
  blockUser,
  editUser,
} from "../../services/userService";
import {
  findAllReviews,
  findReviewsForUser,
  deleteReview,
  editReview,
} from "../../services/reviewService";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import "./profile.style.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "", role: "", blocked: false, password: "", name: "" },
      reviews: [],
      loggedInUser: {},
      editingMode: false,
      tempUser: {
        username: "",
        role: "",
        blocked: false,
        password: "",
        name: "",
      },
    };
  }

  deleteReviewAdmin = (reviewId) =>
    deleteReview(reviewId)
      .then((response) => findAllReviews())
      .then((reviews) => {
        const flaggedReviews = reviews.filter(
          (review) => review.flagged === true
        );
        this.setState({ reviews: flaggedReviews });
      });

  deleteReview = (reviewId) => {
    deleteReview(reviewId).then(
      findReviewsForUser(this.state.user._id).then((reviews) => {
        this.setState({ reviews: reviews });
      })
    );
    document.getElementById(reviewId + "-li").remove();
  };

  startEditing = (review) => {
    document.getElementById(`${review._id}-edit`).className =
      "btn btn-warning d-none";
    document.getElementById(`${review._id}-save`).className = "btn btn-success";
    document.getElementById(`${review._id}-text`).className = "d-none";
    document.getElementById(`${review._id}-input`).className = "form-control";
  };

  finishEditing = (review) => {
    document.getElementById(`${review._id}-edit`).className = "btn btn-warning";
    document.getElementById(`${review._id}-save`).className =
      "btn btn-success d-none";
    document.getElementById(`${review._id}-text`).className = "";
    document.getElementById(
      `${review._id}-text`
    ).innerHTML = document.getElementById(`${review._id}-input`).value;
    document.getElementById(`${review._id}-input`).className =
      "form-control d-none";
    let temp = review;
    temp.text = document.getElementById(`${review._id}-input`).value;
    editReview(review._id, temp).then(
      findReviewsForUser(this.state.user._id).then((reviews) => {
        this.setState({ reviews: reviews });
      })
    );
    document.getElementById(
      `${review._id}-text`
    ).innerHTML = document.getElementById(`${review._id}-input`).value;
  };

  blockUser = (username) =>
    blockUser(username).then((response) => alert(username + " blocked"));

  setEditingMode = () => this.setState({ editingMode: true });

  setNormalMode = () => this.setState({ editingMode: false });

  setUsername = (evt) => {
    this.setState({
      tempUser: { ...this.state.tempUser, username: evt.target.value },
    });
  };

  setPassword = (evt) => {
    this.setState({
      tempUser: { ...this.state.tempUser, password: evt.target.value },
    });
  };

  setName = (evt) => {
    this.setState({
      tempUser: { ...this.state.tempUser, name: evt.target.value },
    });
  };

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
            findReviewsForUser(this.state.user._id).then((reviews) => {
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
              findReviewsForUser(this.state.user._id).then((reviews) => {
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

          {!this.state.editingMode &&
            this.state.user.username === this.state.loggedInUser.username && (
              <button
                className="btn btn-sm btn-primary float-right"
                id="round-btn"
                onClick={() => {
                  this.setEditingMode();
                  this.setState({ tempUser: this.state.user });
                }}
              >
                <h6>
                  <b>Edit profile</b>
                </h6>
              </button>
            )}
          <h1 id="userName">{this.state.user.username}</h1>
          <br />
          {this.state.loggedInUser &&
            this.state.loggedInUser.username === this.state.user.username && (
              <h3 className="d-flex justify-content-center">
                Role: {this.state.user.role}
              </h3>
            )}

          {this.state.editingMode && (
            <button
              className="btn btn-success"
              id="round-btn"
              onClick={() => {
                this.setNormalMode();
                editUser(this.state.tempUser).then((user) =>
                  this.setState({ user: user })
                );
              }}
            >
              <h5>
                <b>Save edits</b>
              </h5>
            </button>
          )}
          {this.state.editingMode && (
            <div className="form-group">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                className="form-control"
                id="login-username"
                onChange={this.setUsername}
              />
            </div>
          )}
          {this.state.editingMode && (
            <div className="form-group">
              <label htmlFor="login-name">Name</label>
              <input
                type="text"
                className="form-control"
                id="login-name"
                onChange={this.setName}
              />
            </div>
          )}
          {this.state.editingMode && (
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                className="form-control"
                id="login-password"
                onChange={this.setPassword}
              />
            </div>
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
                    id={review._id + "-li"}
                    className="list-group-item unique-color lighten-1"
                  >
                    {review.movieTitle} :
                    <div id={review._id + "-text"}>{review.text}</div>
                    <input
                      type="text"
                      className="form-control d-none"
                      id={review._id + "-input"}
                      defaultValue={review.text}
                    />
                    {this.state.loggedInUser.username ===
                      this.state.user.username &&
                      !this.state.editingMode && (
                        <button
                          className="btn btn-warning"
                          id={review._id + "-edit"}
                          onClick={() => this.startEditing(review)}
                        >
                          <b>Edit Review</b>
                        </button>
                      )}
                    {this.state.loggedInUser.username ===
                      this.state.user.username &&
                      !this.state.editingMode && (
                        <button
                          className="btn btn-success d-none"
                          id={review._id + "-save"}
                          onClick={() => this.finishEditing(review)}
                        >
                          Save
                        </button>
                      )}
                    {this.state.loggedInUser.username ===
                      this.state.user.username &&
                      !this.state.editingMode && (
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deleteReview(review._id)}
                        >
                          <b>Delete</b>
                        </button>
                      )}
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
                      onClick={() => this.deleteReviewAdmin(review._id)}
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
