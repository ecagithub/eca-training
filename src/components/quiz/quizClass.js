import React, { Component } from "react";
const { ipcRenderer } = window.require("electron");
class ExamQuestions extends Component {
  constructor() {
    super();
    this.state = {
      ExamName: "",
      questionBank: [],
      userAnswer: null, //current users answer
      currentIndex: 0, //current questions index
      options: [], //the four options
      quizEnd: false, //determines if it's the last question
      score: 0, //holds the score
      disabled: true, // determines the status of the buttons
      isOpen: false,
      setIsOpen: false,
      previewQuestion: [],
      userAnswered: [],
      minutes: 5,
      seconds: 0,
    };
  }

  componentDidMount() {
    let quiz_question_details = {
      course: this.props.match.params.courseName,
      sub: this.props.match.params.subjectName,
      chap: this.props.match.params.chapterName,
    };
    const res = ipcRenderer.sendSync(
      "load-QuizQuestion",
      quiz_question_details
    );
    console.log(res);
    if (res !== undefined) {
      this.setState(
        {
          questionBank: res,
        },
        () => {
          this.loadQuiz();
        }
      );
    }

    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  showModal = () => {
    console.log("show modal");
    this.setState({ setIsOpen: true });
  };

  hideModal = () => {
    this.setState({ setIsOpen: false });
  };

  loadQuiz = () => {
    const { currentIndex } = this.state; //get the current question index
    //this.setState({ currentIndex: this.state.currentIndex + 1 })
    console.log(this.state.currentIndex);
    console.log(currentIndex);
    this.setState(() => {
      return {
        question: this.state.questionBank[currentIndex].question,
        options: this.state.questionBank[currentIndex].options,
        answer: this.state.questionBank[currentIndex].answer,
        length: this.state.questionBank.length,
      };
    });
  };
  nextQuestionHander = () => {
    const { userAnswer, answer, score } = this.state;
    console.log(this.state.options[answer - 1]);
    this.setState({
      userAnswered: [
        ...this.state.userAnswered,
        this.state.options[answer - 1],
      ],
    });
    console.log(this.state.userAnswered);
    // // let {currentIndex} = this.state
    //  currentIndex = currentIndex + 1;
    //console.log(currentIndex)
    this.setState(
      {
        currentIndex: this.state.currentIndex + 1,
      },
      () => {
        this.loadQuiz();
      }
    );
    console.log(this.state.currentIndex);
    if (userAnswer === this.state.options[answer - 1]) {
      this.setState({
        score: score + 1,
      });
      console.log("Score" + this.state.score);
    }
  };

  prevQuestionHander = () => {
    const { userAnswer, answer, score, currentIndex } = this.state;
    this.setState(
      {
        currentIndex: currentIndex - 1,
      },
      () => {
        this.loadQuiz();
      }
    );
    console.log(this.state.currentIndex);
  };

  checkAnswer = (answer) => {
    console.log(answer);
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
    console.log(this.state.userAnswer);
  };
  finishHandler = () => {
    if (this.state.currentIndex === this.state.length - 1) {
      this.sunmitExam();
    }
  };

  timeOver = () => {
    alert("Exam time is Over the Exam will be submitted automatically");
    this.sunmitExam();
  };

  sunmitExam = () => {};

  render() {
    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 10 };
    const timeout = false;
    const {
      question,
      options,
      currentIndex,
      userAnswer,
      quizEnd,
      length,
      ExamName,
    } = this.state; //get the current state
    if (quizEnd) {
      return (
        <React.Fragment>
          <div>
            <div className="wrapper">
              <div className="content-wrapper">
                <div className="content-header">
                  <div className="container-fluid">
                    <div className="row mb-2">
                      <div className="col-sm-6">
                        <h1 className="m-0">Dashboard</h1>
                      </div>
                      <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                          <li className="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>
                          <li className="breadcrumb-item active">
                            Exam Name: {ExamName}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <p>Thank You have Successfully submitted the Exam</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Dashboard</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Exam Name:</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  {" "}
                  <div className="text-right">
                    <h3>
                      {this.state.minutes === 0 && this.state.seconds === 0 ? (
                        this.timeOver()
                      ) : (
                        <h1>
                          Time Remaining: {this.state.minutes}:
                          {this.state.seconds < 10
                            ? `0${this.state.seconds}`
                            : this.state.seconds}
                        </h1>
                      )}
                    </h3>
                  </div>
                  <h2>{question}</h2>
                  <span>{`Question ${currentIndex + 1} of ${length}`}</span>
                  {options.map(
                    (
                      option //for each option, new paragraph
                    ) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          name="selectedAnswer"
                          value=""
                          onClick={() => this.checkAnswer(option)}
                          type="radio"
                        />
                        <label className="form-check-label">{option}</label>
                      </div>
                    )
                  )}
                  <div className="row">
                    {currentIndex > 0 && (
                      <div className="col-6 text-left">
                        <button
                          className="btn btn-warning"
                          disabled={this.state.disabled}
                          onClick={this.prevQuestionHander}
                        >
                          Prev Question
                        </button>
                      </div>
                    )}
                    {currentIndex < length - 1 && (
                      <div className="col-6 text-right">
                        <button
                          className="btn btn-success"
                          disabled={this.state.disabled}
                          onClick={this.nextQuestionHander}
                        >
                          Next Question
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="text-right">
                      {currentIndex === length && (
                        <div>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={this.showModal}
                          >
                            Preview
                          </button>

                          <button
                            className="btn btn-success"
                            disabled={this.state.disabled}
                            onClick={this.finishHandler}
                          >
                            Finish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ExamQuestions;
