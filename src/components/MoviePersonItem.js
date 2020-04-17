import React from "react";
import { Link } from "react-router-dom";

export default ({ person }) => {
  const [hovering, setHovering] = React.useState(false);
  return (
    <Link to={`/person/${person.id}`}>
      <div
        className="movie-person-item"
        key={person.name}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div>
          <span style={{ marginRight: "16px" }}>
            <strong>{person.name}:</strong> {person.character}
          </span>{" "}
          {hovering && (
            <span role="img" aria-label="Star eyes emoji">
              🤩
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
