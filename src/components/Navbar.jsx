import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📚 BookStore</div>

      <div
        style={{
          ...styles.links,
          ...(menuOpen ? styles.mobileMenuOpen : {}),
        }}
      >
        <Link style={styles.link} to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link style={styles.link} to="/seller" onClick={() => setMenuOpen(false)}>
          Become Seller
        </Link>

        <Link style={styles.link} to="/profile" onClick={() => setMenuOpen(false)}>
          Profile
        </Link>

        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div style={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
    position: "relative",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  },

  logoutBtn: {
    padding: "6px 12px",
    background: "#ef4444",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  menuIcon: {
    display: "none",
    fontSize: "24px",
    cursor: "pointer",
  },

  /* Mobile Menu */
  mobileMenuOpen: {
    position: "absolute",
    top: "60px",
    left: "0",
    right: "0",
    flexDirection: "column",
    background: "#2563eb",
    padding: "20px",
  },
};

/* Responsive CSS */
const mediaQuery = `
@media (max-width: 768px) {
  nav div:nth-child(2) {
    display: none;
  }
}
`;

const style = document.createElement("style");
style.innerHTML = mediaQuery;
document.head.appendChild(style);