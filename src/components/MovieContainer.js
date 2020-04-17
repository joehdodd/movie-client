import React from "react";
import MoviePersonItem from "./MoviePersonItem";
import "./Movie.css";
import axios from "axios";
import { convertDate } from "./utils";

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieCredits: [],
    };
  }
  componentDidMount() {
    const { movieId } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_MOVIE_API_URL}/movies/movie?movieId=${movieId}`
      )
      .then((res) => {
        this.setState({
          movie: { ...res.data.movie },
          movieCredits: [...res.data.movieCredits],
        });
      })
      .catch((err) => this.setState({ error: err }));
  }
  render() {
    const { movie, movieCredits } = this.state;
    const heroBG = movie.poster_path
      ? {
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgb(17, 17, 17) 100%), url(http://image.tmdb.org/t/p/original${movie.poster_path})`,
        }
      : { backgroundColor: "#e1e1e4" };
    return (
      <div className="movie-wrapper">
        <div className="hero-container" style={heroBG}>
          <div className="hero-info-container">
            {movie.poster_path && (
              <img
                src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt="Movie Poster"
              />
            )}
            <h1>{movie.title}</h1>
            <p>{movie.tagline}</p>
          </div>
        </div>
        <div className="movie-info-container">
          <div className="card">
            <h3>Release Date</h3>
            <span>
              {!!movie.release_date && convertDate(movie.release_date)}
            </span>
          </div>
          <div className="card">
            <h3>Genres</h3>
            {!!movie.genres &&
              movie.genres.map((g) => (
                <span key={g.name}>{g.name}&nbsp;</span>
              ))}{" "}
          </div>
          <div className="card">
            <h3>Synopsis</h3>
            <p>{movie.overview}</p>
          </div>
          <div className="card">
            <h3>Cast</h3>
            {!!movieCredits && (
              <div className="movie-cast-container">
                {movieCredits.map((c) => (
                  <MoviePersonItem key={c.id} person={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
