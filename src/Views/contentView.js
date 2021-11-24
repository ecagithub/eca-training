import React, { useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import BackButton from "../components/button/backButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import PdfComponent from "../components/pdf/pdfRenderComponent";
import VideoComponent from "../components/video/videoComponent";
import Footer from "../components/footer/footer";
import { SideBarContext } from "../context/sidebarContext";
import { ActiveClassContext } from "../context/activeClassContext";
const drawerWidth = 300;
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
export default function ContentPage() {
  const { courseName, subjectName, chapterName, topic } = useParams();
  const [initialWidth, setWidth] = React.useState(null);
  const pdfWrapper = useRef(null);
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const { context } = useContext(ActiveClassContext);
  console.log(context);
  const theme = useTheme();
  const classes = useStyles();

  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };

  useEffect(() => {
    if (pdfWrapper && pdfWrapper.current) {
      console.log("width", pdfWrapper.current.offsetWidth);
      setWidth(pdfWrapper.current.offsetWidth);
    }
  }, [courseName, subjectName, chapterName, topic]);

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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container ref={pdfWrapper}>
          <Grid xs={12} sm={12} md={12} lg={12} id="drag-dropContainer">
            <Box px={16}>
              {topic.split(".").pop() === "mp4" ? (
                <VideoComponent
                  courseName={courseName}
                  subjectName={subjectName}
                  chapterName={chapterName}
                  topic={topic}
                />
              ) : (
                <PdfComponent
                  courseName={courseName}
                  subjectName={subjectName}
                  chapterName={chapterName}
                  topic={topic}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Footer />
      </main>
    </React.Fragment>
  );
}
