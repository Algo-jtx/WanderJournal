import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import journals from "../data/journals";
import themes from "../data/themes";

function PassJournal() {
  const { journalId } = useParams();

  const journal = journals.find((item) => item.id === journalId);

  const [copied, setCopied] = useState(false);

  if (!journal) {
    return null;
  }

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  const shareLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/journal/${journal.id}`
      : `/journal/${journal.id}`;

  function handleCopy() {
    if (!navigator.clipboard) {
      setCopied(true);
      return;
    }

    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
    });
  }

  return (
    <div
      className="pass-page"
      style={{
        "--theme-1": color1,
        "--theme-2": color2,
        "--theme-3": color3,
      }}
    >
      <div className="page-inner">

        <section className="pass-layout">

          <div className="pass-message">
            <p className="eyebrow">{journal.title}</p>

            <h1>
              YOUR PAGE
              <br />
              IS IN.
            </h1>

            <p>
              What you left behind is now part of the journey.
            </p>

            <p className="annotation">
              now let it wander ↗
            </p>
          </div>

          <div className="pass-card">
            <div className="pass-color-block" />

            <p className="eyebrow">Pass the journal</p>

            <h3>
              Where should it
              <br />
              go next?
            </h3>

            <div className="share-link-box">
              <span>{shareLink}</span>

              <button type="button" onClick={handleCopy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div className="pass-actions">
              <Link
                to={`/journey/${journal.id}`}
                className="button"
              >
                See the journey →
              </Link>

              <Link
                to={`/journal/${journal.id}`}
                className="button button-outline"
              >
                Back to journal
              </Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default PassJournal;
