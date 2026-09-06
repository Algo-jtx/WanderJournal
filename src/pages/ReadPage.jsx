import { Link, useParams } from "react-router-dom";
import journals from "../data/journals";
import pages from "../data/pages";
import themes from "../data/themes";
import TranslationBar from "../components/shared/TranslationBar";

function ReadPage() {
  const { journalId, pageId } = useParams();

  const journal = journals.find((item) => item.id === journalId);

  const journalPages = pages
    .filter((item) => item.journalId === journalId)
    .sort((a, b) => a.pageNumber - b.pageNumber);

  const pageIndex = journalPages.findIndex(
    (item) => item.id === pageId
  );

  const page = journalPages[pageIndex];

  if (!journal || !page) {
    return (
      <div className="page">
        <div className="page-inner not-found">
          <p className="eyebrow">WanderJournal</p>
          <h2>We couldn't find this page.</h2>
          <Link to="/" className="button">
            Back to discover
          </Link>
        </div>
      </div>
    );
  }

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  const previousPage =
    pageIndex > 0 ? journalPages[pageIndex - 1] : null;

  const nextPage =
    pageIndex < journalPages.length - 1
      ? journalPages[pageIndex + 1]
      : null;

  return (
    <div
      className="read-page"
      style={{
        "--theme-1": color1,
        "--theme-2": color2,
        "--theme-3": color3,
      }}
    >
      <div className="page-inner">

        <header className="read-topbar">
          <Link
            to={`/journal/${journal.id}`}
            className="journal-back"
          >
            ← {journal.title}
          </Link>

          <p className="eyebrow">
            Page {String(page.pageNumber).padStart(2, "0")}
          </p>

          <Link
            to={`/journey/${journal.id}`}
            className="journal-topbar-link"
          >
            Journey →
          </Link>
        </header>

        <article className="journal-entry-clean">

          <div className="entry-heading-clean">
            <p className="eyebrow">
              From {page.city}, {page.country}
            </p>

            <h1>{page.title}</h1>

            <p className="entry-contributor">
              A page left by {page.contributor}
            </p>
          </div>

          <div className="entry-layout">

            <section className="entry-story-column">
              <span className="entry-page-number">
                {String(page.pageNumber).padStart(2, "0")}
              </span>

              <p className="entry-story">
                {page.text}
              </p>

              {page.music && (
                <div className="music-note-card">
                  <p className="eyebrow">On this page</p>

                  <strong>{page.music.song}</strong>
                  <span>{page.music.artist}</span>
                  <small>{page.music.kind}</small>
                </div>
              )}

              {page.voice && (
                <div className="original-voice-card">
                  <p className="eyebrow">Original voice note</p>

                  <audio controls src={page.voice}>
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}

              <div className="entry-location-label">
                <span>FROM</span>
                <strong>
                  {page.city}, {page.country}
                </strong>
              </div>

              <div className="entry-hand-note">
                <p className="annotation">
                  {page.annotation}
                </p>
              </div>
            </section>

            <section className="entry-media-clean">
              {page.image ? (
                <div className="entry-photo-clean">
                  <div className="entry-photo-placeholder">
                    <span>{page.city}</span>
                    <small>page photograph</small>
                  </div>
                </div>
              ) : (
                <div className="entry-text-poster">
                  <p className="annotation">
                    this page was left
                    <br />
                    without a photograph
                  </p>
                </div>
              )}

              <div className="entry-media-color" />
            </section>

          </div>

          <TranslationBar page={page} />

        </article>

        <nav className="page-turner">
          <div className="page-turner-side">
            {previousPage ? (
              <Link
                to={`/journal/${journal.id}/page/${previousPage.id}`}
                className="page-turn-link"
              >
                <span>← Previous</span>
                <strong>{previousPage.title}</strong>
              </Link>
            ) : (
              <Link
                to={`/journal/${journal.id}`}
                className="page-turn-link"
              >
                <span>← Cover</span>
                <strong>{journal.title}</strong>
              </Link>
            )}
          </div>

          <div className="page-progress">
            {pageIndex + 1} / {journalPages.length}
          </div>

          <div className="page-turner-side page-turner-right">
            {nextPage ? (
              <Link
                to={`/journal/${journal.id}/page/${nextPage.id}`}
                className="page-turn-link"
              >
                <span>Next →</span>
                <strong>{nextPage.title}</strong>
              </Link>
            ) : (
              <Link
                to={`/journal/${journal.id}/leave`}
                className="page-turn-link"
              >
                <span>Your turn →</span>
                <strong>Leave a page</strong>
              </Link>
            )}
          </div>
        </nav>

      </div>
    </div>
  );
}

export default ReadPage;
