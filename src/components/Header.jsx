import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";

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

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navItems = [
    {
      key: 1,
      text: "QrScanner",
      to: "qrscan",
    },
    {
      key: 2,
      text: "Registration Id",
      to: "registrationid",
    },
    {
      key: 3,
      text: "Upload Data",
      to: "uploadfile",
    },
    {
      key: 4,
      text: "Volunteers Account",
      to: "createusers",
    },
    {
      key: 5,
      text: "Log Out",
      to: "login",
    },
  ];
  const handleNavBtn = (e) => {
    console.log(e.target.outerText);
  };
  function logOut() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            {open === true ? null : "QR Scanner"}
          </Typography>
          <Button
            sx={{
              position: "fixed",
              right: "50px",
              color: "#fff",
              borderColor: "#fff",
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
            color="primary"
            sx={{ margin: 2, color: "#1976d2" }}
          >
            QR Scanner
          </Typography>

          <IconButton onClick={handleDrawerClose} sx={{ color: "inherit" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((Obj) => {
            if (Obj.key !== 5) {
              return (
                <ListItem key={Obj.key} onClick={handleNavBtn} disablePadding>
                  <Link
                    to={`/${Obj.to}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {Obj.key % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
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
                    <ListItemButton onClick={logOut}>
                      <ListItemIcon>
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
  );
}
