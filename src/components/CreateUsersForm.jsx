import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@mui/material/styles";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  TextField,
  Stack,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CssBaseline,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { createUsers } from "../api.js";
import { yellowColorTheme } from "../colorTheme.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function MyForm(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnText, setBtnText] = useState("Create");
  const [btnColor, setBtnColor] = useState("primary");
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
        email: "",
        firstName: "",
        lastName: "",
        role: "",
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
    defaultValues: { membershipId: "", email: "", role: "" },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    createUsers(data).then((res, err) => {
      if (res.status !== 200) {
        if (res.response.status === 401 || res.response.status === 403) {
          props.changeSnackText(res.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else if (res.response.status === 409) {
          setBtnText(res.response.data.message);
          props.changeSnackText(res.response.data.message);
          setBtnColor("error");
          setTimeout(() => {
            setBtnText("Create");
            setBtnColor("primary");
          }, 2000);
        } else {
          props.changeSnackText(res.response.data.message);
        }
      } else if (res.data.message) {
        setBtnColor("success");
        props.getMembers();
        props.changeSnackText(res.data.message);
        setTimeout(() => {
          setBtnText("Create");
          setBtnColor("primary");
        }, 2000);
        setLoading(false);
        setAccountCreated(true);
        handleCloseDialog();
      }
      setLoading(false);
    });
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <div>
      <ThemeProvider theme={yellowColorTheme}>
        <CssBaseline />
        <Container
          sx={{ margin: "auto", marginTop: "100px", marginBottom: "15px" }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenDialog}
            startIcon={<PersonAddIcon />}
          >
            Create Account
          </Button>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Account Setup</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <DialogContent sx={{ padding: "20px 20px" }}>
                <DialogContentText>
                  <Typography
                    variant="h5"
                    sx={{ paddingBottom: "20px", color: "#ffa306" }}
                  >
                    Create Volunteer's Account
                  </Typography>
                </DialogContentText>
                <Stack spacing={4}>
                  <TextField
                    color="primary"
                    autoComplete="off"
                    type="number"
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
                    color="primary"
                    autoComplete="off"
                    type="text"
                    className="textInput"
                    name="firstName"
                    label="First Name"
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
                  <FormControl fullWidth>
                    <InputLabel color="primary" id="demo-simple-select-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                      color="primary"
                      name="role"
                      {...register("role", {
                        required: true,
                      })}
                      error={Boolean(errors.role)}
                      helperText={
                        errors.role
                          ? errors.role.type === "required"
                            ? "Role is required"
                            : errors.role.message
                          : null
                      }
                    >
                      <MenuItem value="volunteer">Volunteer</MenuItem>
                      <MenuItem value="execom">Execom</MenuItem>
                      {JSON.parse(sessionStorage.getItem("role")) === "admin" ||
                      JSON.parse(sessionStorage.getItem("role")) ===
                        "super-admin" ? (
                        <MenuItem value="admin">Admin</MenuItem>
                      ) : null}
                    </Select>
                  </FormControl>
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
                  color={btnColor}
                  loading={loading}
                  variant="contained"
                >
                  {btnColor === "success" ? (
                    <CheckCircleOutlineRoundedIcon />
                  ) : (
                    btnText
                  )}
                </LoadingButton>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default MyForm;
