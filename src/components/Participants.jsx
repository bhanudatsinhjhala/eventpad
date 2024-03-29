import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  CssBaseline,
  Snackbar,
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from "@mui/material";
import { yellowColorTheme } from "../colorTheme.js";
import Header from "./Header.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { getAllParticipantsList, downloadAllParticipantsList } from "../api.js";
import { useNavigate } from "react-router-dom";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Event() {
  const [rows, setRows] = useState([
    {
      name: "Loading...",
      email: "-",
    },
  ]);

  async function getAllParticipants() {
    getAllParticipantsList().then((res) => {
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        changeSnackText(res.response.data.message);
      } else {
        setRows(res.data.data);
      }
    });
  }
  async function downloadParticipantData() {
    let filename = "ieeeParticipantDB.xlsx";
    downloadAllParticipantsList().then((res) => {
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        changeSnackText(res.response.data.message);
      } else {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        if (typeof window.navigator.msSaveBlob === "function") {
          window.navigator.msSaveBlob(res.data, filename);
        } else {
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        }
      }
    });
  }
  const navigate = useNavigate();
  async function isAuthenticated() {
    const cookies = document.cookie;
    const token = cookies.split(", ")[0].split("=")[1];
    const role = sessionStorage.getItem("role");
    if (token === null) {
      navigate("/login");
    } else if (role === "volunteer" || role === "execom") {
      return navigate("/");
    }
  }
  useEffect(() => {
    isAuthenticated();
    if (rows[0].name === "Loading...") {
      getAllParticipants();
    }
  }, []);
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
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
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              padding: "0.5rem 1rem",
              marginBottom: "1rem",
            }}
            onClick={() => downloadParticipantData()}
            color="primary"
          >
            Download Excel
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Participant Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Membership Id</TableCell>
                  <TableCell align="left">College</TableCell>
                  <TableCell align="left">Branch</TableCell>
                  <TableCell align="left">Sem</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ padding: 0, paddingLeft: "1rem" }}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">
                      {row.email ? row.email : "-"}
                    </TableCell>
                    <TableCell align="left">
                      {row.membershipId ? row.membershipId : "Not Member"}
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
