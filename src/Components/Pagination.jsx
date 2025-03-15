import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className="pagination-container">
            <button
                className="pagination-item"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`pagination-item ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
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