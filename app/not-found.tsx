import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent/NotFoundContent";

export const metadata: Metadata = {
  title: "Сторінку не знайдено – NoteHub",
  description: "Ця сторінка не існує або була видалена.",
  openGraph: {
    title: "Сторінку не знайдено – NoteHub",
    description: "Ця сторінка не існує або була видалена.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
