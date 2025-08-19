import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

function asPromise<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await asPromise(params);
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Нотатку не знайдено – NoteHub",
      description: "Ця нотатка була видалена або не існує.",
      openGraph: {
        title: "Нотатку не знайдено – NoteHub",
        description: "Ця нотатка була видалена або не існує.",
        url: `https://notehub.com/notes/${id}`,
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

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await asPromise(params);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
