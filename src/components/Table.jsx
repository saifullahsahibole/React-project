// src/components/Table.jsx
import React from 'react';
import './Table.css'; // Import your CSS file for styling

const Table = ({ columns, data }) => {
  return (
    <div className="table-responsive"> {/* Add this div for horizontal scrolling */}
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">No Data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
