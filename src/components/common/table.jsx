import React from "react";
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableRow columns={columns} data={data} />
    </table>
  );
};

export default Table;
