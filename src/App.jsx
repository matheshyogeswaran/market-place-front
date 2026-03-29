import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;