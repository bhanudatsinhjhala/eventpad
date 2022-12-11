import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import Login from "@mui/icons-material/Login";
import { createUsers } from "..";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function MyForm(props) {
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState('Create Account');
  const [btnColor, setBtnColor] = useState('primary');
  const [isAccountCreated, setAccountCreated] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    if (isAccountCreated) {
      reset({
        membershipId: "",
        role: "",
        password: "",
        email: "",
        name: "",
      });
      setAccountCreated(false);
    }
  }, [reset, isAccountCreated]);
  // const navigate = useNavigate();

  const form = useForm({
    defaultValues: { membershipId: "", password: "", email: "", role: "" },
  });
  const onSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    createUsers(data, JSON.parse(sessionStorage.getItem('token'))).then((res, err) => {
      console.log(res);
      // console.log(err.response);
      if (res.status === 200) {
        // console.log(res.data);
        if (res.data.message) {
          // console.log(res.data);
          setBtnColor('success');
          props.changeSnackText(res.data.message);
          setTimeout(() => {
            setBtnText('Create Account');
            setBtnColor('primary')
          }, 2000)
          setLoading(false);
          setAccountCreated(true);
        }
      } else {
        if (res.response.status === 409) {
          setBtnText(res.response.data.message)
          setBtnColor('error');
          setTimeout(() => {
            setBtnText('Create Account');
            setBtnColor('primary')
          }, 2000)
        } else {
          props.changeSnackText(res.response.data.message);
        }
        setLoading(false);
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
          autoComplete="off"
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
          autoComplete="off"
          type="text"
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

        <TextField
          autoComplete="off"
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            name="Role"
            {...register("role", {
              required: true,
            })}
          >
            <MenuItem value="volunteer">Volunteer</MenuItem>
            <MenuItem value="execom">Execom</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          type="submit"
          size="medium"
          color={btnColor}
          loading={loading}
          variant="outlined"
        >
          {
            btnColor === 'success' ? <CheckCircleOutlineRoundedIcon /> : btnText
          }
        </LoadingButton>
      </Stack>
    </form>
  );
}

export default MyForm;
