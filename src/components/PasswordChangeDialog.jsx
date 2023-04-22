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

export default function PasswordChangeDialog() {
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
        Change Password
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
                Change Password
              </Typography>
            </DialogContentText>
            <Stack spacing={4}>
              <TextField
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="primary"
                className="textInput"
                placeholder="Enter your Password"
                size="small"
                {...register("password", {
                  required: true,
                })}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? errors.password.type === "required"
                      ? "Password is required"
                      : null
                    : null
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                label="Password"
                color="primary"
                className="textInput"
                placeholder="Enter your Password"
                size="small"
                {...register("password", {
                  required: true,
                })}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? errors.password.type === "required"
                      ? "Password is required"
                      : null
                    : null
                }
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
