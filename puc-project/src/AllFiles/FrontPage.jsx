import React from "react";
import { Route, Routes } from "react-router";
import Commercial from "./Commercial";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Personal from "./Personal";

const FrontPage = () => {
  return (
    <div>
      <h3 className="headclass p-3">
        pollution control certificate (PUC) Officials{" "}
      </h3>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="personal" element={<Personal />} />
        <Route path="commercial" element={<Commercial />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default FrontPage;
