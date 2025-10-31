// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile.jsx";
import Camera from "./pages/Camera";
import Preferences from "./pages/Preferences";
import Analytics from "./pages/Analytics";
import Random from "./pages/Random.jsx";
import FlyerSearch from "./components/FlyerProcess";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/random" element={<Random />} />
        <Route path="/flyers" element={<FlyerSearch />} />
        {/* Catch-all route for 404 Not Found */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
