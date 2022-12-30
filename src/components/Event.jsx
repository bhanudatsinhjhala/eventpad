import React, { useEffect, useState } from 'react';
import {
    Container, Button, Dialog,
    Table, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody,
} from '@mui/material';
import Header from "./Header.jsx";
import CreateEvent from "./CreateEvent.jsx";
import UploadFile from "./UploadFile.jsx";
import { getEventDetails, getEventReport, deleteEventDetails } from "../index.js";
import { useNavigate } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Event() {
    const [rows, setRows] = useState([{
        _id: "0",
        eventName: 'Loading...',
        evenDate: "-",
        eventType: "-"
    }])
    function getEvents() {
        getEventDetails(JSON.parse(sessionStorage.getItem('token'))).then((res) => {
            console.log(res);
            res.data.forEach((event) => {
                let date = new Date(event.eventDate * 1000);
                let dateString = `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                console.log(dateString);
                event.dateString = dateString;
            })
            setRows(res.data);
        });
    }
    useEffect(() => {
        isAuthenticated();
        if (rows[0]._id === "0") {
            getEvents();
        }
    }, [])
    const navigate = useNavigate();
    async function isAuthenticated() {
        const token = sessionStorage.getItem("token");
        if (token === null) {
            navigate("/login");
        }
    }

    useEffect(() => {
        isAuthenticated();
    }, []);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    function deleteEvent(id) {
        deleteEventDetails(id, JSON.parse(sessionStorage.getItem('token'))).then((res) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.message);
                getEvents();
            }
        })
        console.log("Delete Event", id);
    }
    function downloadReport(id, eventName) {
        let filename = `${eventName}-report.xlsx`;
        getEventReport(id, JSON.parse(sessionStorage.getItem('token'))).then((res) => {
            console.log("Download response", res.data);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            if (typeof window.navigator.msSaveBlob === 'function') {
                window.navigator.msSaveBlob(
                    res.data,
                    filename
                );
            } else {
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            }
        })
        console.log("Download Report", id);
    }
    return (
        <div>
            <Header />
            <Container sx={{ margin: "auto", marginTop: "100px" }}>
                <CreateEvent sx={{ marginBottom: "15px" }} getEvents={getEvents} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell align="left">Event Type</TableCell>
                                <TableCell align="left">Event Date</TableCell>
                                <TableCell align="left">Upload Data</TableCell>
                                <TableCell align="left">Download Report</TableCell>
                                <TableCell align="left">Deleted Event</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.eventName}
                                    </TableCell>
                                    <TableCell align="left">{row.eventType}</TableCell>
                                    <TableCell align="left">{row.dateString}</TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" size="small" onClick={handleClickOpenDialog}>
                                            Upload Data
                                        </Button>
                                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                                            <UploadFile eventId={row._id} handleCloseDialog={handleCloseDialog} />
                                        </Dialog>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" startIcon={<FileDownloadIcon />} type="submit" size="small" onClick={() => downloadReport(row._id, row.eventName)}>
                                            Download
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button type="submit" startIcon={<DeleteIcon />} variant="outlined" size="small" onClick={() => deleteEvent(row._id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

