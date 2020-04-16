import React from "react";
import "./Movie.css";
import axios from "axios";

const convertDate = (d) => new Date(d).toDateString();

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      movieCredits: []
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
    return (
      <>
        <div
          className="hero-container"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), rgb(17, 17, 17) 100%), url(http://image.tmdb.org/t/p/original${movie.poster_path})`,
          }}
        >
          <div className="hero-info-container">
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
            <div className="movie-info-item">
              <h3>Release Date</h3>
              <span>
                {!!movie.release_date && convertDate(movie.release_date)}
              </span>
            </div>
            <div className="movie-info-item">
              <h3>Genres</h3>
              {!!movie.genres &&
                movie.genres.map((g) => <span>{g.name}&nbsp;</span>)}{" "}
            </div>
            <div className="movie-info-item">
              <h3>Synopsis</h3>
              <p>{movie.overview}</p>
            </div>
            <div className="movie-info-item">
              <h3>Cast</h3>
              {!!movieCredits && (
                <div className="movie-cast-container">
                  {movieCredits.map((c) => (
                    <span key={c.name}>
                      <strong>{c.name}:</strong> {c.character}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
