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
            QR Scanner
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
        // variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((Obj) => (
            <div>
              if(Obj.key !==4)(
              <ListItem key={Obj.key} onClick={handleNavBtn} disablePadding>
                <Link to={`/${Obj.to}`} style={{ textDecoration: "none" }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {Obj.key % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={Obj.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
              )else(
              <ListItem key={Obj.key} onClick={handleNavBtn} disablePadding>
                <Link to={`/${Obj.to}`} style={{ textDecoration: "none" }}>
                  <Button variant="outlined" onClick={logOut}>
                    Logout
                  </Button>
                </Link>
              </ListItem>
              )
            </div>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
