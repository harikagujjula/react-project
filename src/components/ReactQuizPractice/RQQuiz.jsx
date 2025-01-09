/**
 * Component to switch between the questions and registering users answers.
 */
import { useCallback, useState } from "react";
import QUESTIONS from "./questions.js";
import quizCompletedImg from "./assets/quiz-complete.png";
import RQQuestionTimer from "./RQQuestionTimer.jsx";

export default function RQQuiz () {
  /* State to keep track of the current question.
     But we can also derive this from userAnswers state. So if we have
     2 userAnswers, then the current question will be 2. Hence commenting this. */
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // State to keep track of the users answers.
  const [userAnswers, setUserAnswers] = useState([]);

  // Deriving the current question index from the userAnswers state.
  const activeQuestionIndex = userAnswers.length;

  // Checking if the quiz is complete.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(  function handleSelectAnswer(selectedAnswer) {
    // Updating answers, by preserving the old state/answers.
    setUserAnswers((prevUserAnswers) => {
      return [
        selectedAnswer,
        ...prevUserAnswers
      ];
    });
    // No dependencies required as state updating function can be handled by React.
  }, []);

  // RQQuestionTimer is re-rendering everytime because onTimeOut function is
  // passed as depedency and it is considered as a new function everytime.
  // Adding handleSelectAnswer as dependency as it is used inside the useCallBack() which is dealing with state.
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Quiz completed"/>
        <h2>Quiz completed.</h2>
      </div>
    );
  }

  // Shuffle the aswers if the quiz is not complete.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // Randomly shuffling the answers using sort. -1 swaps and 1 doesn't swap the items.
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* On timeout record as no answer, hence null is passed as parameter for handleSelectAnwser(). */}
        {/* The Quiz component gets recreated for every question, But the
        RQQuestionTimer will not be recreated as nothing is changed with the
        component. However, we want the timer to reset/recreate on re-creation
        of Quiz component. One simple trick is we can set an key index that is
        avaiable for any element/component in react similar to <li>. When the key
        changes, the component will be de-mounted and re-mounted. */}
        <RQQuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
