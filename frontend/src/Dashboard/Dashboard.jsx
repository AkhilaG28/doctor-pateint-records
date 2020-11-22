import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  CssBaseline,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import AllPatients from "./AllPatients";
import AddPatient from "./AddPatient";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { logout } from "../Auth/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "linear-gradient(285deg, #d6aed6 0%, #98d9e1 99%)",
    color: "#eb3b5a",
    fontSize: "26px",
    fontWeight: "bolder",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: "crimson",
    fontSize: "30px",
    margin: "5% 50% 0 14%",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { userData } = useSelector((state) => state.Auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mainContent, setMainContent] = useState("allPatients");

  const handleMainContent = (content) => {
    setMainContent(content);
    history.push(`/dashboard/${content}`);
  };

  // console.log(mainContent);

  const logoutUser = () => {
    dispatch(logout());
    history.push("");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Hi, Dr. {userData.name.toUpperCase()}
          </Typography>
          <Typography style={{ marginLeft: "80%" }}>
            <PowerSettingsNewIcon onClick={logoutUser} />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon></ListItemIcon>
          </ListItem>
          <ListItem onClick={() => handleMainContent("allPatients")}>
            <LibraryBooksIcon className={classes.icon} />
            All Patients
          </ListItem>
          <ListItem onClick={() => handleMainContent("addPatient")}>
            <AddToPhotosIcon className={classes.icon} />
            Add Patient
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {mainContent === "allPatients" ? <AllPatients /> : <AddPatient />}
      </main>
    </div>
  );
}

export default Dashboard;
