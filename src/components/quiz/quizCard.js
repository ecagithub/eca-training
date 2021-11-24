import _ from "lodash";
import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import lottie from "lottie-web";
import Modal from "@material-ui/core/Modal";
import CustomModal from "../modal/modal";
import { QuizBackDropContext } from "../../context/quizModalContext";
import CorrectLottie from "../../static/lottie/correct.json";
import WrongLottie from "../../static/lottie/wrong.json";
import QuizBackdrop from "../modal/modal";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Card = (props) => {
  const { dispatchBackDropEvent, showBackDrop } =
    useContext(QuizBackDropContext);
  const classes = useStyles();
  const quizQuestions = props.quizQuestions;
  const initialState = {
    currentIndex: 0,
    score: 0,
    showFinished: false,
    answered: false,
    selectedOption: "",
    revealAnswer: "",
    useranswer: "",
    response: [],
    textMeassage: "",
    isCorrectAnswer: false,
  };

  const [state, setState] = useState(initialState);

  const {
    currentIndex,
    score,
    revealAnswer,
    textMeassage,
    selectedOption,
    useranswer,
    response,
    isCorrectAnswer,
  } = state;

  // A click event is typed as React.ChangeEvent<HTMLInputElement>
  const handleChange = (e, correctAnswer) => {
    e.persist();
    e.preventDefault();
    const isCorrect = e.target.id.includes(correctAnswer.toString())
      ? true
      : false;
    const renderAnswer = isCorrect ? "Correct!" : "Sorry, wrong answer!";

    setState({
      ...state,
      selectedOption: e.target.id.toString(),
      answered: isCorrect ? true : false,
      score: isCorrect ? score + 1 : score + 0,
      revealAnswer: renderAnswer,
    });

    if (currentIndex + 1 > quizQuestions.length) {
      setState({ ...state, showFinished: true });
    }
  };

  const nextQuestionHander = () => {
    let isCorrect = false;
    console.log(quizQuestions[currentIndex].answer);
    console.log(currentIndex);
    for (var i = 0; i < quizQuestions[currentIndex].options.length; i++) {
      if (document.getElementById("quizForm").choice[i].checked === true) {
        var userAnswer = document.getElementById("quizForm").choice[i].value;
        console.log(userAnswer);
        let a = response.slice();
        a[currentIndex] = userAnswer;
        if (userAnswer === quizQuestions[currentIndex].answer) {
          isCorrect = true;
        }
        setState({
          ...state,
          score: isCorrect ? score + 1 : score + 0,
          response: a,
          currentIndex: currentIndex + 1,
        });
      }
    } //end of for loop
    console.log(initialState);
  };

  const prevQuestionHander = () => {
    setState({
      ...state,
      currentIndex: currentIndex - 1,
    });
    let index = currentIndex;
    index = index - 1;
    //renderPreviousValue(index);
    console.log(currentIndex);
  };

  //render previous question Value function
  const renderPreviousValue = (index) => {
    console.log(index);
    console.log(response[index]);
    if (
      typeof response != "undefined" &&
      response != null &&
      response.length != null &&
      response.length > 0
    ) {
      if (typeof response[index] !== undefined) {
        console.log(quizQuestions[index].question);
        for (var i = 0; i < quizQuestions[index].options.length; i++) {
          const compareResponse = response[index];
          const actualValue =
            document.getElementById("quizForm").choice[i].value;
          if (compareResponse === actualValue) {
            console.log("finally");
            document.getElementById("quizForm").choice[i].checked = true;
          }
        }
      }
    }
  };

  const closeBackDrop = () => {
    dispatchBackDropEvent("CLOSE_BACKDROP");
    setState({
      currentIndex: currentIndex + 1,
    });
  };
  const checkAnswer = (answer) => {
    console.log(answer);
    setState({
      ...state,
      useranswer: answer,
    });
    console.log(useranswer);
  };
  const otherCheck = (e) => {
    let answer = e.target.getAttribute("data-id");
    console.log(answer);
    let isCorrect = false;

    if (answer == quizQuestions[currentIndex].answer) {
      isCorrect = true;
    }
    setState({
      ...state,
      textMeassage: "opps wrong answer",
      score: score + 1,
      isCorrectAnswer: isCorrect ? true : false,
    });

    dispatchBackDropEvent("OPEN_BACKDROP");

    // <CustomModal text={answer} />;
  };
  const checkGivenAnswer = (e) => {
    otherCheck(e);
  };
  const renderAnswer = () => {
    return <React.Fragment>{revealAnswer}</React.Fragment>;
  };

  return quizQuestions &&
    quizQuestions.length > 0 &&
    currentIndex < quizQuestions.length ? (
    <div>
      <p>
        {" "}
        Question {currentIndex + 1}/{quizQuestions.length}
      </p>
      <p>Score{score}</p>

      <h2>{quizQuestions[currentIndex].category}</h2>
      <main className="Card">
        <Paper elevation={3} style={{ paddingLeft: "10px" }}>
          {" "}
          <h1>{_.unescape(quizQuestions[currentIndex].question)}</h1>
        </Paper>
      </main>

      <section>
        <div className="Answer">{renderAnswer()}</div>

        <div className={classes.root}>
          <Grid container spacing={3}>
            {quizQuestions[currentIndex].options.map(
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
                    onClick={checkGivenAnswer}
                  >
                    {option}
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        </div>
        {/* <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                onClick={prevQuestionHander}
              >
                Prev Question
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                onClick={nextQuestionHander}
              >
                Next Question
              </Button>
            </Grid>
          </Grid>
        </div> */}
      </section>

      <QuizBackdrop
        open={showBackDrop}
        message={textMeassage}
        isCorrect={isCorrectAnswer}
        score={score}
        question={quizQuestions[currentIndex].question}
        options={quizQuestions[currentIndex].options}
        closeBackDrop={closeBackDrop}
        correctAnswer={quizQuestions[currentIndex].answer}
      />
    </div>
  ) : (
    <div>
      <main className="Card">
        <h3>
          You scored {score} / {quizQuestions.length}
        </h3>

        <button
          className="Button"
          type="reset"
          onClick={() => setState(initialState)}
        >
          Start Over
        </button>
      </main>
    </div>
  );
};

export default Card;
