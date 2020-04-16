import React from "react";
import "./Movie.css";
import axios from "axios";

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }
  componentDidMount() {
    const { movieId } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_MOVIE_API_URL}/movies/movie?movieId=${movieId}`
      )
      .then((res) => this.setState({ movie: res.data.data }))
      .catch((err) => this.setState({ error: err }));
  }
  render() {
    console.log(this.state);
    const { movie } = this.state;
    return (
      <>
        <div
          className="hero-container"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgb(17, 17, 17) 100%), url(http://image.tmdb.org/t/p/original${movie.poster_path})`,
          }}
        >
          <div class="hero-info-container">
            <img
              src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt="Movie Poaster"
            />
            <h1>{movie.title}</h1>
            <p>{movie.tagline}</p>
          </div>
        </div>
        <div className="movie-info-wrapper">
          <div className="movie-info-container">
            <p>{movie.overview}</p>
          </div>
        </div>
      </>
    );
  }
}
