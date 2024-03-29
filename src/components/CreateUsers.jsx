import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Container,
  Button,
  Snackbar,
  CssBaseline,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from "@mui/material";
import CreateUsersForm from "./CreateUsersForm.jsx";
import { yellowColorTheme } from "../colorTheme.js";
import Header from "./Header.jsx";
import { getAllMemberDetails, deleteMember } from "../api.js";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function CreateUsers() {
  const [rows, setRows] = useState([
    {
      membershipId: "0",
      name: "Loading...",
      role: "-",
      email: "-",
    },
  ]);
  async function getMembers() {
    getAllMemberDetails().then((res) => {
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        changeSnackText(res.response.data.message);
      } else {
        setRows(res.data.data);
      }
    });
  }
  useEffect(() => {
    isAuthenticated();
    if (rows[0].membershipId === "0") {
      getMembers();
    }
  }, []);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  async function isAuthenticated() {
    const cookies = document.cookie;
    const token = cookies.split(", ")[0].split("=")[1];
    const role = sessionStorage.getItem("role");
    if (token === null) {
      return navigate("/login");
    } else if (role === "volunteer") {
      return navigate("/");
    }
  }
  const deleteAccount = async (membershipId) => {
    deleteMember(membershipId).then((res) => {
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        changeSnackText(res.response.data.message);
      }
      getMembers();
    });
  };
  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  const changeSnackText = (value) => {
    setSnackText(value);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 8000);
  };
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="primary"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Header />
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Container sx={{ margin: "auto", marginTop: "100px" }}>
          <CreateUsersForm
            changeSnackText={changeSnackText}
            getMembers={getMembers}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Volunteer Name</TableCell>
                  <TableCell align="left">MembershipId</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Roles</TableCell>
                  <TableCell align="left">Deleted Account</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.membershipId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${row.firstName} ${row.lastName}`}
                    </TableCell>
                    <TableCell align="left">{row.membershipId}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left" sx={{ textTransform: "uppercase" }}>
                      {row.role}
                    </TableCell>
                    {row.role !== JSON.parse(sessionStorage.getItem("role")) ? (
                      <TableCell align="left">
                        <Button
                          type="submit"
                          color="primary"
                          startIcon={<DeleteIcon />}
                          variant="outlined"
                          size="small"
                          onClick={() => deleteAccount(row.membershipId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell align="left">
                        <Button
                          type="submit"
                          color="primary"
                          startIcon={<DeleteIcon />}
                          variant="outlined"
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Snackbar
            className="regSnack"
            open={open}
            onClose={handleClose}
            message={snackText}
            action={action}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CreateUsers;
