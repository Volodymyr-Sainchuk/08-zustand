import { Suspense } from "react";
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "@/app/notes/filter/[...slug]/Notes.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const tag = resolved.slug?.[0] ?? "Всі";

  return {
    title: `Нотатки за тегом: ${tag} – NoteHub`,
    description: `Перегляньте всі нотатки з тегом ${tag} у NoteHub.`,
    openGraph: {
      title: `Нотатки за тегом: ${tag} – NoteHub`,
      description: `Перегляньте всі нотатки з тегом ${tag} у NoteHub.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub – Нотатки за тегом ${tag}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const resolved = await params;
  const slug = resolved.slug || [];
  const tag = slug.length > 0 ? slug[0] : "All";

  const queryClient = new QueryClient();
  const queryTag = tag === "All" ? undefined : tag;

  const data = await fetchNotes({ query: "", page: 1, perPage: 12, tag: queryTag });

  const cacheTagKey = tag === "All" ? "" : tag;
  queryClient.setQueryData(["notes", "", 1, cacheTagKey], data);

  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes initialData={data} initialTag={tag} />
      </HydrationBoundary>
    </Suspense>
  );
}
