import { supabase } from "../lib/supabase";

export function uploadJournalImage(file, userId) {
  const extension = file.name.split(".").pop();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();

  const filePath =
    `${userId}/${Date.now()}-${safeName}.${extension}`;

  return supabase.storage
    .from("journal-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })
    .then(({ data, error }) => {
      if (error) {
        return {
          data: null,
          error,
        };
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("journal-images")
        .getPublicUrl(data.path);

      return {
        data: {
          path: data.path,
          publicUrl: publicUrlData.publicUrl,
        },
        error: null,
      };
    });
}
