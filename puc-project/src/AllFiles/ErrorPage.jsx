import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";

const ErrorPage = () => {
  return (
    <div className="homePage">
      <h1> Error Page </h1>
      <Link to="/">
        <button className="btn btn-info"> Go to Home Page </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
