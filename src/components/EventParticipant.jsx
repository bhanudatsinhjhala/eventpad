import React, { useEffect, useState } from 'react';
import {
    Button, Dialog, CssBaseline, AppBar, Toolbar, Typography, Container,
    Table, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody,
} from '@mui/material';
import { getAllParticipantDetails } from "../index.js";
import { useNavigate } from "react-router-dom";
import { yellowColorTheme } from "../colorTheme.js";
import { ThemeProvider } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



export default function EventParticpant(props) {
    const [participantDetails, setParticipantDetails] = useState([{
        regId: 0,
        name: "Loading",
        email: " ",
        present: " ",
    }])
    function getAllParticipant() {
        getAllParticipantDetails(props.eventId, JSON.parse(sessionStorage.getItem('token'))).then((res) => {
            console.log(res);
            if (res.status !== 200) {
                if (res.response.status === 401 || res.response.status === 403) {
                    props.changeSnackText(res.response.data.message);
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                }
                props.changeSnackText(res.response.data.message);
            } else {
                setParticipantDetails(res.data);
            }
        });
    }
    async function isAuthenticated() {
        const token = sessionStorage.getItem("token");
        if (token === null) {
            navigate("/login");
        }
    }
    useEffect(() => {
        isAuthenticated();
    }, []);
    const navigate = useNavigate();

    const [openParticipantDialog, setOpenParticipantDialog] = useState(false);

    const handleClickOpenParticipantDialog = () => {
        getAllParticipant();
        setOpenParticipantDialog(true);
    }

    function handleParticipantClose() {
        if (openParticipantDialog === true) {
            setOpenParticipantDialog(false);
            setParticipantDetails([]);
        }
    }
    return (
        <>
            <ThemeProvider theme={yellowColorTheme}>
                <CssBaseline />
                <Container sx={{ margin: "auto" }}>
                    <Button variant="text" color="primary" onClick={handleClickOpenParticipantDialog}>
                        {props.eventName}
                    </Button>
                    <Dialog open={openParticipantDialog} onClose={handleClickOpenParticipantDialog} fullScreen>
                        <AppBar sx={{ position: 'relative', backgroundColor: "#ffa306" }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleParticipantClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    {props.eventName}
                                </Typography>
                                <Button autoFocus color="inherit" onClick={handleParticipantClose}>
                                    Total Participants: {participantDetails.length}
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Participant Name</TableCell>
                                        <TableCell align="left" >RegistrationId</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left" >Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {participantDetails.map((participant) => (
                                        <TableRow
                                            key={participant.regId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" >
                                                {participant.name}
                                            </TableCell>
                                            <TableCell align="left" >{participant.regId}</TableCell>
                                            <TableCell align="left" >{participant.email}</TableCell>
                                            <TableCell align="left" sx={{ color: participant.present === false ? "#ffaa8c" : "#02e076" }}>{JSON.stringify(participant.present)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Dialog>
                </Container>
            </ThemeProvider>
        </>
    )
}