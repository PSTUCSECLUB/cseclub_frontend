import React from "react";
import ReactPaginate from "react-paginate";

export default function Paginate({ handlePageClick, pageCount }) {
  return (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName="pagination__item"
      pageLinkClassName="pagination__link"
      previousClassName="pagination__item"
      previousLinkClassName="pagination__link"
      nextClassName="pagination__item"
      nextLinkClassName="pagination__link"
      breakLabel="..."
      breakClassName="pagination__item"
      breakLinkClassName="pagination__link"
      containerClassName="pagination"
      activeClassName="pagination__active"
      disabledClassName="pagination__disable"
      renderOnZeroPageCount={null}
    />
  );
}
