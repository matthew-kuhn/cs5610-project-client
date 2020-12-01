import React from "react";
import { register } from "../../services/userService";
import "../../index.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      adminKey: "",
      role: "user",
    };
  }

  setUsername = (evt) => {
    this.setState({ username: evt.target.value });
  };

  setPassword = (evt) => {
    this.setState({ password: evt.target.value });
  };

  setConfirmPassword = (evt) => {
    this.setState({ confirmPassword: evt.target.value });
  };

  setName = (evt) => {
    this.setState({ name: evt.target.value });
  };

  setRole = (evt) => {
    this.setState({ role: evt.target.value });
  };

  setAdminKey = (evt) => {
    this.setState({ adminKey: evt.target.value });
  };

  register = () => {
    console.log(this.state);
    if (
      this.state.username.length > 1 &&
      this.state.password.length > 1 &&
      this.state.role.length > 1 &&
      this.state.name.length > 1
    ) {
      if (this.state.password === this.state.confirmPassword) {
        register(
          this.state.username,
          this.state.password,
          this.state.role,
          this.state.adminKey,
          this.state.name
        ).then((res) => {
          if (res.message === "Admin Key incorrect") {
            alert(res.message);
          } else {
            this.props.history.push(`/profile`);
          }
        });
      }
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center fill text-white">
        <div className="col-8">
          <h1 className="d-flex justify-content-center">Register</h1>
          <div className="form-group">
            <label htmlFor="login-role">Choose Role</label>
            <select className="form-control" onChange={this.setRole}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                className="form-control"
                id="login-username"
                onChange={this.setUsername}
              />
            </div>
            <div className="col-6">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                className="form-control"
                id="login-password"
                onChange={this.setPassword}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="login-name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="login-name"
                onChange={this.setName}
              />
            </div>
            <div className="col-6">
              <label htmlFor="login-confirm-password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="login-confirm-password"
                onChange={this.setConfirmPassword}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="login-admin-key">Admin Key</label>
            <input
              type="text"
              className="form-control"
              id="login-admin-key"
              onChange={this.setAdminKey}
            />
          </div>
          <div className="form-group"></div>
          <button className="btn btn-primary" onClick={this.register}>
            Register
          </button>
        </div>
      </div>
    );
  }
}
