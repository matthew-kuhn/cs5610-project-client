import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            title: "",
            searchHasResults: true
        };
    }

    componentDidMount() {
        if (this.props.searchString) {
            this.searchMovies(this.props.searchString)
            console.log(this.props.searchString)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchString !== this.props.searchString) {
            this.searchMovies(this.props.searchString)
        }
    }

    titleChange = (evt) => {
        this.setState({title: evt.target.value});
    };

    searchMovies = (movieTitle) => {
        axios
            .get(`https://www.omdbapi.com/?apikey=4dc3a14a&s=${movieTitle}`)
            .then((response) => {
                if (response.data.Search) {
                    this.setState({searchHasResults: true})
                    this.setState({movies: response.data.Search})
                } else {
                    console.log("search has no results")
                    this.setState({searchHasResults: false})
                }
            });
    };

    render() {
        return (
            <div className="d-flex justify-content-center fill text-white">
                <div className="col-8">
                    <div className="row">
                        <input
                            className="form-control col-8"
                            onChange={(event) => this.titleChange(event)}
                            value={this.state.title}
                        />
                        <button
                            className="btn default-color col-2"
                            onClick={() => {
                                if (this.state.title !== "") {
                                    this.props.history.push(`/search/${this.state.title}`)
                                } else {
                                    this.props.history.push('/search')
                                }
                            }}
                        >
                            Search
                        </button>
                    </div>
                    {!this.state.searchHasResults &&
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >No Movies found</div>
                    }
                    <ul className="list-group">
                        {this.state.movies.map((movie) => (
                            <li key={movie.imdbID} className="list-group-item">
                                <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
