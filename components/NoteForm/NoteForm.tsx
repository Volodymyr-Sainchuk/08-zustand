"use client";

import { useState, useEffect } from "react";
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

  // Локальний стейт для контролю форми
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState<DraftNote["tag"]>(draft.tag);

  // Зберігаємо draft у стор при кожній зміні полів
  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  // Обробка сабміту
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: NewNote = { title, content, tag };

    createMutation.mutate(newNote, {
      onSuccess: () => {
        toast.success("Нотатку створено.");
        clearDraft(); // очищаємо draft
        queryClient.invalidateQueries({ queryKey: ["notes"] }); // оновлюємо список нотаток
        router.back(); // повертаємо на попередній маршрут
      },
      onError: () => {
        toast.error("Не вдалося створити нотатку.");
      },
    });
  };

  // Обробка Cancel
  const handleCancel = () => {
    router.back(); // draft не очищаємо
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={css.textarea}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as DraftNote["tag"])}
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
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
