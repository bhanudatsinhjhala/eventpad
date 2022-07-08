import React from "react";
import { Button, TextField, Stack } from "@mui/material";
import Login from "@mui/icons-material/Login";
import { loginUser, verifyjwt } from "..";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function MyForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const form = useForm({ defaultValues: { membershipId: "", password: "" } });
  const onSubmit = (data) => {
    // console.log(data);
    loginUser(data).then((res, err) => {
      // console.log(res);
      // console.log(err.response);
      if (res.status === 200) {
        // console.log(res.data);
        if (res.data.message) {
          // console.log(res.data);
          props.changeSnackText(res.data.message);
        } else {
          sessionStorage.setItem("token", res.data);
          verifyjwt(res.data).then((res) => {
            console.log(res);
            if (res.data.message) {
              // console.log(res.data);
              props.changeSnackText(res.data.message);
            } else {
              navigate("/");
            }
          });
        }
      }
    });
  };
  // console.log(onSubmit);
  const onError = (error) => {
    console.log(error);
  };
  // console.log(onError);
  //eslint-disable-next-line
  // const formContext = useFormContext();
  // console.log(open, snackText);
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack spacing={3}>
        <TextField
          type="text"
          className="textInput"
          name="membershipId"
          label="Membership-Id"
          placeholder="Enter your Membership Id"
          size="small"
          {...register("membershipId", {
            required: true,
            minLength: 8,
            maxLength: 8,
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
                : null
              : null
          }
        />

        <TextField
          type="password"
          label="Password"
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
        />
        <Button
          startIcon={<Login />}
          variant="outlined"
          type="submit"
          size="medium"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default MyForm;
