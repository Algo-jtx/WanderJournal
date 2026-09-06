import { Route, Routes } from "react-router-dom";

import Discover from "./pages/Discover";
import Journal from "./pages/Journal";
import ReadPage from "./pages/ReadPage";
import LeavePage from "./pages/LeavePage";
import ComposePage from "./pages/ComposePage";
import PassJournal from "./pages/PassJournal";
import Journey from "./pages/Journey";
import AuthPage from "./pages/AuthPage";

import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <main className="page">
      <Routes>
        <Route path="/" element={<Discover />} />

        <Route
          path="/journal/:journalId"
          element={<Journal />}
        />

        <Route
          path="/journal/:journalId/page/:pageId"
          element={<ReadPage />}
        />

        <Route
          path="/journey/:journalId"
          element={<Journey />}
        />

        <Route
          path="/auth"
          element={<AuthPage />}
        />

        <Route
          path="/journal/:journalId/leave"
          element={
            <RequireAuth>
              <LeavePage />
            </RequireAuth>
          }
        />

        <Route
          path="/journal/:journalId/compose"
          element={
            <RequireAuth>
              <ComposePage />
            </RequireAuth>
          }
        />

        <Route
          path="/journal/:journalId/pass"
          element={
            <RequireAuth>
              <PassJournal />
            </RequireAuth>
          }
        />
      </Routes>

    </main>
  );
}

export default App;
