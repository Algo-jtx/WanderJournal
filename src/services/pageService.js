import { supabase } from "../lib/supabase";

export function getCloudPagesForJournal(journalId) {
  return supabase
    .from("pages")
    .select("*")
    .eq("journal_id", journalId)
    .order("created_at", { ascending: true });
}

export function getCloudPage(pageId) {
  return supabase
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .single();
}

export function addCloudPage({
  journalId,
  userId,
  authorName,
  title,
  body,
  originalLanguage,
  city,
  country,
  pageNumber,
  imageUrl,
}) {
  return supabase
    .from("pages")
    .insert({
      journal_id: journalId,
      author_id: userId,
      author_name: authorName || "Anonymous traveler",
      title: title || "An untitled page",
      body: body || null,
      original_language: originalLanguage || "English",
      city: city || "Somewhere",
      country: country || "",
      page_number: pageNumber,
      image_url: imageUrl || null,
    })
    .select()
    .single();
}

export function addJourneyStop({
  journalId,
  pageId,
  userId,
  city,
  country,
}) {
  return supabase
    .from("journey_stops")
    .insert({
      journal_id: journalId,
      page_id: pageId,
      contributor_id: userId,
      city: city || "Somewhere",
      country: country || "",
    })
    .select()
    .single();
}
