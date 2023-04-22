import React, { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  Typography,
  Button,
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import "./App.css";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createEvent, checkJwtTokenExpire } from "../api.js";
import UploadFileDialog from "./UploadFileDialog.jsx";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";
import { yellowColorTheme } from "../colorTheme.js";
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
    reset,
    handleSubmit,
  } = useForm();
  const [eventDatePicker, setEventDatePicker] = React.useState(
    dayjs(new Date())
  );
  const [eventId, setEventId] = useState();
  const [loading, setLoading] = useState(false);
  const [visiblity, setVisibility] = useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setVisibility(true);
  };
  const handleChange = (newValue) => {
    setEventDatePicker(newValue);
  };
  // const navigate = useNavigate();
  const form = useForm({ defaultValues: { eventName: "", eventDate: "" } });
  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    console.info(data);
    console.log(new Date(eventDatePicker));
    data.eventDate = Math.round(new Date(eventDatePicker).getTime() / 1000);
    await checkJwtTokenExpire();
    createEvent(data, JSON.parse(sessionStorage.getItem("token"))).then(
      (res, err) => {
        console.info(res);
        if (res.status === 200) {
          props.changeSnackText(res.data.message);
          console.info("res datassss", res.data.data);
          setEventId(res.data.data._id);
          reset({
            eventType: "",
            eventDate: "",
            eventName: "",
          });
          setVisibility(false);
          props.getEvents();
        } else if (res) {
          props.changeSnackText(res.response.data.message);
        } else {
          console.info(err);
        }
        setLoading(false);
      }
    );
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div>
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Container
          sx={{ margin: "auto", marginTop: "100px", marginBottom: "15px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenDialog}
            startIcon={<EventIcon />}
          >
            Create Event
          </Button>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            {visiblity ? (
              <>
                <DialogTitle sx={{ color: "#e0e0e0" }}>Event Setup</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <DialogContent>
                    <DialogContentText>
                      <Typography
                        variant="h5"
                        sx={{ marginBottom: "20px", color: "#ffa306" }}
                      >
                        Create Event
                      </Typography>
                    </DialogContentText>
                    <Stack spacing={4}>
                      <TextField
                        autoComplete="off"
                        type="text"
                        color="primary"
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
                          disablePast={true}
                          renderInput={(params) => (
                            <TextField
                              color="primary"
                              sx={{
                                svg: { color: "#ffa306" },
                                input: { color: "#ffff" },
                                label: { color: "#ffa306" },
                              }}
                              {...params}
                            />
                          )}
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
                        <InputLabel
                          color="primary"
                          id="demo-simple-select-label"
                        >
                          Event Type
                        </InputLabel>
                        <Select
                          color="primary"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Event Type"
                          name="eventType"
                          {...register("eventType", {
                            required: true,
                          })}
                          error={Boolean(errors.eventType)}
                          helperText={
                            errors.eventType
                              ? errors.eventType.type === "required"
                                ? "Event Name  is required"
                                : null
                              : null
                          }
                        >
                          <MenuItem value="technical">Technical</MenuItem>
                          <MenuItem value="non-technical">
                            Non-Technical
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </DialogContent>
                  <DialogActions sx={{ justifyContent: "space-around" }}>
                    <Button
                      onClick={handleCloseDialog}
                      color="primary"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      size="medium"
                      loading={loading}
                      variant="contained"
                      color="primary"
                    >
                      Create Event
                    </LoadingButton>
                  </DialogActions>
                </form>
              </>
            ) : (
              <UploadFileDialog
                eventId={eventId}
                handleCloseDialog={handleCloseDialog}
                changeSnackText={props.changeSnackText}
              />
            )}
          </Dialog>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default CreateEvent;
