"use server";

import { NewNote } from "@/lib/api";

export async function createNote(newNote: NewNote) {
  console.log("Creating note:", newNote);
}
