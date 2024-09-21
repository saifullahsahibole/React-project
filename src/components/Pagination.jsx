import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button 
          key="prev" 
          className="btn btn-outline-dark" 
          onClick={() => onPageChange(currentPage - 1)} 
          aria-label="Previous Page"
        >
          &laquo;
        </button>
      );
    }

    // First page button
    if (startPage > 1) {
      buttons.push(
        <button 
          key={1} 
          className="btn btn-outline-dark" 
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<button key="left-ellipsis" className="btn btn-outline-dark" disabled>...</button>);
      }
    }

    // Middle page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          className={`btn ${currentPage === i ? 'btn-primary' : 'btn-outline-dark'}`} 
          onClick={() => onPageChange(i)} 
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    // Last page button
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<button key="right-ellipsis" className="btn btn-outline-dark" disabled>...</button>);
      }
      buttons.push(
        <button 
          key={totalPages} 
          className="btn btn-outline-dark" 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button 
          key="next" 
          className="btn btn-outline-dark" 
          onClick={() => onPageChange(currentPage + 1)} 
          aria-label="Next Page"
        >
          &raquo;
        </button>
      );
    }

    return buttons;
  };

  return <div className="pagination d-flex justify-content-center mt-4">{renderPaginationButtons()}</div>;
};

export default Pagination;
