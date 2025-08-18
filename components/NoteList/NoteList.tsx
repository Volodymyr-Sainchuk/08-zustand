import css from "./NoteList.module.css";
import { Note } from "../../types/note";
import { useDeleteNote } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";

export interface NoteListProps {
  notes: Note[];
  currentTag: string;
}

export default function NoteList({ notes }: NoteListProps) {
  const deleteMutation = useDeleteNote();
  const queryClient = useQueryClient();

  const handleDelete = (note: Note) => {
    if (window.confirm(`Видалити нотатку "${note.title}"?`)) {
      deleteMutation.mutate(String(note.id), {
        onSuccess: () => {
          toast.success("Нотатку видалено.");
          queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: () => {
          toast.error("Не вдалося видалити нотатку.");
        },
      });
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`} scroll={false}>
              View details
            </Link>
            <button onClick={() => handleDelete(note)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
