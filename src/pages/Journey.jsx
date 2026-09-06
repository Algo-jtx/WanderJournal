import { Link, useParams } from "react-router-dom";
import journals from "../data/journals";
import pages from "../data/pages";
import themes from "../data/themes";

function Journey() {
  const { journalId } = useParams();

  const journal = journals.find((item) => item.id === journalId);

  if (!journal) {
    return null;
  }

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  const seededStops = pages
    .filter((page) => page.journalId === journal.id)
    .map((page) => ({
      city: page.city,
      country: page.country,
      contributor: page.contributor,
      page: page.pageNumber,
    }));

  const uniqueStops = seededStops.filter(
    (stop, index, array) =>
      index ===
      array.findIndex(
        (item) =>
          item.city === stop.city &&
          item.country === stop.country
      )
  );

  const localPages = JSON.parse(
    localStorage.getItem("wanderjournal-pages") || "[]"
  ).filter((page) => page.journalId === journal.id);

  const localStops = localPages.map((page, index) => ({
    city: page.city,
    country: page.country,
    contributor: page.contributor,
    page: seededStops.length + index + 1,
  }));

  const stops = [...uniqueStops, ...localStops];

  return (
    <div
      className="journey-page"
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

          <p className="eyebrow">The journey</p>

          <Link
            to={`/journal/${journal.id}/leave`}
            className="journal-topbar-link"
          >
            Leave a page →
          </Link>
        </header>

        <section className="journey-hero">

          <div>
            <p className="eyebrow">{journal.title}</p>

            <h1>
              WHERE IT
              <br />
              HAS BEEN.
            </h1>

            <p>
              The journal remembers every place that added something
              to it.
            </p>
          </div>

          <div className="journey-hero-note">
            <p className="annotation">
              one journal
              <br />
              many hands ↗
            </p>
          </div>

        </section>

        <section className="full-journey">

          {stops.map((stop, index) => (
            <div className="journey-item" key={`${stop.city}-${index}`}>

              <div className="journey-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="journey-item-card">
                <div className="journey-photo-placeholder">
                  {stop.city}
                </div>

                <div>
                  <h3>{stop.city}</h3>

                  <p className="eyebrow">
                    {stop.country}
                  </p>

                  <p>
                    Page left by {stop.contributor}
                  </p>
                </div>
              </div>

              {index < stops.length - 1 && (
                <div className="journey-connector">
                  <span />
                  <span>↓</span>
                </div>
              )}

            </div>
          ))}

          <div className="journey-future-card">
            <div className="journey-index">?</div>

            <div>
              <p className="eyebrow">Next stop</p>
              <h3>Somewhere new.</h3>
              <p className="annotation">
                pass it on ↗
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Journey;
