import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  Typography,
  TextField,
  Stack,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { LoadingButton } from "@mui/lab";
import { checkJwtTokenExpire, updateProfile, getProfile } from "../api";

export default function UpdateProfile(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const getUserProfile = async () => {
    await checkJwtTokenExpire();
    await getProfile().then((res, err) => {
      console.log("userProfile ----", res);
      if (res.status === 200) {
        props.changeUserProfile(res.data.data);
      } else if (res.response.status === 401 || res.response.status === 403) {
        props.changeSnackText(res.response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        props.changeSnackText(res.response.data.message);
      }
    });
  };
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("data", data);
    await checkJwtTokenExpire();
    await updateProfile(data).then((res, err) => {
      console.log("updateProfile res -----", res);
      if (res.status === 200) {
        setLoading(false);
        handleCloseDialog();
        getUserProfile();
      }
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
        startIcon={<ModeEditOutlineIcon />}
      >
        Update Details
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: "#e0e0e0" }}>Update Details</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent>
            <DialogContentText>
              <Typography
                variant="h6"
                sx={{ marginBottom: "20px", color: "#ffa306" }}
              >
                Please Edit your Details
              </Typography>
            </DialogContentText>
            <Stack spacing={4}>
              <TextField
                color="primary"
                autoComplete="off"
                type="text"
                className="textInput"
                name="firstName"
                label="First Name"
                defaultValue={props.userProfile.firstName}
                placeholder="Enter your First name"
                size="small"
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^\S+$/,
                    message: "Please do not leave blank space",
                  },
                })}
                error={Boolean(errors.firstName)}
                helperText={
                  errors.firstName
                    ? errors.firstName.type === "required"
                      ? "First Name is required"
                      : errors.firstName.type === "minLength"
                      ? "Please Enter First name of min length of 2 charachters"
                      : errors.firstName.type === "maxLength"
                      ? "Please Enter First name of max length of 20 charachters Only"
                      : errors.firstName.message
                    : null
                }
              />
              <TextField
                color="primary"
                autoComplete="off"
                type="text"
                className="textInput"
                name="lastName"
                label="Last Name"
                defaultValue={props.userProfile.lastName}
                placeholder="Enter your Last name"
                size="small"
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                  pattern: {
                    value: /^\S+$/,
                    message: "Please do not leave blank space",
                  },
                })}
                error={Boolean(errors.lastName)}
                helperText={
                  errors.lastName
                    ? errors.lastName.type === "required"
                      ? "Last Name is required"
                      : errors.lastName.type === "minLength"
                      ? "Please Enter Last name of min length of 2 charachters"
                      : errors.lastName.type === "maxLength"
                      ? "Please Enter Last name of max length of 20 charachters Only"
                      : errors.lastName.message
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
                defaultValue={props.userProfile.email}
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
