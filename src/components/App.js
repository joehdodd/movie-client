import React from "react";
import { Route } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";
import MovieContainer from "./MovieContainer";
import PersonContainer from "./PersonContainer";

class App extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={MoviesContainer} />
        <Route path="/movie/:movieId" component={MovieContainer} />
        <Route path="/person/:personId" component={PersonContainer} />
      </main>
    );
  }
}

export default App;
