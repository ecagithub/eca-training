import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "./quizCard";
const { ipcRenderer } = window.require("electron");

export default function Container() {
  // Below is one way state is set using React Hooks, where the first deconstructed variable`quizzes` is the state variable name
  // and `setQuizzes` is the methodName called to update the quizzes state if needed. Here, use it after the data is fetched successfully.
  const [quizzes, setQuizzes] = useState([]);
  const [shouldShowCards, setShouldShowCards] = useState(false);
  const { courseName, subjectName, chapterName } = useParams();

  // useEffect is a React hook that allows side effects in function components and enables the React Lifecycle Method (RLM)
  // componenDidMount(), componentDidUpdate(), and componentWillUnmount() lifecycles combined. See more about
  // the [React useEffect() Hook](https://reactjs.org/docs/hooks-effect.html) in the docs.
  useEffect(async () => {
    let quiz_question_details = {
      course: courseName,
      sub: subjectName,
      chap: chapterName,
    };
    const res = await ipcRenderer.sendSync(
      "load-QuizQuestion",
      quiz_question_details
    );
    setQuizzes(res);
  }, []);

  const handleButtonClick = () => {
    setShouldShowCards(true);
  };

  return (
    <main className="Main">
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
        <Card quizQuestions={quizzes} />
      )}
    </main>
  );
}
