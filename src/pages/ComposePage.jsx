import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import journals from "../data/journals";
import themes from "../data/themes";

function ComposePage() {
  const { journalId } = useParams();
  const locationState = useLocation();
  const navigate = useNavigate();

  const journal = journals.find((item) => item.id === journalId);

  const formats = locationState.state?.formats || {
    photo: true,
    writing: true,
    voice: false,
  };

  const [form, setForm] = useState({
    title: "",
    story: "",
    city: "",
    country: "",
    contributor: "",
    language: "English",
  });

  const [photoName, setPhotoName] = useState("");
  const [audioName, setAudioName] = useState("");

  if (!journal) {
    return null;
  }

  const theme = themes[journal.theme];
  const [color1, color2, color3] = theme.colors;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    if (file) {
      setPhotoName(file.name);
    }
  }

  function handleAudio(event) {
    const file = event.target.files?.[0];

    if (file) {
      setAudioName(file.name);
    }
  }

  function handleSave(event) {
    event.preventDefault();

    const contribution = {
      id: `local-${Date.now()}`,
      journalId: journal.id,
      title: form.title || "An untitled page",
      story: form.story,
      city: form.city || "Somewhere",
      country: form.country || "",
      contributor: form.contributor || "Someone",
      language: form.language,
      formats,
      photoName,
      audioName,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("wanderjournal-pages") || "[]"
    );

    localStorage.setItem(
      "wanderjournal-pages",
      JSON.stringify([...existing, contribution])
    );

    localStorage.setItem(
      "wanderjournal-last-page",
      JSON.stringify(contribution)
    );

    navigate(`/journal/${journal.id}/pass`);
  }

  return (
    <div
      className="compose-page"
      style={{
        "--theme-1": color1,
        "--theme-2": color2,
        "--theme-3": color3,
      }}
    >
      <div className="page-inner">

        <header className="journal-topbar">
          <Link
            to={`/journal/${journal.id}/leave`}
            className="journal-back"
          >
            ← Back
          </Link>

          <p className="eyebrow">Your page</p>

          <span />
        </header>

        <section className="composer-layout">

          <form
            className="composer-controls"
            onSubmit={handleSave}
          >
            <div className="composer-heading">
              <p className="eyebrow">
                {journal.title}
              </p>

              <h2>Make it yours.</h2>

              <p>
                The layout stays simple. What you leave behind gives
                the page its character.
              </p>
            </div>

            <label className="composer-field">
              <span>Your name or nickname</span>
              <input
                name="contributor"
                value={form.contributor}
                onChange={handleChange}
                placeholder="Someone"
              />
            </label>

            <div className="composer-field-row">
              <label className="composer-field">
                <span>From</span>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </label>

              <label className="composer-field">
                <span>Country</span>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </label>
            </div>

            <label className="composer-field">
              <span>Language</span>

              <select
                name="language"
                value={form.language}
                onChange={handleChange}
              >
                <option>English</option>
                <option>Swahili</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Portuguese</option>
                <option>Japanese</option>
                <option>Korean</option>
                <option>Vietnamese</option>
              </select>
            </label>

            <label className="composer-field">
              <span>Page title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="What are you leaving here?"
              />
            </label>

            {formats.writing && (
              <label className="composer-field">
                <span>Your story</span>

                <textarea
                  name="story"
                  value={form.story}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Tell us something from your world..."
                />
              </label>
            )}

            {formats.photo && (
              <label className="upload-field">
                <span className="eyebrow">Photo</span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />

                <strong>
                  {photoName || "Choose a photograph"}
                </strong>
              </label>
            )}

            {formats.voice && (
              <label className="upload-field">
                <span className="eyebrow">Voice</span>

                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudio}
                />

                <strong>
                  {audioName || "Choose or record audio"}
                </strong>

                <small>
                  Google AI can later transcribe and translate this.
                </small>
              </label>
            )}

            <button type="submit" className="button">
              Leave it here →
            </button>
          </form>

          <aside className="page-preview">

            <div className="preview-color preview-color-one" />
            <div className="preview-color preview-color-two" />

            <div className="preview-paper">
              <p className="eyebrow">
                {form.city || "Your city"}
              </p>

              <h3>
                {form.title || "Your page title"}
              </h3>

              {formats.photo && (
                <div className="preview-photo">
                  {photoName || "your photograph"}
                </div>
              )}

              {formats.writing && (
                <p className="preview-story">
                  {form.story ||
                    "Your words will begin to shape this page."}
                </p>
              )}

              {formats.voice && (
                <div className="preview-voice">
                  ◉ {audioName || "voice note"}
                </div>
              )}

              <p className="annotation preview-note">
                left by {form.contributor || "someone"} ↗
              </p>
            </div>

          </aside>

        </section>

      </div>
    </div>
  );
}

export default ComposePage;
