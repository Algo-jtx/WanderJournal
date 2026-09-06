import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="auth-loading">
        <p className="eyebrow">WanderJournal</p>
        <p>Finding your place in the journal...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export default RequireAuth;
