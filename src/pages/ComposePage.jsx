import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import journals from "../data/journals";
import themes from "../data/themes";

import { useAuth } from "../context/AuthContext";

import {
  addCloudPage,
  addJourneyStop,
  getCloudPagesForJournal,
} from "../services/pageService";

import { getJournalBySlug } from "../services/journalService";
import { uploadJournalImage } from "../services/storageService";

function ComposePage() {
  const { journalId } = useParams();
  const locationState = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const journal = journals.find(
    (item) => item.id === journalId
  );

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
  const [photoFile, setPhotoFile] = useState(null);
  const [audioName, setAudioName] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

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
      setPhotoFile(file);
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

    setSaving(true);
    setSaveError("");

    let cloudJournal;

    getJournalBySlug(journal.id)
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }

        cloudJournal = data;

        return getCloudPagesForJournal(cloudJournal.id);
      })
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }

        const existingCloudPages = data || [];

        const pageNumber =
          journal.pages + existingCloudPages.length + 1;

        if (formats.photo && photoFile) {
          return uploadJournalImage(photoFile, user.id)
            .then(({ data: uploadData, error: uploadError }) => {
              if (uploadError) {
                throw uploadError;
              }

              return addCloudPage({
                journalId: cloudJournal.id,
                userId: user.id,

                authorName:
                  form.contributor ||
                  user.email?.split("@")[0] ||
                  "Anonymous traveler",

                title: form.title,
                body: formats.writing ? form.story : null,

                originalLanguage: form.language,

                city: form.city,
                country: form.country,

                pageNumber,
                imageUrl: uploadData.publicUrl,
              });
            });
        }

        return addCloudPage({
          journalId: cloudJournal.id,
          userId: user.id,

          authorName:
            form.contributor ||
            user.email?.split("@")[0] ||
            "Anonymous traveler",

          title: form.title,
          body: formats.writing ? form.story : null,

          originalLanguage: form.language,

          city: form.city,
          country: form.country,

          pageNumber,
          imageUrl: null,
        });
      })
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }

        const createdPage = data;

        return addJourneyStop({
          journalId: cloudJournal.id,
          pageId: createdPage.id,
          userId: user.id,
          city: createdPage.city,
          country: createdPage.country,
        }).then(({ error: journeyError }) => {
          if (journeyError) {
            throw journeyError;
          }

          return createdPage;
        });
      })
      .then((createdPage) => {
        sessionStorage.setItem(
          "wanderjournal-last-page",
          JSON.stringify(createdPage)
        );

        navigate(`/journal/${journal.id}/pass`);
      })
      .catch((error) => {
        console.error(error);

        setSaveError(
          error.message ||
          "Something went wrong while leaving your page."
        );

        setSaving(false);
      });
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
                The layout stays simple. What you leave behind
                gives the page its character.
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
                  required
                />
              </label>

              <label className="composer-field">
                <span>Country</span>

                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
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
                required
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
                <span className="eyebrow">
                  Photo
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                />

                <strong>
                  {photoName || "Choose a photograph"}
                </strong>

                <small>
                  Cloud image uploads are the next step.
                </small>
              </label>
            )}

            {formats.voice && (
              <label className="upload-field">
                <span className="eyebrow">
                  Voice
                </span>

                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudio}
                />

                <strong>
                  {audioName || "Choose or record audio"}
                </strong>

                <small>
                  Voice storage and transcription come after images.
                </small>
              </label>
            )}

            {saveError && (
              <p className="auth-status">
                {saveError}
              </p>
            )}

            <button
              type="submit"
              className="button"
              disabled={saving}
            >
              {saving
                ? "Leaving your page..."
                : "Leave it here →"}
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
