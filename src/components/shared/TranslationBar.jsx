import { useState } from "react";
import { translatePage } from "../../services/googleAI";

const languages = [
  "English",
  "Swahili",
  "French",
  "Spanish",
  "Portuguese",
  "Japanese",
  "Korean",
  "Vietnamese",
  "Arabic",
  "Hindi",
];

function TranslationBar({ page }) {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLanguageChange(event) {
    setTargetLanguage(event.target.value);
    setError("");
  }

  function handleTranslate() {
    setLoading(true);
    setError("");
    setTranslation(null);

    translatePage({
      title: page.title || "",
      body: page.text || "",
      sourceLanguage: page.originalLanguage || "",
      targetLanguage,
    })
      .then((result) => {
        setTranslation(result);
      })
      .catch((err) => {
        console.error("Translation failed:", err);

        setError(
          err.message ||
            "This page could not cross the language barrier right now."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleShowOriginal() {
    setTranslation(null);
    setError("");
  }

  return (
    <section className="language-tools">
      <div className="language-tools-heading">
        <div>
          <p className="eyebrow">Understand this page</p>

          <p className="language-tools-description">
            Stories should be able to travel further than language.
          </p>
        </div>

        <p className="annotation">
          language shouldn't
          <br />
          be the border ↗
        </p>
      </div>

      <div className="language-controls">
        <label className="language-select-wrap">
          <span>Read in</span>

          <select
            value={targetLanguage}
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <option
                value={language}
                key={language}
              >
                {language}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="language-button"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading
            ? "Crossing languages..."
            : "Translate with Google AI"}
        </button>

        {translation && (
          <button
            type="button"
            className="language-button"
            onClick={handleShowOriginal}
          >
            Show original
          </button>
        )}
      </div>

      {error && (
        <p className="language-error">
          {error}
        </p>
      )}

      {translation && (
        <div className="translation-result">
          <div className="translation-meta">
            <span>
              {translation.sourceLanguage || "Original"}
            </span>

            <span className="translation-route">
              · · · · · →
            </span>

            <span>
              {translation.targetLanguage || targetLanguage}
            </span>
          </div>

          <p className="eyebrow">
            Google AI translation
          </p>

          <h3>
            {translation.translatedTitle}
          </h3>

          <p className="translated-story">
            {translation.translatedBody}
          </p>

          {translation.contextNote && (
            <aside className="translation-context">
              <p className="eyebrow">
                A little context
              </p>

              <p>
                {translation.contextNote}
              </p>
            </aside>
          )}

          <p className="translation-original-note">
            The contributor's original page remains unchanged.
          </p>
        </div>
      )}
    </section>
  );
}

export default TranslationBar;
