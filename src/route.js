import React from "react";
import { Routes, Route } from "react-router-dom";

import Giphy from "./components/Giphy";
import GiphyDetails from "./components/GiphyDetails";


const Routing = () => {
  return (
    <Routes>
      {/* <Route exact path="/" element={<Giphy />}> */}
        {/* <Route exact path="/:id" element={<GiphyDetails />} /> */}
        <Route exact path="/" component={Giphy} />
        <Route exact path="/:id" component={GiphyDetails} />
      {/* </Route> */}
    </Routes>
    // <Giphy />
  );
};

export default Routing;
