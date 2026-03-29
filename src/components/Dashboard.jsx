import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BookList from "./BookList";
import BecomeSeller from "./BecomeSeller";
import Profile from "./Profile";

export default function Dashboard({ onLogout }) {
  return (
    <Router>
      <Navbar onLogout={onLogout} />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/seller" element={<BecomeSeller />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}