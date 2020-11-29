import React from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: ''
        }
    }

    componentDidMount() {
        axios.get(`https://www.omdbapi.com/?apikey=4dc3a14a&i=${this.props.movieId}`)
            .then(response => this.setState({movie: response.data}))
    }


    render() {
        return (
            <div>
                <Link to={'/'}>Return</Link>
                <h1>
                    {this.state.movie.Title}
                </h1>
                <img src={this.state.movie.Poster} alt="movie poster"/>
                <p>Released: {this.state.movie.Year}</p>
                <p>Genre: {this.state.movie.Genre}</p>
                <p>Director: {this.state.movie.Director}</p>
                <p>Actors: {this.state.movie.Actors}</p>
                <p>Summary: {this.state.movie.Plot}</p>
            </div>
        )
    }
}

export default MovieDetail