import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import journals from "../data/journals";
import themes from "../data/themes";

function LeavePage() {
  const { journalId } = useParams();
  const navigate = useNavigate();

  const journal = journals.find((item) => item.id === journalId);

  const [formats, setFormats] = useState({
    photo: true,
    writing: true,
    voice: false,
  });

  if (!journal) {
    return null;
  }

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  function toggleFormat(name) {
    setFormats((current) => ({
      ...current,
      [name]: !current[name],
    }));
  }

  function handleContinue() {
    navigate(`/journal/${journal.id}/compose`, {
      state: { formats },
    });
  }

  return (
    <div
      className="leave-page"
      style={{
        "--theme-1": color1,
        "--theme-2": color2,
        "--theme-3": color3,
      }}
    >
      <div className="page-inner">

        <header className="journal-topbar">
          <Link
            to={`/journal/${journal.id}`}
            className="journal-back"
          >
            ← Journal
          </Link>

          <p className="eyebrow">Leave something behind</p>

          <span />
        </header>

        <section className="leave-layout">

          <div className="leave-heading">
            <p className="eyebrow">{journal.title}</p>

            <h1>
              LEAVE
              <br />
              A PAGE
            </h1>

            <p>
              You don't have to tell your story in one particular way.
              Choose whatever feels natural.
            </p>

            <p className="annotation leave-note">
              photo, writing, voice —
              <br />
              one or all three ↗
            </p>
          </div>

          <div className="format-picker">

            <button
              type="button"
              className={`format-card ${
                formats.photo ? "format-selected" : ""
              }`}
              onClick={() => toggleFormat("photo")}
            >
              <span className="format-symbol">▧</span>

              <div>
                <strong>Photo</strong>
                <p>Show a moment from your world.</p>
              </div>

              <span className="format-check">
                {formats.photo ? "✓" : "+"}
              </span>
            </button>

            <button
              type="button"
              className={`format-card ${
                formats.writing ? "format-selected" : ""
              }`}
              onClick={() => toggleFormat("writing")}
            >
              <span className="format-symbol">Aa</span>

              <div>
                <strong>Writing</strong>
                <p>Leave a story, thought, recipe or discovery.</p>
              </div>

              <span className="format-check">
                {formats.writing ? "✓" : "+"}
              </span>
            </button>

            <button
              type="button"
              className={`format-card ${
                formats.voice ? "format-selected" : ""
              }`}
              onClick={() => toggleFormat("voice")}
            >
              <span className="format-symbol">◉</span>

              <div>
                <strong>Voice</strong>
                <p>Speak instead of typing, or add both.</p>
              </div>

              <span className="format-check">
                {formats.voice ? "✓" : "+"}
              </span>
            </button>

            <button
              type="button"
              className="button leave-continue"
              onClick={handleContinue}
              disabled={
                !formats.photo &&
                !formats.writing &&
                !formats.voice
              }
            >
              Start my page →
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}

export default LeavePage;
