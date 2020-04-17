import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movies.css";

const MovieListItem = ({ movie }) => (
  <Link to={`/movie/${movie.id}`}>
    <div className="card movie">
      <span>{movie.original_title}</span>
    </div>
  </Link>
);

const MoviesList = ({ movies, handleClick }) => {
  return (
    <div
      className="movies-list-container"
      style={{ gridTemplateRows: `repeat(${movies.length}, 1fr)` }}
    >
      {!!movies &&
        !!movies.length &&
        movies.map((m) => (
          <MovieListItem movie={m} handleClick={handleClick} key={m.id}/>
        ))}
    </div>
  );
};

const MovieSearch = ({ queryValue, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="movieQuery"
        value={queryValue}
        onChange={onChange}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default class MoviesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movie: {},
      queryValue: "",
      queryError: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`)
      .then((res) => this.setState({ movies: res.data.movies }))
      .catch((err) => this.setState({ error: err }));
  }

  handleChange = (e) => {
    this.setState({ queryValue: e.target.value });
  };

  handleQuery = (e) => {
    e.preventDefault();
    e.persist();
    const { queryValue } = this.state;
    if (!queryValue) {
      return this.setState({
        queryError: true,
        errorMessage: "Oops! Please enter some search text... 😅",
      });
    }
    axios
      .get(
        `${process.env.REACT_APP_MOVIE_API_URL}/movies/search?search=${queryValue}`
      )
      .then((res) =>
        this.setState({ movies: res.data.movies, queryError: false })
      )
      .catch((err) =>
        this.setState({
          queryError: true,
          errorMessage: "Oops! Something went wrong.. 😞",
        })
      );
  };

  render() {
    const { movies, queryValue, queryError, errorMessage } = this.state;
    return (
      <>
        <header className="movies-header-container">
          <h1>
            <span role="img" aria-label="Movie clapper and popcorn">
              🎬🍿
            </span>
          </h1>
          <div className="movies-search-container">
            {queryError && <span>{errorMessage}</span>}
            <MovieSearch
              onChange={this.handleChange}
              onSubmit={this.handleQuery}
              queryValue={queryValue}
            />
          </div>
        </header>
        <div className="movies-list-wrapper">
          <MoviesList movies={movies} />
        </div>
      </>
    );
  }
}
