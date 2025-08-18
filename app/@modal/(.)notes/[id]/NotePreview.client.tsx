"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
    <Modal onClose={handleClose}>
      <button
        onClick={handleClose}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "1.2rem",
          color: "#888",
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        ✕
      </button>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні нотатки</p>}
      {note && (
        <div style={{ paddingTop: "30px" }}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>
            <strong>Тег:</strong> {note.tag}
          </p>
          <p>
            <strong>Створено:</strong> {new Date(note.createdAt).toLocaleString("uk-UA")}
          </p>
        </div>
      )}
    </Modal>
  );
}
