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
import LockResetIcon from "@mui/icons-material/LockReset";
import { LoadingButton } from "@mui/lab";

import { checkJwtTokenExpire, resetPassword } from "../api";

export default function PasswordChangeDialog(props) {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (isPasswordChanged) {
      reset({
        updatePassword: "",
        confirmPassword: "",
      });
      setPasswordChanged(false);
    }
  }, [isPasswordChanged]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (data) => {
    console.log("data", data);
    setLoading(true);
    if (data.updatePassword !== data.confirmPassword) {
      setLoading(false);
      return props.changeSnackText("Confirm Password does not match");
    }
    await checkJwtTokenExpire();
    await resetPassword(data).then((res, err) => {
      console.log("resetpassword ----", res);
      setLoading(false);
      if (res.status === 201) {
        props.changeSnackText("Password Changed Successfully");
        setPasswordChanged(true);
        return handleCloseDialog();
      } else if (res.response.status === 401 || res.response.status === 403) {
        props.changeSnackText(res.response.data.message);
        return setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      return props.changeSnackText(res.response.data.message);
    });
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
        startIcon={<LockResetIcon />}
      >
        Reset Password
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#e0e0e0" }}>Reset Password</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent sx={{ maxWidth: "500px" }}>
            <DialogContentText>
              <Typography
                variant="h6"
                sx={{ marginBottom: "20px", color: "#ffa306" }}
              >
                Please Enter your new Password
              </Typography>
            </DialogContentText>
            <Stack spacing={4}>
              <TextField
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                label="Update Password"
                color="primary"
                className="textInput"
                placeholder="Enter your Update Password"
                size="small"
                {...register("updatePassword", {
                  required: true,
                })}
                error={Boolean(errors.updatePassword)}
                helperText={
                  errors.updatePassword
                    ? errors.updatePassword.type === "required"
                      ? "Update Password is required"
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
                label="Confirm Password"
                color="primary"
                className="textInput"
                placeholder="Enter your Update Password again"
                size="small"
                {...register("confirmPassword", {
                  required: true,
                })}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  errors.confirmPassword
                    ? errors.confirmPassword.type === "required"
                      ? "Confirm Password is required"
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
              Update Password
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
