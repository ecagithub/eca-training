import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { HashRouter, Route, Switch } from "react-router-dom";
//pageView  imports
import CoursePage from "./Views/courseView";
import ActivationPage from "./Views/activationView";
import Subjectpage from "./Views/subjectView";
import ChapterPage from "./Views/chapterView";
import MainPage from "./Views/mainView";
import ContentPage from "./Views/contentView";
import Quiz from "./Views/quizView";
import Header from "./components/header/appBar";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//importing SidebarContext
import { SideBarContext } from "./context/sidebarContext";
import { ProfileContext } from "./context/profileContext";
import { ActivationContext } from "./context/activationContext";
import { ThemeContext } from "./context/themeContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function App() {
  const { dispatchUserEvent, open } = useContext(SideBarContext);
  const { palletType, mainPrimaryColor, mainSecondaryColor, darkState } =
    useContext(ThemeContext);
  const { license_data } = useContext(ActivationContext);
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const handleDrawerOpen = () => {
    dispatchUserEvent("OPEN_DRAWER");
  };
  const handleClose = () => {
    dispatchUserEvent("CLOSE");
  };

  let darkTheme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  return (
    <>
      <HashRouter>
        <ThemeProvider theme={darkTheme}>
          <div className={classes.root}>
            <CssBaseline />
            <Header
              handleDrawerOpen={handleDrawerOpen}
              handleClose={handleClose}
              open={open}
            />
            <Switch>
              <Route exact path="/subjects/:id" component={Subjectpage} />
              <Route
                exact
                path="/chapters/:courseName/:subjectName"
                component={ChapterPage}
              />
              <Route
                exact
                path="/mainPage/:courseName/:subjectName/:chapterName"
                component={MainPage}
              />
              <Route
                exact
                path="/showContent/:courseName/:subjectName/:chapterName/:topic"
                render={(props) => (
                  <ContentPage key={props.match.params.topic} {...props} />
                )}
              />

              <Route
                exact
                path="/searchResult/:courseName/:subjectName/:chapterName/:topic"
                render={(props) => (
                  <ContentPage key={props.match.params.topic} {...props} />
                )}
              />

              <Route
                exact
                path="/quiz/:courseName/:subjectName/:chapterName"
                component={Quiz}
              />

              <Route exact path="/" component={CoursePage} />
              <Route exact path="/license" component={ActivationPage} />
            </Switch>
          </div>
        </ThemeProvider>
      </HashRouter>
    </>
  );
}

export default App;
