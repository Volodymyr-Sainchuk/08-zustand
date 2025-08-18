import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/notes/action/CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note – NoteHub",
  description: "Сторінка для створення нової нотатки у NoteHub",
  openGraph: {
    title: "Create Note – NoteHub",
    description: "Створіть нову нотатку у NoteHub швидко та зручно",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
