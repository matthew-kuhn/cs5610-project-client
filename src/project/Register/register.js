import React from "react"
import {register} from "../../services/userService"

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }

    setUsername = (evt) => {
        this.setState({username: evt.target.value})
    }

    setPassword = (evt) => {
        this.setState({password: evt.target.value})
    }

    setConfirmPassword = (evt) => {
        this.setState({confirmPassword: evt.target.value})
    }

    register = () => {
        if (this.state.password === this.state.confirmPassword) {
            register(this.state.username, this.state.password)
                .then(user => this.props.history.push(`/profile`))
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label htmlFor="login-username">Username</label>
                        <input type="text" className="form-control" id="login-username"
                               onChange={this.setUsername}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input type="text" className="form-control" id="login-password"
                               onChange={this.setPassword}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Confirm Password</label>
                        <input type="text" className="form-control" id="login-password"
                               onChange={this.setConfirmPassword}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }
}
