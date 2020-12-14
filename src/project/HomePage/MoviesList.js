import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {getSessionUser} from "../../services/userService";
import {findAllReviews} from "../../services/reviewService";
import logo from "../../clapperboard-icon.png"
import "./moviesList.style.css"

export class MoviesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            user: {username: ""},
            reviews: []
        };
    }

    componentDidMount() {
        getSessionUser()
            .then((response) => {
                if (response.status !== 200) {
                } else {
                    return response.json();
                }
            })
            .then((user) => this.setState({user: {username: user.username}}))
            .catch((error) => {
            });
        findAllReviews()
            .then(reviews => {
                this.setState({reviews: reviews})
            })
        this.componentDidMount = true;
    }

    titleChange = (evt) => {
        this.setState({title: evt.target.value});
    };

    searchMovies = () => {
        if (this.state.title === "") {
            this.props.history.push('/search')
        } else {
            this.props.history.push(`/search/${this.state.title}`)
        }
    };

    render() {
        return (
            <div className="d-flex justify-content-center fill text-white">
                
                <div className="col-8">
                    <br/>
                    <h1 className="d-flex justify-content-center">Moview</h1>
                    <img className="d-flex justify-content-center" src={logo} id="logo" />
                    {this.state.user.username === "" && (
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn default-color"
                                onClick={() => this.props.history.push(`/login`)}
                            >
                                Login
                            </button>
                            <button
                                className="btn default-color"
                                onClick={() => this.props.history.push(`/policy`)}
                            >
                                Sign up
                            </button>
                        </div>
                    )}
                    <br/>
                    <br/>
                    {this.state.user.username !== "" && (
                        <h3 className="d-flex justify-content-center">
                            Welcome Back, {this.state.user.username}!
                        </h3>
                    )}
                    <br/>
                    <div className="row">
                        <input
                            className="form-control col-8"
                            onChange={(event) => this.titleChange(event)}
                            value={this.state.title}
                        />
                        <button
                            className="btn btn-sm col-0 default-color fa fa-search fa-4x"
                            id="round-btnn"
                            onClick={this.searchMovies}
                        >
                        </button>
                    </div>
                    <h3>Recent Reviews</h3>
                    <ul className="list-group">
                    {
                        this.state.reviews.reverse().slice(0, this.state.reviews.length < 5 ? this.state.reviews.length : 5).map(review => (
                            <li
                                key={review._id}
                                className="list-group-item unique-color lighten-1"
                            >
                                {review.movieTitle}: {review.text} - {review.username}
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        );
    }
}
