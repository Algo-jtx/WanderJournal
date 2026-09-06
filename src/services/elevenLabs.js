const ELEVENLABS_ENDPOINT = "/api/elevenlabs";

export function createTranslatedSpeech(payload) {
  return fetch(`${ELEVENLABS_ENDPOINT}/speak`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}
