import React from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { getUserDetails } from "../index";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm(props) {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  function handleClick(value) {
    if (value === "home") {
      navigate("/");
    }
  }
  const onSubmit = (data) => {
    console.log(data);
    getUserDetails(data.regid).then((res) => {
      // console.log(res);
      if (res.request.status === 300) {
        props.changeSnackText(
          "Please check your Registration Id. Your Registration was not found in database."
        );
        props.changeVis(true);
      } else if (res.request.status === 500) {
        props.changeSnackText(res.response.data);
      } else {
        // console.log(res.data);
        props.changeUserDetails(res.data[0]);
        props.changeVis(false);
        // console.log(visiblity);
      }
    });
  };
  return (
    <div>
      <Box
        component="form"
        className="regForm"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "fit-content" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Registration Id
        </Typography>
        <Stack direction="row" spacing={3}>
          <TextField
            autoComplete="off"
            name="regid"
            label="Registration-Id"
            type="text"
            size="small"
            placeholder="Enter your Registration Id"
            {...register("regid", {
              required: true,
              minLength: 11,
              maxLength: 11,
            })}
            error={Boolean(errors.regid)}
            helperText={
              errors.regid
                ? errors.regid.type === "required"
                  ? "Please Enter Registration Id"
                  : errors.regid.type === "minLength"
                  ? "Please Enter 11 digit Regitration Id"
                  : errors.regid.type === "maxLength"
                  ? "Please Enter Registration Id of 11 digit only."
                  : null
                : null
            }
          />
          <Button
            sx={{ height: "40px" }}
            className="submitBtn"
            type="submit"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </Stack>
      </Box>
      <Box sx={{ width: "fit-content", margin: "30px auto" }}>
        <Button
          sx={{ margin: "auto" }}
          variant="outlined"
          onClick={() => handleClick("home")}
        >
          Back to Home
        </Button>
      </Box>
    </div>
  );
}
