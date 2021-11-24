import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

export default function QuizComponent(props) {
  const { courseName, subjectName, chapterName } = useParams();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState();
  const [length, setLength] = useState(0);
  const [questionBank, setQuestionBank] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswered, setUserAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  useEffect(() => {
    let quiz_question_details = {
      course: courseName,
      sub: subjectName,
      chap: chapterName,
    };
    const res = ipcRenderer.sendSync(
      "load-QuizQuestion",
      quiz_question_details
    );
    console.log(res);
    setQuestionBank(res);
    console.log(questionBank);
  }, []);

  const nextQuestionHander = () => {
    if (currentIndex != questionBank.length) setCurrentIndex(currentIndex + 1);
    console.log(currentIndex);
  };

  const prevQuestionHander = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    console.log(currentIndex);
  };

  const checkAnswer = (answer) => {
    console.log(answer);
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
    console.log(this.state.userAnswer);
  };
  const finishHandler = () => {
    if (this.state.currentIndex === this.state.length - 1) {
      submitExam();
    }
  };

  const timeOver = () => {
    alert("Exam time is Over the Exam will be submitted automatically");
    submitExam();
  };

  const submitExam = () => {};

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
                        <li className="breadcrumb-item active">Exam Name:</li>
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
                <div className="text-right">
                  <h3>
                    {minutes === 0 && seconds === 0 ? (
                      timeOver()
                    ) : (
                      <h1>
                        Time Remaining: {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </h1>
                    )}
                  </h3>
                </div>
                {/* <h2>{questionBank[currentIndex].question}</h2>
                <h2>{questionBank.length}</h2> */}

                <React.Fragment>
                  <p>{questionBank[0]}</p>
                  {questionBank[0].options.map(
                    (
                      option //for each option, new paragraph
                    ) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          name="selectedAnswer"
                          value=""
                          onClick={() => checkAnswer(option)}
                          type="radio"
                        />
                        <label className="form-check-label">{option}</label>
                      </div>
                    )
                  )}
                </React.Fragment>

                <div className="row">
                  {currentIndex > 0 && (
                    <div className="col-6 text-left">
                      <button
                        className="btn btn-warning"
                        disabled="false"
                        onClick={prevQuestionHander}
                      >
                        Prev Question
                      </button>
                    </div>
                  )}
                  {currentIndex < questionBank.length - 1 && (
                    <div className="col-6 text-right">
                      <button
                        className="btn btn-success"
                        disabled="false"
                        onClick={nextQuestionHander}
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="text-right">
                    {currentIndex < length - 1 && (
                      <React.Fragment>
                        <button
                          className="btn btn-success"
                          disabled={false}
                          onClick={finishHandler}
                        >
                          Finish
                        </button>
                      </React.Fragment>
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
