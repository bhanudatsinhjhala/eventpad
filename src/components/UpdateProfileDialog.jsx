import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import { LoadingButton } from "@mui/lab";
export default function UpdateProfile() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [visiblity, setVisibility] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setVisibility(true);
  };
  function handleClose() {
    if (open === true) {
      setOpen(false);
    }
  }
  const onSubmit = async (data) => {
    console.log("data", data);
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpenDialog}
        startIcon={<EventIcon />}
      >
        Update Details
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#e0e0e0" }}>Event Setup</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent>
            <DialogContentText>
              <Typography
                variant="h5"
                sx={{ marginBottom: "20px", color: "#ffa306" }}
              >
                Update Profile
              </Typography>
            </DialogContentText>
            <Stack spacing={4}>
              <TextField
                color="primary"
                autoComplete="off"
                type="text"
                className="textInput"
                name="name"
                label="User Name"
                placeholder="Enter your user name"
                size="small"
                {...register("name", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: {
                    value: /^\S+$/,
                    message: "Please do not leave blank space",
                  },
                })}
                error={Boolean(errors.name)}
                helperText={
                  errors.name
                    ? errors.name.type === "required"
                      ? "User Name is required"
                      : errors.name.type === "minLength"
                      ? "Please Enter User name of min length of 5 charachters"
                      : errors.name.type === "maxLength"
                      ? "Please Enter User name of max length of 20 charachters Only"
                      : errors.name.message
                    : null
                }
              />
              <TextField
                color="primary"
                autoComplete="off"
                type="email"
                className="textInput"
                name="email"
                label="Email-Id"
                placeholder="Enter your Email Id"
                size="small"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                error={Boolean(errors.email)}
                helperText={
                  errors.email
                    ? errors.email.type === "required"
                      ? "Email Id is required"
                      : errors.email.message
                    : null
                }
              />
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
              Update Details
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
