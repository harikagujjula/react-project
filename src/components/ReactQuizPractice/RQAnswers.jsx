import { useRef } from 'react';

export default function RQAnswers ({ answers, selectedAnswer, answerState, onSelect }) {
  // Using Ref to maintain shuffled answers instead of a constant. Without this,
  //  we might see the answers shuffling everytime an answer is selected and we
  //  did not move to the next question yet.
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // Shuffle the aswers if the quiz is not complete.
    shuffledAnswers.current = [...answers];
    // Randomly shuffling the answers using sort. -1 swaps and 1 doesn't swap the items.
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = '';

        // The selected answer is the last element in the userAnswers array
        //  and comparing it with the current answer from the list.
        const isSelectedAnswer = selectedAnswer === answer;

        // Checking if the answer is correct or wrong and setting the color accordingly.
        if (answerState === 'answered' && isSelectedAnswer) {
          // Setting the color to selected.
          cssClass = 'selected';
        }

        if ((answerState === 'correct' || answerState === 'wrong') && isSelectedAnswer) {
          // Setting the color to green or red if correct or wrong.
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ''}>
                {answer}
            </button>
          </li>
        );

      })}
    </ul>
  );
}
