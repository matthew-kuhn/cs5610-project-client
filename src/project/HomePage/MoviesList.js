import React from 'react'
import MovieDetail from "../SearchDetails/MovieDetail";
import axios from 'axios'
import {Link} from "react-router-dom";

export class MoviesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            title: ''
        }
    }

    titleChange = (evt) => {
        this.setState({title: evt.target.value})
    }

    searchMovies = () => {
        axios.get(`https://www.omdbapi.com/?apikey=4dc3a14a&s=${this.state.title}`)
            .then(response => this.setState({movies: response.data.Search}))
    }

    render() {
        return (
            <div>
                <h1>MoviesList</h1>
                <input
                    onChange={(event) => this.titleChange(event)}
                    value={this.state.title}
                />
                <button onClick={this.searchMovies}>Search</button>
                <ul>
                {this.state.movies.map(movie =>
                    <li key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            {movie.Title}
                        </Link>
                    </li>
                )}
                </ul>
            </div>
        )
    }
}
