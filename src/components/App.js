import React from "react";
import { Route } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";
import MovieContainer from "./MovieContainer";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={MoviesContainer} />
        <Route path="/movie/:movieId" component={MovieContainer} />
      </main>
    );
  }
}

export default App;
