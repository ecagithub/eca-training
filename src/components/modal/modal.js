import React, { useEffect, useState, useContext } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { QuizBackDropContext } from "../../context/quizModalContext";
import CorrectLottie from "../lottie/corretLottie";
import WrongLottie from "../lottie/wrongLottie";
var _ = require("lodash");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    backgroundColor: "#dad7d2",
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function QuizBackdrop(props) {
  const classes = useStyles();
  const [correct, setCorrect] = useState();
  const { dispatchBackDropEvent } = useContext(QuizBackDropContext);
  console.log(props.isCorrect);
  React.useEffect(() => {
    setCorrect(props.isCorrect);
  }, [props.isCorrect]);
  const closeQuizBackDrop = () => {
    props.closeBackDrop();
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <Paper elevation={3} style={{ paddingLeft: "10px" }}>
          {" "}
          <h1>{_.unescape(props.question)}</h1>
        </Paper>

        <div className={classes.root}>
          {/* <Grid container spacing={3}>
            {correct ? <CorrectLottie /> : <WrongLottie />}
          </Grid> */}
          <Grid container spacing={3}>
            {props.options.map(
              (
                option,
                index //for each option, new paragraph
              ) => (
                <Grid item xs={6} sm={6} md={6}>
                  <Paper
                    elevation={2}
                    key={option * 10}
                    square={true}
                    data-id={option}
                    style={{ padding: "10px", cursor: "pointer" }}
                    style={
                      props.correctAnswer === option
                        ? {
                            color: "black",
                            backgroundColor: "green",
                            padding: "15px",
                          }
                        : {
                            color: "black",
                            backgroundColor: "yellow",
                            padding: "15px",
                          }
                    }
                  >
                    {option}
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
          <Button onClick={closeQuizBackDrop}>Close</Button>
        </div>
      </Backdrop>
    </div>
  );
}
