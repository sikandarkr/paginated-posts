import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Create an array of page numbers based on totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          Previous
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
