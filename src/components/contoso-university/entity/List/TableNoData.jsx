import React from 'react';

function TableNoData({ columns }) {
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
          <td colSpan={columns.length + 1} className="text-center">
            No hay datos
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableNoData;
