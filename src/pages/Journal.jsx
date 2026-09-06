import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import journals from "../data/journals";
import pages from "../data/pages";
import themes from "../data/themes";
import { getJournalBySlug } from "../services/journalService";
import { getCloudPagesForJournal } from "../services/pageService";

function Journal() {
  const { journalId } = useParams();

  const [cloudPages, setCloudPages] = useState([]);

  useEffect(() => {
    getJournalBySlug(journalId)
      .then(({ data, error }) => {
        if (error || !data) {
          return null;
        }

        return getCloudPagesForJournal(data.id);
      })
      .then((result) => {
        if (!result || result.error) {
          return;
        }

        setCloudPages(result.data || []);
      })
      .catch((error) => {
        console.error("Cloud page loading failed:", error);
      });
  }, [journalId]);

  const journal = journals.find((item) => item.id === journalId);

  if (!journal) {
    return (
      <div className="page">
        <div className="page-inner not-found">
          <p className="eyebrow">WanderJournal</p>
          <h2>This journal wandered off.</h2>
          <Link to="/" className="button">
            Back to discover
          </Link>
        </div>
      </div>
    );
  }

  const journalPages = pages
    .filter((page) => page.journalId === journal.id)
    .sort((a, b) => a.pageNumber - b.pageNumber);

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  const firstPage = journalPages[0];

  const allPages = [
    ...journalPages,
    ...cloudPages.map((page) => ({
      id: page.id,
      journalId: journal.id,
      pageNumber:
        page.page_number ||
        journalPages.length + 1,
      city: page.city,
      country: page.country,
      contributor: page.author_name,
      title: page.title,
      text: page.body,
      image: page.image_url,
      voice: page.audio_url,
      originalLanguage: page.original_language,
      cloud: true,
    })),
  ];

  return (
    <div
      className="journal-page"
      style={{
        "--theme-1": color1,
        "--theme-2": color2,
        "--theme-3": color3,
      }}
    >
      <div className="page-inner">

        <header className="journal-topbar">
          <Link to="/" className="journal-back">
            ← Discover
          </Link>

          <p className="eyebrow">{theme.name} journal</p>

          <Link
            to={`/journey/${journal.id}`}
            className="journal-topbar-link"
          >
            See journey →
          </Link>
        </header>

        <section className="journal-cover">

          <div className="journal-cover-copy">
            <p className="eyebrow">
              Passed from place to place
            </p>

            <h1 className="journal-cover-title">
              {journal.title}
            </h1>

            <p className="journal-cover-description">
              {journal.description}
            </p>

            <div className="journal-cover-meta">
              <div>
                <span className="meta-label">Started in</span>
                <strong>
                  {journal.location.city}, {journal.location.country}
                </strong>
              </div>

              <div>
                <span className="meta-label">Pages</span>
                <strong>{allPages.length}</strong>
              </div>

              <div>
                <span className="meta-label">Theme</span>
                <strong>{theme.name}</strong>
              </div>
            </div>

            <div className="journal-cover-actions">
              {firstPage ? (
                <Link
                  to={`/journal/${journal.id}/page/${firstPage.id}`}
                  className="button"
                >
                  Open journal →
                </Link>
              ) : (
                <span className="button journal-disabled">
                  No pages yet
                </span>
              )}

              <Link
                to={`/journal/${journal.id}/leave`}
                className="button button-outline"
              >
                Leave a page
              </Link>
            </div>
          </div>

          <div className="journal-cover-art">

            <div className="journal-cover-color journal-cover-color-one" />
            <div className="journal-cover-color journal-cover-color-two" />

            <div className="journal-cover-photo">
              {journal.coverImage ? (
                <img
                  src={journal.coverImage}
                  alt={`${journal.title} cover`}
                  className="journal-cover-image"
                />
              ) : (
                <div className="journal-cover-placeholder">
                  <span>{journal.location.city}</span>
                  <small>cover photograph</small>
                </div>
              )}
            </div>

            <div className="journal-cover-note">
              <p className="annotation">
                open me
                <br />
                somewhere else
                <br />
                will come next ↗
              </p>
            </div>

            <div className="journal-cover-stamp">
              <span>WJ</span>
              <small>PASS IT ON</small>
            </div>
          </div>

        </section>

        <section className="journal-route-preview">
          <div>
            <p className="eyebrow">So far</p>
            <h2>The journey.</h2>
          </div>

          <div className="journal-route-track">
            {journal.journey.map((stop, index) => (
              <div className="journal-route-piece" key={`${stop.city}-${index}`}>
                <div className="journal-route-stop">
                  <span className="journal-route-dot" />
                  <strong>{stop.city}</strong>
                  <small>{stop.country}</small>
                </div>

                <div className="journal-route-arrow" />
              </div>
            ))}

            <div className="journal-route-stop journal-route-future">
              <span className="journal-route-dot" />
              <strong>?</strong>
              <small>where next?</small>
            </div>
          </div>
        </section>

        <section className="journal-contents">
          <div className="journal-contents-heading">
            <p className="eyebrow">Inside this journal</p>
            <h2>Pages left behind.</h2>
          </div>

          <div className="journal-page-list">
            {allPages.map((page) => (
              <Link
                key={page.id}
                to={`/journal/${journal.id}/page/${page.id}`}
                className="journal-page-row"
              >
                <span className="journal-page-number">
                  {String(page.pageNumber).padStart(2, "0")}
                </span>

                <span className="journal-page-row-title">
                  {page.title}
                </span>

                <span className="journal-page-row-location">
                  {page.city}, {page.country}
                </span>

                <span className="journal-page-row-type">
                  {page.type}
                </span>

                <span className="journal-page-row-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>

          <p className="annotation journal-contents-note">
            every page belongs to someone different
          </p>
        </section>

      </div>
    </div>
  );
}

export default Journal;
