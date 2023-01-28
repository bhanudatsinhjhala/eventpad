import React, { useState } from "react";
import { TextField, Stack, InputAdornment, IconButton, CssBaseline } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Login from "@mui/icons-material/Login";
import { loginUser } from "..";
import { ThemeProvider } from '@mui/material/styles';
import { yellowColorTheme } from '../colorTheme.js';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function MyForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({ defaultValues: { membershipId: "", password: "" } });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    loginUser(data).then((res, err) => {
      console.log(res);
      if (err) {
        navigate("/login");
      }
      if (res.status !== 200) {
        let errorRes = res.response
        if (errorRes.data.message) {
          // console.log(res.data);
          props.changeSnackText(errorRes.data.message);
          setLoading(false);
        } else {
          props.changeSnackText(res.data);
          setLoading(false);
        };
      } else {
        sessionStorage.setItem("token", JSON.stringify(res.data.accessToken));
        sessionStorage.setItem("refreshToken", JSON.stringify(res.data.refreshToken));
        sessionStorage.setItem("role", JSON.stringify(res.data.role));
        navigate("/");
      }
    });
  };
  // console.log(onSubmit);
  const onError = (error) => {
    console.log(error);
  };
  return (
    <ThemeProvider theme={yellowColorTheme}>
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={3}>
          <TextField
            autoComplete="off"
            type="number"
            className="textInput"
            color="primary"
            name="membershipId"
            label="Membership-Id"
            placeholder="Enter your Membership Id"
            size="small"
            {...register("membershipId", {
              required: true,
              minLength: 8,
              maxLength: 8,
              pattern: {
                value: /\d/,
                message: "Please enter only number values",
              },
            })}
            error={Boolean(errors.membershipId)}
            helperText={
              errors.membershipId
                ? errors.membershipId.type === "required"
                  ? "Membership Id is required"
                  : errors.membershipId.type === "minLength"
                    ? "Please Enter 8 Digit Membership Id"
                    : errors.membershipId.type === "maxLength"
                      ? "Please enter Membership Id of 8 Digit Only"
                      : errors.membershipId.message
                : null
            }
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
          <LoadingButton
            type="submit"
            size="medium"
            startIcon={<Login />}
            loading={loading}
            color="primary"
            variant="outlined"
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </ThemeProvider>
  );
}

export default MyForm;
