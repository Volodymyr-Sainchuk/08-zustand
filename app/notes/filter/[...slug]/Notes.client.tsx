"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";

import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import css from "@/app/page.module.css";

type Props = {
  initialData: FetchNotesResponse;
  initialTag?: string;
};

export default function Notes({ initialData, initialTag = "All" }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", initialTag, debouncedSearchTerm, currentPage],
    queryFn: () =>
      fetchNotes({
        query: debouncedSearchTerm,
        page: currentPage,
        perPage: 12,
        tag: initialTag !== "All" ? initialTag : undefined,
      }),
    placeholderData: keepPreviousData,
    initialData,
    refetchOnMount: false,
  });

  const handleSearch = (newValue: string) => {
    setSearchTerm(newValue);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination total={data.totalPages} page={currentPage} onChange={setCurrentPage} />
        )}

        {/* Замість модалки робимо посилання на сторінку створення нотатки */}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isPending && <p>Завантаження...</p>}
      {data?.notes?.length > 0 && <NoteList notes={data.notes} currentTag={initialTag} />}
    </div>
  );
}
