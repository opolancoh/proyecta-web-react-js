import React from 'react';

function TableLoading({ columns }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((item, index) => (
            <th key={index} scope="col">
              {item.label}
            </th>
          ))}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        <tr>
          <td colSpan={columns.length + 1}>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableLoading;
