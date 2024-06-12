import React from 'react';

function TableWithData({ entityPath, columns, renderRow, data }) {
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
      <tbody className="table-group-divider">{data.map((item) => renderRow(item, entityPath))}</tbody>
    </table>
  );
}

export default TableWithData;
