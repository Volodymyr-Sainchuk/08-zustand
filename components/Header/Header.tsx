"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./Header.module.css";
import TagsMenu, { Tag } from "../TagsMenu/TagsMenu";

interface HeaderProps {
  tags: Tag[];
}

export default function Header({ tags }: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") || "All";

  function handleSelectTag(tagName: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (tagName === "All") {
      params.delete("tag");
    } else {
      const tag = tags.find((t) => t.name === tagName);
      if (tag) params.set("tag", tag.id);
    }

    router.push(`/notes/?${params.toString()}`);
  }

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation" className={css.nav}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu tags={tags} selectedTag={selectedTag} onSelectTag={handleSelectTag} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
