import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator, orderBy, order) {
  if (orderBy !== "attendance") {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    console.log(stabilizedThis);
    return stabilizedThis.map((el) => el[0]);
  } else {
    console.log("order is ", order);
    return sortAttendance(array, order);
  }
}
function sortAttendance(array, order) {
  console.log("sort Attendance is working");
  array.sort(function(a, b) {
    var nameA = a.present.toLowerCase(),
      nameB = b.present.toLowerCase();
    if (order !== "desc") {
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
    } else {
      if (nameA < nameB)
        //sort string ascending
        return 1;
      if (nameA > nameB) return -1;
    }
    return 0; //default return value (no sorting)
  });
  console.log("props.rows", array);
  return array;
}
const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Participant Name",
  },
  {
    id: "regId",
    numeric: true,
    disablePadding: false,
    label: "Registration Id",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "membershipId",
    numeric: false,
    disablePadding: false,
    label: "Membership-Id",
  },
  {
    id: "college",
    numeric: false,
    disablePadding: false,
    label: "College",
  },
  {
    id: "branch",
    numeric: false,
    disablePadding: false,
    label: "Branch",
  },
  {
    id: "sem",
    numeric: false,
    disablePadding: false,
    label: "Sem",
  },
  {
    id: "attendance",
    numeric: false,
    disablePadding: false,
    label: "Attendance",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ padding: headCell.id === "name" ? "1rem" : "1rem" }}
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: "100%", marginTop: "68px" }}>
      <Paper sx={{ width: "100%", my: 1, mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(
                props.rows,
                getComparator(order, orderBy),
                orderBy,
                order
              ).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ textTransform: "capitalize", padding: "1rem" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.regId}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.membershipId ? row.membershipId : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.college ? row.college : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.branch ? row.branch : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.sem ? row.sem : "-"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        textTransform: "uppercase",
                        color: row.present === "true" ? "#02e076" : "#ffaa8c",
                      }}
                    >
                      {row.present}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
