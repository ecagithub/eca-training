import React, { Suspense, useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import BackButton from "../components/button/backButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { SideBarContext } from "../context/sidebarContext";
import { BackDropContext } from "../context/backdropContext";
import clsx from "clsx";
import TopicComponent from "../components/sideabr/topicComponent";
const LazyComponent = React.lazy(() => import("../components/quiz/quizCard"));

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
}));
export default function QuizView() {
  const { dispatchBackDropEvent, showBackDrop } = useContext(BackDropContext);
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const classes = useStyles();
  const theme = useTheme();
  const [quizzes, setQuizzes] = useState([]);
  const [shouldShowCards, setShouldShowCards] = useState(false);
  const { courseName, subjectName, chapterName } = useParams();

  useEffect(() => {
    async function fetchQuixData() {
      let quiz_question_details = {
        course: courseName,
        sub: subjectName,
        chap: chapterName,
      };
      const res = await window.electron.quiz.fetchQuiz(quiz_question_details);
      console.log(res);
      setQuizzes(res);
    }

    const timer = setTimeout(() => {
      fetchQuixData();
      dispatchBackDropEvent("CLOSE_BACKDROP");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setShouldShowCards(true);
  };

  const handleDrawerClose = () => {
    dispatchUserEvent("CLOSE_DRAWER");
  };
  return (
    <React.Fragment>
      {/* <Drawer
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
          {!shouldShowCards ? (
            <React.Fragment>
              <h2>Welcome to the Trivia Challenge!</h2>
              <div className="StartEndCard">
                <h2>
                  You will answer 10 of the most rando true or false questions
                </h2>
                <p>Can you score 10/10?</p>

                <button
                  type="submit"
                  className="Button"
                  onClick={() => handleButtonClick()}
                >
                  Get Started!
                </button>
              </div>
            </React.Fragment>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComponent quizQuestions={quizzes} />
            </Suspense>
          )}
        </Grid>
      </main> */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent quizQuestions={quizzes} />
      </Suspense>
    </React.Fragment>
  );
}
