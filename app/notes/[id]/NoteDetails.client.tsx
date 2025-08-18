"use client";

import css from "@/app/notes/[id]/NoteDetails.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsClientProps {
  id?: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const params = useParams();
  const noteId = id ?? (params?.id as string);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
    enabled: Boolean(noteId),
  });

  if (!noteId) return <p>No note ID provided.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>Note title - {note?.title}</h2>
        </div>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
}
