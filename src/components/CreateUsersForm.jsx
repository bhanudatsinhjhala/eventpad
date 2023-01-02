import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
  TextField,
  Stack, Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog
} from "@mui/material";
import { createUsers } from "..";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
        password: "",
        email: "",
        name: "",
      });
      setAccountCreated(false);
    }
  }, [reset, isAccountCreated]);
  // const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
          props.getMembers();
          props.changeSnackText(res.data.message);
          setTimeout(() => {
            setBtnText('Create Account');
            setBtnColor('primary')
          }, 2000)
          setLoading(false);
          setAccountCreated(true);
          handleCloseDialog();
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
    <div>
      <Container sx={{ margin: "auto", marginTop: "100px", marginBottom: "15px" }}>
        <Button variant="outlined" onClick={handleClickOpenDialog} startIcon={<PersonAddIcon />}>
          Create Account
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Account Setup</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h5" sx={{ marginBottom: "20px", color: "#00629b" }}>
                Create Volunteer's Account
              </Typography>
            </DialogContentText>
          </DialogContent>
          <form onSubmit={handleSubmit(onSubmit, onError)} class="createUserForm">
            <Stack spacing={4}>
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
                  {JSON.parse(sessionStorage.getItem("role")) === "admin" ? (<MenuItem value="admin">Admin</MenuItem>) : null}
                </Select>
              </FormControl>
              <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
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
              </DialogActions>
            </Stack>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}

export default MyForm;
