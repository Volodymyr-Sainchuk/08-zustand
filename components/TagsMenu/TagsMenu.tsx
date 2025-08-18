"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export interface Tag {
  id: string;
  name: string;
}

export interface TagsMenuProps {
  tags: Tag[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export default function TagsMenu({ tags, selectedTag, onSelectTag }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelect = (tagName: string) => {
    onSelectTag(tagName);
    setIsOpen(false);
  };

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu} type="button">
        Notes ▾ ({selectedTag})
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/All`} className={css.menuLink} onClick={() => handleSelect("All")}>
              All notes
            </Link>
          </li>

          {tags.map((tag) => (
            <li key={tag.id} className={css.menuItem}>
              <Link
                href={`/notes/filter/${encodeURIComponent(tag.name)}`}
                className={css.menuLink}
                onClick={() => handleSelect(tag.name)}
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
