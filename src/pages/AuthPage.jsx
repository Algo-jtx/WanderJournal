import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [working, setWorking] = useState(false);

  const destination = location.state?.from || "/";

  function handleSubmit(event) {
    event.preventDefault();

    setWorking(true);
    setStatus("");

    const action =
      mode === "signup"
        ? signUp(email, password)
        : signIn(email, password);

    action
      .then(({ data, error }) => {
        if (error) {
          setStatus(error.message);
          setWorking(false);
          return;
        }

        if (data.user || data.session) {
          navigate(destination, { replace: true });
          return;
        }

        setStatus("You're in. Continue to WanderJournal.");
        setWorking(false);
      })
      .catch((error) => {
        setStatus(error.message);
        setWorking(false);
      });
  }

  return (
    <div className="auth-page">
      <div className="page-inner">

        <header className="auth-topbar">
          <Link to="/" className="wj-wordmark">
            WanderJournal
          </Link>

          <Link to="/" className="journal-back">
            ← Back to discover
          </Link>
        </header>

        <section className="auth-layout">

          <div className="auth-intro">
            <p className="eyebrow">
              {mode === "signup"
                ? "Join the journey"
                : "Welcome back"}
            </p>

            <h1>
              {mode === "signup" ? (
                <>
                  LEAVE
                  <br />
                  SOMETHING.
                </>
              ) : (
                <>
                  FIND YOUR
                  <br />
                  WAY BACK.
                </>
              )}
            </h1>

            <p className="auth-intro-copy">
              WanderJournal only asks you to sign in when you want
              to leave something behind.
            </p>

            <div className="auth-paper-note">
              <p className="annotation">
                read freely.
                <br />
                contribute when you're ready ↗
              </p>
            </div>
          </div>

          <div className="auth-card">
            <p className="eyebrow">
              {mode === "signup"
                ? "Create your traveler account"
                : "Sign in"}
            </p>

            <h3>
              {mode === "signup"
                ? "Your next page starts here."
                : "The journal kept moving."}
            </h3>

            <form onSubmit={handleSubmit} className="auth-form">

              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  placeholder="you@example.com"
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  minLength="6"
                  required
                  placeholder="At least 6 characters"
                />
              </label>

              {status && (
                <p className="auth-status">
                  {status}
                </p>
              )}

              <button
                type="submit"
                className="button auth-submit"
                disabled={working}
              >
                {working
                  ? "One moment..."
                  : mode === "signup"
                  ? "Join WanderJournal →"
                  : "Come back in →"}
              </button>
            </form>

            <button
              type="button"
              className="auth-mode-switch"
              onClick={() => {
                setMode(
                  mode === "signup"
                    ? "signin"
                    : "signup"
                );
                setStatus("");
              }}
            >
              {mode === "signup"
                ? "Already have an account? Sign in."
                : "New here? Create an account."}
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}

export default AuthPage;
