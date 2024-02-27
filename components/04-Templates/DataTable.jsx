"use client";

import DynamicAlert from "@/utils/DynamicAlert";
import { GET } from "@/utils/Fetch";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

export default function DataTable({ props }) {
  const columns = props.columns;
  const url = props.url;

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [keySearch, setKeySearch] = useState();
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GET({ endpoint: `/${url}?page=${page}&limit=${limit}` });
      if (response.success) {
        setRows(response.data);
        setCount(response.count);
      } else {
        DynamicAlert(response.message, "error");
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, keySearch]);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (value) => {
    setLimit(value);
  };

  return (
    <div>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, index) => (
                  <TableCell key={index}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={limit}
        page={page}
        count={count}
        component="div"
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => {
          onRowsPerPageChange(e.target.value);
        }}
      ></TablePagination>
    </div>
  );
}
