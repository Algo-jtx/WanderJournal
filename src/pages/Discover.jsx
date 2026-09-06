import { Link } from "react-router-dom";
import journals from "../data/journals";
import themes from "../data/themes";

function Discover() {
  return (
    <div className="discover-page">
      <div className="page-inner">

        <header className="wj-nav">
          <Link to="/" className="wj-wordmark">
            WanderJournal
          </Link>

          <nav className="wj-nav-links">
            <Link to="/">Discover</Link>
            <a href="#journals">Journals</a>
            <a href="#journey">Journey</a>
          </nav>

          <Link
            to={`/journal/${journals[0].id}/leave`}
            className="wj-nav-action"
          >
            Leave a page
          </Link>
        </header>

        <section className="discover-hero">
          <div className="discover-hero-main">
            <p className="eyebrow">WanderJournal</p>

            <h1 className="discover-title">
              WANDER
              <br />
              JOURNAL
            </h1>

            <p className="discover-intro">
              Someone, somewhere,
              <br />
              left you a page.
            </p>
          </div>

          <aside className="discover-hero-art">
            <p className="annotation hero-hand-note">
              a journal that
              <br />
              keeps moving
              <span> ↗</span>
            </p>

            <div className="passport-stamp">
              <span className="passport-globe">◎</span>
              <span>PASS IT ON</span>
            </div>

            <div className="hero-paper-note">
              <p className="annotation">
                Different people.
                <br />
                Same world.
              </p>
            </div>
          </aside>
        </section>

        <div className="journey-line discover-divider" />

        <section id="journals" className="discover-heading">
          <p className="eyebrow">Discover by theme</p>

          <h2>
            Pick a journal and
            <br />
            follow where it has been.
          </h2>
        </section>

        <section className="journal-gallery">
          {journals.map((journal, index) => {
            const theme = themes[journal.theme];
            const [color1, color2, color3] = theme.colors;

            return (
              <article
                key={journal.id}
                className={`journal-card journal-card-${index + 1}`}
                style={{
                  "--theme-1": color1,
                  "--theme-2": color2,
                  "--theme-3": color3,
                }}
              >
                <div className="journal-card-color" />

                <div className="journal-photo-wrap">
                  <div className="journal-photo-placeholder">
                    <span className="journal-photo-place">
                      {journal.location.city}
                    </span>

                    <span className="journal-photo-hint">
                      cover photograph
                    </span>
                  </div>
                </div>

                <div className="journal-card-content">
                  <p className="eyebrow journal-theme">
                    {theme.name}
                  </p>

                  <h3>{journal.title}</h3>

                  <p className="journal-card-description">
                    {journal.description}
                  </p>

                  <div className="journal-card-meta">
                    <span>
                      {journal.location.city}, {journal.location.country}
                    </span>

                    <span>{journal.pages} pages</span>
                  </div>
                </div>

                <div className="journal-sticky-note">
                  <p className="annotation">
                    {index % 3 === 0
                      ? "someone left this here"
                      : index % 3 === 1
                      ? "where does it go next?"
                      : "open me ↗"}
                  </p>
                </div>

                <Link
                  to={`/journal/${journal.id}`}
                  className="journal-card-link"
                  aria-label={`Open ${journal.title}`}
                />
              </article>
            );
          })}
        </section>

        <section id="journey" className="discover-journey">
          <div className="discover-journey-copy">
            <p className="eyebrow">The journal travels</p>

            <h2>
              Every page
              <br />
              leaves a trace.
            </h2>

            <p>
              A journal can begin in one city and slowly collect pages
              from people all over the world.
            </p>
          </div>

          <div className="journey-route">
            <div className="journey-stop">
              <span className="journey-dot" />
              <strong>Tokyo</strong>
              <small>Japan</small>
            </div>

            <div className="journey-segment" />

            <div className="journey-stop">
              <span className="journey-dot" />
              <strong>Seoul</strong>
              <small>South Korea</small>
            </div>

            <div className="journey-segment" />

            <div className="journey-stop">
              <span className="journey-dot" />
              <strong>Nairobi</strong>
              <small>Kenya</small>
            </div>

            <div className="journey-segment" />

            <div className="journey-stop">
              <span className="journey-dot" />
              <strong>Lisbon</strong>
              <small>Portugal</small>
            </div>
          </div>

          <div className="journey-postcard">
            <p className="annotation">
              more places
              <br />
              to come...
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Discover;
