import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { gql, graphql } from "react-apollo";

const Home = ({ Router }) =>
  <div>
    <h2>Home</h2>
  </div>;

const About = () =>
  <div>
    <h2>About</h2>
  </div>;

const _App = ({ data: { heroes = [] } }) =>
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {heroes.map(h =>
        <li key={h.name}>
          {h.name}
        </li>
      )}
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>;

const Query = gql`
  {
    heroes {
      name
    }
  }
`;

export const App = graphql(Query)(_App);
