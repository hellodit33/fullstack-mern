import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../../pages/Profile";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";
import Hints from "../../pages/Hints";
import Onboarding from "../Profile/Onboarding";

const index = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hints />} />
          <Route path="/hints" element={<Hints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
