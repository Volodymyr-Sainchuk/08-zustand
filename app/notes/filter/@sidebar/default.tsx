import Link from "next/link";
import css from "@/app/notes/filter/@sidebar/SidebarNotes.module.css";

async function fetchTags(): Promise<string[]> {
  return ["All", "Work", "Personal", "Todo", "Meeting", "Shopping"];
}

export default async function SidebarDefault() {
  const tags = await fetchTags();

  return (
    <aside>
      <nav>
        <ul>
          {tags.map((tag) => (
            <li className={css.menuList} key={tag}>
              <Link href={`/notes/filter/${encodeURIComponent(tag)}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
