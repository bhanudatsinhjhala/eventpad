import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { yellowColorTheme, headerTheme } from "../colorTheme.js";
import {
  Button, CssBaseline, Drawer, Toolbar, List, Typography, Divider,
  IconButton, ListItem, ListItemText, ListItemButton, ListItemIcon
} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  var [role, setRole] = React.useState();
  const navigate = useNavigate();
  async function isAuthenticated() {
    console.info("isAuthenticated is working");
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token === null || token === undefined) {
      navigate("/login");
    }
    setRole(JSON.parse(sessionStorage.getItem('role')));
  }
  React.useEffect(() => {
    isAuthenticated();
  }, []);
  // console.log(props.tokenValue, "tokenValue");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  var navItems = [
    {
      key: 1,
      text: "QrScanner",
      to: "qrscan",
      icon: <QrCodeScannerIcon />,
    },
    {
      key: 2,
      text: "Registration Id",
      to: "registrationid",
      icon: <AppRegistrationIcon />,
    },
    {
      key: 5,
      text: "Log Out",
      to: "login",
    },
  ];
  if (role) {
    if (role === "admin") {
      navItems = [
        ...navItems.slice(0, 2),
        {
          key: 3,
          text: "Event",
          to: "event",
          icon: <FileUploadIcon />,
        },
        {
          key: 4,
          text: "Volunteers Account",
          to: "createusers",
          icon: <PersonAddIcon />,
        },
        ...navItems.slice(2),
      ];
    } else if (role === "execom") {
      navItems = [
        ...navItems.slice(0, 2),
        {
          key: 4,
          text: "Volunteers Account",
          to: "createusers",
          icon: <PersonAddIcon />,
        },
        ...navItems.slice(2),
      ];
    }
  }
  const handleNavBtn = (e) => {
    console.log(e.target.outerText);
  };
  function logOut() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <ThemeProvider theme={yellowColorTheme} >
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ThemeProvider theme={headerTheme} >
          <AppBar position="fixed" open={open} sx={{ backgroundColor: "#ffa306" }} color="primary">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {open === true ? null : "EventPad"}
              </Typography>
              <Button
                sx={{
                  position: "fixed",
                  right: "50px",
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
                variant="outlined"
                onClick={logOut}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{ margin: 2, color: "#ffa306" }}
            >
              <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
                EventPad
              </Link>
            </Typography>

            <IconButton onClick={handleDrawerClose} sx={{ color: "inherit" }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon sx={{ color: "#ffa306" }} />
              ) : (
                <ChevronRightIcon sx={{ color: "#ffa306" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navItems.map((Obj) => {
              if (Obj.key !== 5) {
                return (
                  <ListItem key={Obj.key} onClick={handleNavBtn} disablePadding sx={{ display: "block" }}>
                    <Link
                      to={`/${Obj.to}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemButton sx={{ color: "#ffa306" }}>
                        <ListItemIcon sx={{ color: "#ffa306" }}>{Obj.icon}</ListItemIcon>
                        <ListItemText primary={Obj.text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    key={Obj.key}
                    onClick={handleNavBtn}
                    variant="outlined"
                    disablePadding
                  >
                    <Link
                      to={`/${Obj.to}`}
                      variant="outlined"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemButton onClick={logOut} sx={{ color: "#ffa306" }}>
                        <ListItemIcon sx={{ color: "#ffa306" }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        Logout
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              }
            })}
          </List>
          <Divider />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
