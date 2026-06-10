import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";

import HomePage from "./pages/HomePage"
import EventPage from "./pages/EventPage"
import IssuePage from "./pages/IssuePage"
import LoginPage from "./pages/LoginPage"
import OverviewPage from "./pages/OverviewPage"
import RegisterPage from "./pages/RegisterPage"

function Navbar() {
  const token = localStorage.getItem("access_token");

  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  }

  const navLinkStyle: CSSProperties = {
    color: "#553312",
    textDecoration: "none",
    fontWeight: 600,
  };

  const handleEnter = (e: ReactMouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "#331c06";
  };
  const handleLeave = (e: ReactMouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = "#553312";
  };

  return (
    <nav
      style={{
        padding: "16px",
        borderBottom: "1px solid #633d19",
        fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
      }}
    >
      <Link
        to="/"
        style={{ ...navLinkStyle, marginRight: "16px" }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        首頁
      </Link>

      {token ? (
        <button
          onClick={logout}
          style={{
            ...navLinkStyle,
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: "inherit",
          }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          登出
        </button>
      ) : (
        <>
          <Link
            to="/login"
            style={{ ...navLinkStyle, marginRight: "16px" }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            登入
          </Link>
          <Link
            to="/register"
            style={navLinkStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            註冊
          </Link>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/issues/:issueId" element={<IssuePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
