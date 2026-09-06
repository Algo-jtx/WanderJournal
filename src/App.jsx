import { Routes, Route } from "react-router-dom";

import Discover from "./pages/Discover";
import Journal from "./pages/Journal";
import ReadPage from "./pages/ReadPage";
import LeavePage from "./pages/LeavePage";
import ComposePage from "./pages/ComposePage";
import PassJournal from "./pages/PassJournal";
import Journey from "./pages/Journey";

function App() {
  return (
    <main className="page">
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/journal/:journalId" element={<Journal />} />
        <Route
          path="/journal/:journalId/page/:pageId"
          element={<ReadPage />}
        />
        <Route path="/journal/:journalId/leave" element={<LeavePage />} />
        <Route path="/journal/:journalId/compose" element={<ComposePage />} />
        <Route path="/journal/:journalId/pass" element={<PassJournal />} />
        <Route path="/journey/:journalId" element={<Journey />} />
      </Routes>
    </main>
  );
}

export default App;
