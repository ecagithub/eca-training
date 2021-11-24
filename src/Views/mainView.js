import React, { Suspense, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ImageList from "../components/video/imageList";
import lottie from "lottie-web";
import lotieanim from "../static/lottie/dragNdrop.json";
import Drawer from "@material-ui/core/Drawer";
import BackButton from "../components/button/backButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { BackDropContext } from "../context/backdropContext";
import { SideBarContext } from "../context/sidebarContext";
import PdfRenderComponent from "../components/pdf/pdfRenderComponent";
import VideoComponent from "../components/video/videoComponent";
import SidebarComponent from "../components/sideabr/sidebarContent";
import QuizView from "./quizView";
import BackDrop from "../components/loader/backdrop";
import Footer from "../components/footer/footer";
const drawerWidth = 300;
const LazyComponent = React.lazy(() => import("../components/sideabr/sidebar"));
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
    padding: theme.spacing(1),
  },
}));
export default function Chapters() {
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const { dispatchBackDropEvent, showBackDrop } = useContext(BackDropContext);
  const theme = useTheme();
  const classes = useStyles();
  const [inputList, setInputList] = useState([]);
  const [content, setContent] = useState([]);
  const { courseName, subjectName, chapterName } = useParams();
  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  const getOnclickData = (event, course, subject, chapter, file) => {
    dispatchBackDropEvent("OPEN_BACKDROP");
    if (file.split(".").pop() === "pdf") {
      console.log("pdf clicked");
      document.getElementById("drag-dropContainer").innerHTML = "";
      // list.removeChild(list.childNodes[0]);
      setInputList(
        inputList.concat(
          <PdfRenderComponent
            key={file}
            courseName={course}
            subjectName={subject}
            chapterName={chapter}
            topic={file}
          />
        )
      );
    } else if (file.split(".").pop() === "mp4") {
      console.log("video clicked");
      document.getElementById("drag-dropContainer").innerHTML = "";
      setInputList(
        inputList.concat(
          <VideoComponent
            key={file}
            courseName={course}
            subjectName={subject}
            chapterName={chapter}
            topic={file}
          />
        )
      );
    } else if (file.split(".").pop() === "json") {
      console.log("inside quiz");
      document.getElementById("drag-dropContainer").innerHTML = "";
      setInputList(inputList.concat(<QuizView />));
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.getData("pdf")) {
      let pdfdata = JSON.parse(event.dataTransfer.getData("pdf"));
      console.log(pdfdata);
      document.getElementById("drag-dropContainer").innerHTML = "";
      // list.removeChild(list.childNodes[0]);
      setInputList(
        inputList.concat(
          <PdfRenderComponent
            key={pdfdata.fileName}
            courseName={pdfdata.course}
            subjectName={pdfdata.sub}
            chapterName={pdfdata.chap}
            topic={pdfdata.fileName}
          />
        )
      );
    } else if (event.dataTransfer.getData("video")) {
      let videoData = JSON.parse(event.dataTransfer.getData("video"));
      console.log(videoData);
      document.getElementById("drag-dropContainer").innerHTML = "";
      setInputList(
        inputList.concat(
          <VideoComponent
            key={videoData.fileName}
            courseName={videoData.course}
            subjectName={videoData.sub}
            chapterName={videoData.chap}
            topic={videoData.fileName}
          />
        )
      );
    }
  };

  React.useEffect(() => {
    async function fechSubjects() {
      lottie.loadAnimation({
        container: document.querySelector("#drag-dropContainer"),
        animationData: lotieanim,
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
      let chap_list = {
        course: courseName,
        sub: subjectName,
        chap: chapterName,
      };
      const res = await window.electron.file.fetchFile(chap_list);
      setContent(res);
    }

    fechSubjects();
  }, []);
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
        {content.map((topic, index) => (
          <SidebarComponent
            courseName={courseName}
            subject={subjectName}
            chapter={chapterName}
            topicName={topic}
            index={index}
            getOnclickData={getOnclickData}
          />
        ))}
      </Drawer>
      <main className={classes.content}>
        <BackDrop open={showBackDrop} />
        <div className={classes.toolbar} />
        <div className={classes.root1}>
          <Grid container spacing={1}>
            <Grid
              xs={11}
              sm={11}
              md={11}
              lg={11}
              id="drag-dropContainer"
              onDragOver={(e) => {
                onDragOver(e);
              }}
              onDrop={(e) => {
                onDrop(e);
              }}
            >
              {inputList}
            </Grid>
            {/* <Grid xs={12} sm={12} md={4} lg={4}>
              <ImageList
                images={content}
                courseName={courseName}
                subject={subjectName}
                chapter={chapterName}
                getOnclickData={getOnclickData}
              />
            </Grid> */}
          </Grid>
        </div>
        <Footer />
      </main>
    </React.Fragment>
  );
}
