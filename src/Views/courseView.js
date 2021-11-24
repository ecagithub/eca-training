import React, { Suspense, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import BackButton from "../components/button/backButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { SideBarContext } from "../context/sidebarContext";
import clsx from "clsx";
import TopicComponent from "../components/sideabr/topicComponent";
import Loader from "../components/loader/loader";
import BackDrop from "../components/loader/backdrop";
import { BackDropContext } from "../context/backdropContext";
import { ActivationContext } from "../context/activationContext";
import { ProfileContext } from "../context/profileContext";
import ProfileModal from "../components/modal/profileModal";
import { Redirect } from "react-router-dom";
import ActivationPage from "./activationView";
import Footer from "../components/footer/footer";
const LazyComponent = React.lazy(() => import("../components/course/course"));
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
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
  loader: {
    position: "absolute",
  },
}));

export default function Courses() {
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const { showBackDrop } = useContext(BackDropContext);
  const { license_data } = useContext(ActivationContext);
  //const { modalOpen, dispatchModalEvent } = useContext(ProfileContext);
  const classes = useStyles();
  const theme = useTheme();
  const [license, setLicense] = React.useState(false);
  React.useEffect(() => {
    setLicense(license_data.expired);
  }, []);
  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };
  // const closeProfileModal = () => {
  //   dispatchModalEvent("CLOSE_PROFILE_MODAL");
  // };
  if (license) {
    console.log(license_data.expired);
    return <ActivationPage />;
  } else {
    return (
      <React.Fragment>
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
          <BackButton />

          <TopicComponent />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={1}>
            <Suspense fallback={<BackDrop open={showBackDrop} />}>
              <LazyComponent />
            </Suspense>
          </Grid>
          <Footer />
        </main>
      </React.Fragment>
    );
  }
}
