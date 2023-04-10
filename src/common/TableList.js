// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import TableListHeader from "./TableListHeader";

// ----------------------------------------------------------------------

TableList.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  size: PropTypes.string,
  noDataText: PropTypes.string,
};

export default function TableList({
  columns,
  data,
  size = "small",
  noDataText,
}) {
  return (
    <>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table size={size}>
          <TableListHeader
            headLabel={columns.map(({ id, label }) => ({
              id,
              label,
            }))}
          />
          <TableBody>
            {data.map((row, rowInd) => {
              return (
                <TableRow hover key={row.id}>
                  {columns.map((col, ind) => {
                    const cellValue = col.dataFormat
                      ? col.dataFormat(row[col.id], row, rowInd)
                      : row[col.id];
                    return (
                      <TableCell key={`${row.id}_${ind}`} align="left">
                        {cellValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {data.length === 0 && (
              <TableRow hover>
                <TableCell colSpan={columns.length} align="center">
                  {noDataText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
    </>
  );
}
