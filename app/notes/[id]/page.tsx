import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: "Нотатку не знайдено – NoteHub",
      description: "Ця нотатка була видалена або не існує.",
      openGraph: {
        title: "Нотатку не знайдено – NoteHub",
        description: "Ця нотатка була видалена або не існує.",
        url: `https://notehub.com/notes/${params.id}`,
      },
    };
  }

  return {
    title: `${note.title} – NoteHub`,
    description: note.content.slice(0, 150),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 150),
      type: "article",
      url: `https://notehub.com/notes/${note.id}`,
    },
  };
}

export default async function NoteDetails({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={params.id} />
    </HydrationBoundary>
  );
}
