"use client";

import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  return <NoteDetailsClient id={id} />;
}
