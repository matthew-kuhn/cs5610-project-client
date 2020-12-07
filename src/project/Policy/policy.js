import React from "react";

export default class Policy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    setChecked = (event) => {
        const checked = event.target.checked
        this.setState({checked: checked})
    }

    register = () => {
        this.props.history.push("/register")
    }

    render() {
        return (
            <div className="container text-white">
                <div className="row d-flex justify-content-center">
                    <h3>Policy page</h3>
                </div>
                <div>
                    <p>
                        Give me your social security number and banking info and a Saudi prince will give you
                        10 million dollars via bitcoins
                    </p>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                           onChange={this.setChecked}/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        I understand
                    </label>
                </div>
                {
                    this.state.checked && <button className="btn btn-primary" onClick={this.register}>Register</button>
                }
            </div>
        )
    }
}
