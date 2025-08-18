import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
}

export default function Pagination({ total, page, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
