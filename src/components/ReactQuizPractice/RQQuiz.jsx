/**
 * Component to switch between the questions and registering users answers.
 */
import { useState } from "react";
import QUESTIONS from "./questions.js";

export default function RQQuiz () {
  /* State to keep track of the current question.
     But we can also derive this from userAnswers state. So if we have
     2 userAnswers, then the current question will be 2. Hence commenting this. */
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // State to keep track of the users answers.
  const [userAnswers, setUserAnswers] = useState([]);

  // Deriving the current question index from the userAnswers state.
  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    // Updating answers, by preserving the old state/answers.
    setUserAnswers((prevUserAnswers) => {
      return [
        selectedAnswer,
        ...prevUserAnswers
      ];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
