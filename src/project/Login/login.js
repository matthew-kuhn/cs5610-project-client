import React from "react"
import {login} from "../../services/userService"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    setUsername = (evt) => {
        this.setState({username: evt.target.value})
    }

    setPassword = (evt) => {
        this.setState({password: evt.target.value})
    }

    login = () => {
        login(this.state.username, this.state.password)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error('login failed')
                } else {
                    return response.json()
                }
            })
            .then(user => this.props.history.push('/profile'))
            .catch(error => alert(error))
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="login-username">Username</label>
                    <input type="text" className="form-control" id="login-username" onChange={this.setUsername}/>
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input type="text" className="form-control" id="login-password" onChange={this.setPassword}/>
                </div>
                <button className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
        );
    }
}
