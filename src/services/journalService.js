import { supabase } from "../lib/supabase";

export function getJournalBySlug(slug) {
  return supabase
    .from("journals")
    .select("*")
    .eq("slug", slug)
    .single();
}

export function getAllCloudJournals() {
  return supabase
    .from("journals")
    .select("*")
    .order("created_at", { ascending: true });
}
