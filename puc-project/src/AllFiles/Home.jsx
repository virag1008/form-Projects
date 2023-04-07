import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homePage">
      <h2>Home Page</h2>
      <div>
        <Link to="/personal">
          <button className="btn btn-warning m-2"> Personal </button>
        </Link>
        <Link to="/commercial">
          <button className="btn btn-success m-2 "> Commercial </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
