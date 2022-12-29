import React, { useState, useEffect } from "react";
import {
    TextField, Stack, Typography, Button, FormControl,
    InputLabel, Select, MenuItem, Snackbar,
    DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import "./App.css";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createEvent } from "../index.js";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UploadFile from "./UploadFile.jsx";
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

function CreateEvent(props) {

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
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [eventDatePicker, setEventDatePicker] = React.useState(dayjs(new Date()));
    const [open, setOpen] = useState(false);
    const [eventId, setEventId] = useState();
    const [snackText, setSnackText] = useState("hello");
    const [loading, setLoading] = useState(false);
    const [visiblity, setVisibility] = useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleChange = (newValue) => {
        setEventDatePicker(newValue);
    };
    // const navigate = useNavigate();
    const form = useForm({ defaultValues: { eventName: "", eventDate: "" } });
    const onSubmit = (data) => {
        // console.log(data);
        setLoading(true);
        console.info(data);
        console.log(new Date(eventDatePicker));
        data.eventDate = Math.round(new Date(eventDatePicker).getTime() / 1000);
        createEvent(data, JSON.parse(sessionStorage.getItem('token'))).then((res, err) => {
            console.info(res);
            if (res.status === 200) {
                changeSnackText(res.data.message)
                console.info("res datassss", res.data.data)
                setEventId(res.data.data._id);
                setVisibility(false);
                props.getEvents();
            } else if (res) {
                changeSnackText(res.response.data.message)
            }
            else {
                console.info(err);
            }
            setLoading(false);
        })
    };
    const onError = (error) => {
        console.log(error);
    };
    function handleClose() {
        if (open === true) {
            setOpen(false);
        }
    }
    const changeSnackText = (value) => {
        setSnackText(value);
        setOpen(true);
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
            <Container sx={{ margin: "auto", marginTop: "100px", marginBottom: "15px" }}>
                <Button variant="outlined" onClick={handleClickOpenDialog} startIcon={<EventIcon />}>
                    Create Event
                </Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    {visiblity ? (
                        <>
                            <DialogTitle>Event Setup</DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                                <DialogContent>
                                    <DialogContentText>
                                        <Typography variant="h5" sx={{ marginBottom: "20px", color: "#00629b" }}>
                                            Create Event
                                        </Typography>
                                    </DialogContentText>
                                    <Stack spacing={4}>
                                        <TextField
                                            autoComplete="off"
                                            type="text"
                                            className="textInput"
                                            name="eventName"
                                            label="Event Name"
                                            placeholder="Enter Event Name"
                                            size="small"
                                            {...register("eventName", {
                                                required: true,
                                                minLength: 5,
                                            })}
                                            error={Boolean(errors.eventName)}
                                            helperText={
                                                errors.eventName
                                                    ? errors.eventName.type === "required"
                                                        ? "Event Name  is required"
                                                        : errors.eventName.type === "minLength"
                                                            ? "Please enter event name with more than 5 charchters"
                                                            : errors.eventName.message
                                                    : null
                                            }
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                name="eventDate"
                                                label="Date&Time picker"
                                                value={eventDatePicker}
                                                onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                                error={Boolean(errors.eventDate)}
                                                helperText={
                                                    errors.eventDate
                                                        ? errors.eventDate.type === "required"
                                                            ? "Event Date is required"
                                                            : null
                                                        : null
                                                }
                                            />
                                        </LocalizationProvider>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Event Type"
                                                name="eventType"
                                                {...register("eventType", {
                                                    required: true,
                                                })}
                                            >
                                                <MenuItem value="technical">Technical</MenuItem>
                                                <MenuItem value="non-technical">Non-Technical</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </DialogContent>
                                <DialogActions sx={{ justifyContent: "space-around" }}>
                                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                                    <LoadingButton
                                        type="submit"
                                        size="medium"
                                        loading={loading}
                                        variant="contained"
                                    >
                                        Create Event
                                    </LoadingButton>
                                </DialogActions>
                            </form>
                        </>
                    ) : (
                        <UploadFile eventId={eventId} handleCloseDialog={handleCloseDialog} />
                    )
                    }
                    <Snackbar
                        className="regSnack"
                        open={open}
                        onClose={handleClose}
                        message={snackText}
                        action={action}
                    />
                </Dialog>
            </Container>
        </div >
    )
}

export default CreateEvent;