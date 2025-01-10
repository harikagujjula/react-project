import RQQuestionTimer from "./RQQuestionTimer";
import RQAnswers from "./RQAnswers";
import QUESTIONS from "./questions";
import { useState } from "react";

export default function RQQuestion({ index, onSelectAnswer, onSkipAnswer }) {

  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  // Trying to rebuild the Question component when an answer is selected and
  //  when answere selected is correct, so that user can get enough time to see the correct answer.
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  }
  return (
    <div id="question">
      {/* On timeout record as no answer, hence null is passed as parameter for handleSelectAnwser(). */}
      {/* The Quiz component gets recreated for every question, But the
      RQQuestionTimer will not be recreated as nothing is changed with the
      component. However, we want the timer to reset/recreate on re-creation
      of Quiz component. One simple trick is we can set an key index that is
      avaiable for any element/component in react similar to <li>. When the key
      changes, the component will be de-mounted and re-mounted. */}
      <RQQuestionTimer key={timer} timeout={timer} onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState}/>
      <h2>{QUESTIONS[index].text}</h2>

      {/* Moving Answers to another component. */}
      <RQAnswers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}/>
      </div>
  );
}
