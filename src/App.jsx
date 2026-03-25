import React, { useState } from "react";
import Login from "./components/Login";
import BookList from "./components/BookList";

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
        <>
          <button onClick={handleLogout}>Logout</button>
          <BookList />
        </>
      )}
    </div>
  );
}

export default App;