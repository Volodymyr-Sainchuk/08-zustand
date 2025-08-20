import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

function wrapParams<T>(params: T): Promise<T> {
  return Promise.resolve(params);
}

export async function generateMetadata(raw: { params: { id: string } }): Promise<Metadata> {
  const props: Props = { params: wrapParams(raw.params) };

  const { id } = await props.params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Нотатку не знайдено – NoteHub",
      description: "Ця нотатка була видалена або не існує.",
    };
  }

  return {
    title: `${note.title} – NoteHub`,
    description: note.content.slice(0, 150),
  };
}

export default async function NoteDetails(raw: { params: { id: string } }) {
  const props: Props = { params: wrapParams(raw.params) };

  const { id } = await props.params;

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
