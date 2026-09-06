import { supabase } from "../lib/supabase";

export function translatePage({
  title,
  body,
  sourceLanguage,
  targetLanguage,
}) {
  return supabase.functions
    .invoke("translate-page", {
      body: {
        title,
        body,
        sourceLanguage,
        targetLanguage,
      },
    })
    .then(({ data, error }) => {
      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return data.translation;
    });
}
