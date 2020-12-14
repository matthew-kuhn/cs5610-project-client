import React from "react";
import {
  getSessionUser,
  getUser,
  blockUser,
  unblockUser,
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
import { Link } from "react-router-dom";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        role: "",
        blocked: false,
        password: "",
        name: "",
        blockedUsers: [],
      },
      reviews: [],
      loggedInUser: {},
      editingMode: false,
      tempUser: {
        username: "",
        role: "",
        blocked: false,
        password: "",
        name: "",
        blockedUsers: [],
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
      "btn btn-warning d-none fa fa-pencil";
    document.getElementById(`${review._id}-save`).className =
      "btn btn-success fa fa-check pull-right";
    document.getElementById(`${review._id}-text`).className = "d-none";
    document.getElementById(`${review._id}-input`).className = "form-control";
  };

  finishEditing = (review) => {
    document.getElementById(`${review._id}-edit`).className =
      "btn btn-warning fa fa-pencil pull-right";
    document.getElementById(`${review._id}-save`).className =
      "btn btn-success d-none fa fa-check";
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
    blockUser(username).then((response) => {
      console.log(username + " blocked");
      getUser(this.state.user.username)
        .then((response) => response.json())
        .then((user) => this.setState({ user: user }));
    });

  unblockUser = (userId) =>
    unblockUser(userId).then((response) => console.log(userId + " unblocked"));

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

  addFriend = async () => {
    this.state.user.friends.push(this.state.loggedInUser._id);
    editUser(this.state.user).then((response) =>
      this.setState({
        user: response,
      })
    );
    this.state.loggedInUser.friends.push(this.state.user._id);
    editUser(this.state.loggedInUser).then((response) => {
      this.setState({
        loggedInUser: response,
      });
    });
  };

  removeFriend = async (friendName) => {
    let response = await getUser(friendName);
    let friend = await response.json();
    friend.friends.push(this.state.loggedInUser._id);
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        friends: [...this.state.loggedInUser.friends, friend._id],
      },
    });
  };

  areFriends = (user1, user2) => {
    for (let i = 0; i < user1.friends.length; i++) {
      if (user1.friends[i]._id === user2._id) {
        return true;
      }
    }
    return false;
  };

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
          {!this.state.editingMode &&
            this.state.user.username === this.state.loggedInUser.username && (
              <button
                className="btn btn-sm btn-primary"
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
          <br />
          {this.state.loggedInUser &&
            this.state.loggedInUser.username === this.state.user.username && (
              <div className="d-flex justify-content-center ">
                <h3 className="d-flex justify-content-center">
                  Role: {this.state.user.role}
                </h3>
              </div>
            )}
          {this.state.loggedInUser &&
            this.state.loggedInUser.username !== this.state.user.username &&
            this.state.user.friends &&
            !this.areFriends(this.state.user, this.state.loggedInUser) && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    this.addFriend().then(this.setState({ state: this.state }))
                  }
                >
                  <h6>Add Friend</h6>
                </button>
              </div>
            )}

          {this.state.editingMode && (
            <button
              className="btn btn-success"
              onClick={() => {
                this.setNormalMode();
                editUser(this.state.tempUser).then((user) => {
                  this.setState({ user: user });
                  this.setState({ loggedInUser: user });
                });
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
          {this.state.loggedInUser &&
            this.state.loggedInUser.username === this.state.user.username && (
              <div>
                <h3 className="d-flex justify-content-center">Friends</h3>
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
                          className="btn btn-warning fa fa-pencil pull-right"
                          id={review._id + "-edit"}
                          onClick={() => this.startEditing(review)}
                        >
                          {/* <b>Edit Review</b> */}
                        </button>
                      )}
                    {this.state.loggedInUser.username ===
                      this.state.user.username &&
                      !this.state.editingMode && (
                        <button
                          className="btn btn-success d-none fa fa-check pull-right"
                          id={review._id + "-save"}
                          onClick={() => this.finishEditing(review)}
                        >
                          {/* Save */}
                        </button>
                      )}
                    {this.state.loggedInUser.username ===
                      this.state.user.username &&
                      !this.state.editingMode && (
                        <button
                          className="btn btn-danger fa fa-trash pull-right"
                          onClick={() => this.deleteReview(review._id)}
                        >
                          {/* <b>Delete</b> */}
                        </button>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {this.state.user.role === "admin" && (
            <div>
              <h3>Blocked Users</h3>
              <ul className="list-group">
                {this.state.user.blockedUsers.map((blockedUser) => (
                  <li
                    key={blockedUser._id}
                    className="list-group-item unique-color lighten-1"
                  >
                    {blockedUser.username}
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.unblockUser(blockedUser._id);
                        const newBlockedUsers = this.state.user.blockedUsers.filter(
                          (user) => user._id !== blockedUser._id
                        );
                        this.setState({
                          user: {
                            ...this.state.user,
                            blockedUsers: newBlockedUsers,
                          },
                        });
                      }}
                    >
                      Unblock User
                    </button>
                  </li>
                ))}
              </ul>
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
        </div>
      </div>
    );
  }
}
