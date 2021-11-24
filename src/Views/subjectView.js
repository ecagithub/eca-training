import React, { useContext, Suspense } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import BackButton from "../components/button/backButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { SideBarContext } from "../context/sidebarContext";
import TopicComponent from "../components/sideabr/topicComponent";
import Footer from "../components/footer/footer";
const drawerWidth = 300;
const LazyComponent = React.lazy(() => import("../components/subject/subject"));
const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
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
}));
export default function Subjects(props) {
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const theme = useTheme();
  const classes = useStyles();

  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };

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
        <div className={classes.root1}>
          <Grid container spacing={3}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComponent />
            </Suspense>
          </Grid>
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
