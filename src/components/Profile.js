import React from "react";
export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <h3>{this.props.userId}</h3>
      </div>
    );
  }
}
