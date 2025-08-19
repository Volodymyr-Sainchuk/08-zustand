"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { useNoteStore, DraftNote } from "@/lib/store/noteStore";
import { NewNote, useCreateNote } from "@/lib/api";
import toast from "react-hot-toast";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const createMutation = useCreateNote();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: NewNote = { ...draft };

    createMutation.mutate(newNote, {
      onSuccess: () => {
        toast.success("Нотатку створено.");
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        router.back();
      },
      onError: () => {
        toast.error("Не вдалося створити нотатку.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          className={css.textarea}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value as DraftNote["tag"] })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
