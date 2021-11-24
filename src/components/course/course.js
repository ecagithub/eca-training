import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import CourseLottie from "../../static/lottie/course_animation.json";
//import moment from "moment";
import { ThemeContext } from "../../context/themeContext";
import { BreadcumbCompContext } from "../../context/breadcumbContext";
import { BackDropContext } from "../../context/backdropContext";

//import { create } from "nedb-promises";
//const si = require("systeminformation");

//const dbInstance = remote.getGlobal("db");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minHeight: 290,
  },
  media: {
    height: 140,
  },
  course: {},
});

export default function Courses() {
  const { darkState, themeReducer } = useContext(ThemeContext);
  const BreadCumbContext = useContext(BreadcumbCompContext);
  const { dispatchBackDropEvent } = useContext(BackDropContext);
  const classes = useStyles();
  const [course, setCourse] = useState([]);
  React.useEffect(() => {
    async function fechSubjects() {
      const courseData = await window.electron.course.fetchAllCourse();
      setCourse(courseData);
      lottie.loadAnimation({
        container: document.querySelector("root"),
        animationData: CourseLottie,
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });
    }

    fechSubjects();
  }, []);

  const updateBreadCumb = (e) => {
    console.log(e.target);
    const nav = e.target.getAttribute("data-id");
    console.log(nav);
    BreadCumbContext.changeBreadCumbContext({
      label: nav,
      link: "#",
    });
  };
  const getEnrolledIntoCourse = async (event) => {
    const enrollBtn = document.getElementById("enrollButton");
    const result = enrollBtn.getAttribute("data-id");
    console.log(result);
  };

  return course.length > 0 ? (
    <React.Fragment>
      {Object.keys(course).map((data, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          data-id={data}
          key={index}
          //onClick={updateBreadCumb}
        >
          <Link
            className="btn btn-outline-primary"
            to={`/subjects/${course[data]}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              className={classes.root}
              data-id={course[data]}
              variant="outlined"
              //onClick={updateBreadCumb}
            >
              <CardActionArea data-id={data}>
                <CardMedia
                  className={classes.media}
                  image={
                    process.env.PUBLIC_URL + "/images/" + course[data] + ".jpg"
                  }
                  title={data}
                  data-id={data}
                  //onClick={updateBreadCumb}
                />
                <CardContent data-id={course[data]}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course[data]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {/* Total Subjects : {modules[data]} */}
                    {/* {enrolledData.length > 0 ?
                      enrolledData.map((value, index) => {
                        {
                          <p>{value}{index}Test</p>;
                        }
                      }) : <p>not enrolled</p>} */}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  id="enrollButton"
                  data-id={course[data]}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ))}
    </React.Fragment>
  ) : (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        <span>Opps No Course found</span>
      </Typography>
      <div id="notFound"></div>
    </Grid>
  );
}
