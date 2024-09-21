// components/PageSizeDropdown.js
import React from 'react';

const PageSizeDropdown = ({ currentSize, onChange }) => {
  return (
    <div className="dropdown">
      <label htmlFor="pageSize" className="mr-2">Entries per page:</label>
      <button
        className="btn btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        aria-haspopup="true"
      >
        {currentSize}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {[5, 10, 20, 50].map(size => (
          <li key={size}>
            <button 
              className={`dropdown-item ${currentSize === size ? 'active' : ''}`} 
              onClick={() => onChange(size)}
            >
              {size}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageSizeDropdown;
