import React from "react";
import { register } from "../../services/userService";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      adminKey: "",
      role: "",
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
    if (this.state.password === this.state.confirmPassword) {
      register(this.state.username, this.state.password).then((user) =>
        this.props.history.push(`/profile`)
      );
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
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
                type="text"
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
              <label htmlFor="login-password">Confirm Password</label>
              <input
                type="text"
                className="form-control"
                id="login-password"
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
