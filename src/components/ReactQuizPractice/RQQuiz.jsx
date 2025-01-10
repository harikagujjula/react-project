/**
 * Component to switch between the questions and registering users answers.
 */
import { useCallback, useState } from "react";
import QUESTIONS from "./questions.js";
import RQQuestion from "./RQQuestion.jsx";
import RQSummary from "./RQSummary.jsx";

export default function RQQuiz () {
  /* State to keep track of the current question.
     But we can also derive this from userAnswers state. So if we have
     2 userAnswers, then the current question will be 2. Hence commenting this. */
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // State to keep track of the users answers.
  const [userAnswers, setUserAnswers] = useState([]);

  // Deriving the current question index from the userAnswers state.
  const activeQuestionIndex =  userAnswers.length;

  // Checking if the quiz is complete.
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    // Updating answers, by preserving the old state/answers.
    setUserAnswers((prevUserAnswers) => {
      return [
        ...prevUserAnswers,
        selectedAnswer
      ];
    });
  }, []);

  // RQQuestionTimer is re-rendering everytime because onTimeOut function is
  // passed as depedency and it is considered as a new function everytime.
  // Adding handleSelectAnswer as dependency as it is used inside the useCallBack() which is dealing with state.
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (<RQSummary userAnswers={userAnswers}/>);
  }

  return (
    <div id="quiz">
      <RQQuestion
        // Using key prop for RQQuestion instead of having 2 same keys for the
        //  inner components RQQuestionTimer and RQAnswers.
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer= {handleSelectAnswer}
        onSkipAnswer = {handleSkipAnswer}/>
    </div>
  );
}
