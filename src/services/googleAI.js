const GOOGLE_AI_ENDPOINT = "/api/google-ai";

export function translatePageContent(payload) {
  return fetch(`${GOOGLE_AI_ENDPOINT}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

export function transcribePageVoice(formData) {
  return fetch(`${GOOGLE_AI_ENDPOINT}/transcribe`, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
}
