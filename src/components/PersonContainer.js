import React from "react";
import axios from "axios";
import { convertDate } from "./utils";
import "./Person.css";

export default class PersonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {},
    };
  }
  componentDidMount() {
    const { personId } = this.props.match.params;
    axios
      .get(
        `${process.env.REACT_APP_MOVIE_API_URL}/people/person?personId=${personId}`
      )
      .then((res) => {
        this.setState({
          person: { ...res.data.person },
        });
      })
      .catch((err) => this.setState({ error: err }));
  }
  render() {
    const { person } = this.state;
    return (
      <div className="person-info-container">
        <>
          {person.profile_path ? (
            <img
              className="person-image"
              src={`http://image.tmdb.org/t/p/h632${person.profile_path}`}
              alt="Actor"
            />
          ) : (
            <div className="person-image-placeholder">
              <span
                style={{ fontSize: "138px" }}
                role="img"
                aria-label="Person Placeholder Emoji"
              >
                😎
              </span>
            </div>
          )}
        </>
        <div className="card person">
          <h2>{person.name}</h2>
          <span>
            <strong>From:</strong> {person.place_of_birth}
          </span>
          <br />
          <span>
            <strong>Born: </strong>
            {convertDate(person.birthday)} <br />
            {person.deathday && (
              <span>
                <strong>Died: </strong>
                {convertDate(person.deathday)}
              </span>
            )}
          </span>
          <hr />
          <p>{person.biography}</p>
        </div>
      </div>
    );
  }
}
