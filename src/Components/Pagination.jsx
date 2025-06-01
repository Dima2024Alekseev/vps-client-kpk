import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Максимальное количество видимых кнопок пагинации

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage, endPage;
      if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-item"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {getPageNumbers().map((number) => (
        <button
          key={number}
          className={`pagination-item ${currentPage === number ? "active" : ""}`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="pagination-item"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
