import React from "react";
import { Box, Typography, Stack, TextField, Button, CssBaseline } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUserDetails, decodeJwt } from "../api.js";
import { ThemeProvider } from '@mui/material/styles';
import { yellowColorTheme } from "../colorTheme.js";


export default function RegistrationForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  // var [absentCount, setAbsentCount] = useState();

  // function checkAbsentCount() {
  //   totalAbsent().then((res) => {
  //     console.log(res);
  //     setAbsentCount(res.data.count);
  //   });
  // }
  // useEffect(() => {
  //   checkAbsentCount();
  // });
  const onSubmit = (data) => {
    // console.log(data);
    console.log(decodeJwt());
    // getUserDetails(data.regid, JSON.parse(sessionStorage.getItem('token'))).then((res) => {
    //   console.log(res);
    //   if (res.status !== 200) {
    //     if (res.response.status === 401) {
    //       props.changeSnackText(res.response.data.message);
    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 3000);
    //     } else {
    //       props.changeSnackText(res.response.data.message);
    //     }
    //     props.changeVis(true);
    //   } else {
    //     props.changeUserDetails(res.data);
    //     props.changeVis(false);
    //   }
    // });
  };
  return (
    <div>
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Box
          component="form"
          className="regForm"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "fit-content" }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Registration Id
            <Typography
              sx={{
                margin: "auto",
                marginLeft: 3,
                display: "inline",
                border: "1px solid #ffa306",
                padding: "2px",
              }}
              variant="body2"
            >
              Absent:
            </Typography>
          </Typography>
          <Stack direction="row" spacing={3}>
            <TextField
              autoComplete="off"
              name="regid"
              color="primary"
              label="Registration-Id"
              type="number"
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
              color="primary"
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </ThemeProvider>
    </div>
  );
}
