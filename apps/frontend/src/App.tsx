import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage"
import IssuePage from "./pages/IssuePage"
import EventPage from "./pages/EventPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/issues/:issueId" element={<IssuePage />} />
          <Route path="/events/:eventId" element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;