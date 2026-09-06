import { useState } from "react";

const languages = [
  "English",
  "Swahili",
  "French",
  "Spanish",
  "Portuguese",
  "Japanese",
  "Korean",
  "Vietnamese",
];

function TranslationBar({ page }) {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [message, setMessage] = useState("");

  function handleLanguageChange(event) {
    setTargetLanguage(event.target.value);
  }

  function handleTranslate() {
    setMessage(
      `Google AI will translate this page into ${targetLanguage}.`
    );
  }

  function handleTranscript() {
    if (!page.voice) {
      setMessage("This page does not contain a voice note.");
      return;
    }

    setMessage("Google AI will transcribe the original voice note.");
  }

  function handleTranslatedVoice() {
    setMessage(
      `ElevenLabs will optionally speak the ${targetLanguage} translation.`
    );
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
          read it your way ↗
        </p>
      </div>

      <div className="language-controls">
        <label className="language-select-wrap">
          <span>Translate to</span>

          <select
            value={targetLanguage}
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="language-button"
          onClick={handleTranslate}
        >
          Translate page
        </button>

        {page.voice && (
          <button
            type="button"
            className="language-button"
            onClick={handleTranscript}
          >
            Transcribe voice
          </button>
        )}

        <button
          type="button"
          className="language-button"
          onClick={handleTranslatedVoice}
        >
          Hear translation
        </button>
      </div>

      {message && (
        <p className="language-status">
          {message}
        </p>
      )}
    </section>
  );
}

export default TranslationBar;
