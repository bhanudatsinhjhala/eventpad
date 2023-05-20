import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Dialog,
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
import CreateEventDialog from "./CreateEventDialog.jsx";
import UploadFile from "./UploadFileDialog.jsx";
import EventParticipant from "./EventParticipant.jsx";
import { getEventDetails, getEventReport, deleteEventDetails } from "../api.js";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Event() {
  const [rows, setRows] = useState([
    {
      _id: "0",
      eventName: "Loading...",
      evenDate: "-",
      eventType: "-",
    },
  ]);
  async function getEvents() {
    getEventDetails(JSON.parse(sessionStorage.getItem("token"))).then((res) => {
      console.log(res);
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        changeSnackText(res.response.data.message);
      } else {
        res.data.forEach((event) => {
          let date = new Date(event.eventDate * 1000);
          let dateString = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
          console.log(dateString);
          event.dateString = dateString;
        });
        setRows(res.data);
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
    if (rows[0]._id === "0") {
      getEvents();
    }
  }, []);
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState("hello");
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  async function deleteEvent(id) {
    deleteEventDetails(id, JSON.parse(sessionStorage.getItem("token"))).then(
      (res) => {
        console.log(res);
        if (res.status !== 200) {
          if (res.response.status === 401 || res.response.status === 403) {
            changeSnackText(res.response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 8000);
          }
          changeSnackText(res.response.data.message);
        } else {
          console.log(res.data.message);
          getEvents();
        }
      }
    );
    console.log("Delete Event", id);
  }
  async function downloadReport(id, eventName) {
    let filename = `${eventName}-report.xlsx`;
    getEventReport(id, JSON.parse(sessionStorage.getItem("token"))).then(
      (res) => {
        console.log("Download response", res.data);
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
      }
    );
    console.log("Download Report", id);
  }

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
          <CreateEventDialog
            sx={{ marginBottom: "15px" }}
            getEvents={getEvents}
            changeSnackText={changeSnackText}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell align="left">Event Type</TableCell>
                  <TableCell align="left">Event Date</TableCell>
                  <TableCell align="left">Upload Data</TableCell>
                  <TableCell align="left">Download Report</TableCell>
                  <TableCell align="left">Delete Event</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="left"
                      sx={{ padding: 0 }}
                      component="th"
                      scope="row"
                    >
                      <EventParticipant
                        eventId={row._id}
                        eventName={row.eventName}
                        changeSnackText={changeSnackText}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {row.eventType}
                    </TableCell>
                    <TableCell align="left">{row.dateString}</TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<FileUploadIcon />}
                        onClick={handleClickOpenDialog}
                      >
                        Upload
                      </Button>
                      <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <UploadFile
                          eventId={row._id}
                          handleCloseDialog={handleCloseDialog}
                          changeSnackText={changeSnackText}
                        />
                      </Dialog>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<FileDownloadIcon />}
                        type="submit"
                        size="small"
                        onClick={() => downloadReport(row._id, row.eventName)}
                      >
                        Download
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        type="submit"
                        color="primary"
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        size="small"
                        onClick={() => deleteEvent(row._id)}
                      >
                        Delete
                      </Button>
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
