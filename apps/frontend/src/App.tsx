import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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

  return (
    <nav style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "16px" }}>
        首頁
      </Link>

      {token ? (
        <button onClick={logout}>登出</button>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "16px" }}>
            登入
          </Link>
          <Link to="/register">註冊</Link>
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
