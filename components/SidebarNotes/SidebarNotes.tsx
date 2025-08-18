"use client";

import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Work", "Personal", "Todo", "Meeting", "Shopping"];

interface SidebarNotesProps {
  selectedTag: string;
}

export default function SidebarNotes({ selectedTag }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${encodeURIComponent(tag)}`}
            className={`${css.menuLink} ${selectedTag === tag ? css.active : ""}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
