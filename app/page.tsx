import css from "./page.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub – Всі нотатки в одному місці",
  description: "Керуйте нотатками, тегами та швидко знаходьте потрібне у NoteHub.",
  openGraph: {
    title: "NoteHub",
    description: "Керуйте нотатками та тегами легко.",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your
          thoughts organized and accessible in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing notes. With support for keyword search
          and structured organization, NoteHub offers a streamlined experience for anyone who values clarity and
          productivity.
        </p>
      </div>
    </main>
  );
}
