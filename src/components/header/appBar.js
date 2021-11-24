import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Switch from "@material-ui/core/Switch";
import Modal from "@material-ui/core/Modal";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import SearchComponent from "../search/search";
import logo from "../../static/media/images/eca.png";
import { ProfileContext } from "../../context/profileContext";
import { NotificationContext } from "../../context/notificationContext";
import { ActivationContext } from "../../context/activationContext";
import { ThemeContext } from "../../context/themeContext";
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  root1: {
    flexGrow: 1,
  },
  roomyClass: {
    flexGrow: 1,
  },
  appBar: {
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
  logo: {
    maxWidth: 40,
    marginRight: "10px",
    zIndex: 1000,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
export default function MainAppBAr(props) {
  const { darkState, darkMode, themeReducer } = useContext(ThemeContext);
  const context = useContext(ProfileContext);
  const { anchorEl, dispatchNotificationEvent } =
    useContext(NotificationContext);
  const { license_data } = useContext(ActivationContext);
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const [showNotiBadge, setNotiBadge] = useState(false);
  const [rem_days, setRemainingDays] = useState();
  const id = open ? "simple-popover" : undefined;
  const menuId = "primary-search-account-menu";
  let interval = 100000;
  var c = 180;

  setInterval(async () => {
    const rem = await window.electron.notification.reminder();
    if (rem < 30) {
      setRemainingDays(rem);

      console.log(rem_days);
      setNotiBadge(true);
    } else {
      interval = 60 * 5000;
    }
  }, interval);

  const showNotification = (event) => {
    setNotiBadge(false);
    dispatchNotificationEvent("SHOW_NOTIICATION", event);
    if (rem_days != "") {
      interval = 60 * 5000;
    }
  };

  const setTheme = () => {
    console.log(darkState);
    if (darkState) {
      themeReducer("LIGHTMODE");
    } else {
      themeReducer("DARKMODE");
    }
    console.log(darkState);
  };
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
        style={
          darkState
            ? { backgroundColor: "black" }
            : { backgroundColor: "#fafafa" }
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: props.open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Kitty Katty!" className={classes.logo} />
          <Typography variant="h6" noWrap className={classes.root1}>
            ECA TRAINING
          </Typography>

          {/* Search Component */}
          {/* {license_data.expired === false && */}
          <SearchComponent />

          {/*End of Search Component */}
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge
                badgeContent={showNotiBadge ? 1 : null}
                color={darkState ? "secondary" : "error"}
                ria-describedby={id}
                onClick={showNotiBadge ? showNotification : null}
                className="notiElement"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Switch
              onChange={() => setTheme()}
              style={darkState ? { color: "white" } : { color: "black" }}
              name="loading"
            />
            {/* <Tooltip
              title={
                navigator.onLine
                  ? "you are connected to Internet"
                  : "No internet Connection"
              }
            >
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  console.log("clicked");
                  context.dispatchModalEvent("OPEN_PROFILE_MODAL");
                }}
              >
                <Badge
                  color="error"
                  variant="dot"
                  invisible={navigator.onLine ? false : true}
                >
                  <AccountCircle />
                </Badge>
              </IconButton>
            </Tooltip> */}
          </div>
          <div>
            {/* <IconButton onClick={props.handleClick} color="inherit">
              <MoreIcon />
            </IconButton> */}
            {/* 
            <Menu>
              <MenuItem onClick={props.handleClose}>My account</MenuItem>
              <MenuItem onClick={props.handleClose}>Logout</MenuItem>
            </Menu> */}
          </div>
        </Toolbar>
      </AppBar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          dispatchNotificationEvent("CLOSE_NOTIICATION");
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          Your ECA Training App license will expire soon. {rem_days} more day to
          expire.
        </Typography>
      </Popover>
    </React.Fragment>
  );
}
