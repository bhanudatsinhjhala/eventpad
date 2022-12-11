import React from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { getUserDetails } from "../index";

export default function RegistrationForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
    getUserDetails(data.regid, JSON.parse(sessionStorage.getItem('token'))).then((res) => {
      console.log(res);
      if(res.status===200) {
        // console.log(res.data);
        props.changeUserDetails(res.data);
        props.changeVis(false);
        // console.log(visiblity);
      }else{
        props.changeSnackText(
          res.response.data.message
        );
        props.changeVis(true);
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
          <Typography
            sx={{
              margin: "auto",
              marginLeft: 3,
              display: "inline",
              border: "1px solid #00629b",
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
    </div>
  );
}
