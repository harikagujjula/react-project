import { createPortal } from 'react-dom';

export default function ResultModal({ ref, remainingTime, targetTime, onReset }) {
  const userLost = remainingTime <= 0;
  // Formatting Remaining time to seconds with 2 decimals.
  const formattedRemainingTime = (remainingTime/1000).toFixed(2);
  // Adding a score oto show when user wins.
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  {/* We want to show the result based on time from TimerChallenge comp, 
  in a modal in ResultModal comp. And here we can use ref.
    Note that the dialog can be closed with ESC key. So onReset will not be 
  triggered unless its a click of close. To make it work with ESC, use onClose */}

  {/* Using createPortal to render the dialog in the div section "#modal" rather 
   than as per the actual components structure, for accessibility. */}
  return createPortal(
    <dialog ref={ref} className="result-modal" onClose={onReset}>
    { userLost && <h2>You lost</h2> }
    { !userLost && <h2>Your score: {score}</h2>}
    <p>Target time was: {targetTime} seconds.</p>
    <p>You stopped timer with <strong>{formattedRemainingTime}</strong> seconds left. </p>
    {/* When we add a form with method set to dialog, button that submits the 
    form will close the modal without any extra js. */}
    <form method="dialog" onSubmit={onReset}>
      <button>Close</button>
    </form>
  </dialog>,
  document.getElementById("refs-modal")
  );
}

  /* Note that the ref here with React anything older than 19, will throw an 
   error saying ref cannot be used as prop. To achieve that with older versions, 
   we have to import forwardRef and wrap the function with forwardRef that 
   receives ref prop as the second parameter. Below is the version that could 
   work with both older and new versions of React.*/

// import { forwardRef } from "react";
// const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
//   return <dialog ref={ref} className="result-modal" open>
//     <h2>You {result}</h2>
//     <p>Target time was: {targetTime} seconds.</p>
//     <p>You stopped timer with <strong>X</strong> seconds left. </p>
//     {/* When we add a form with method set to dialog, button that submits the 
//     form will close the modal without any extra js. */}
//     <form method="dialog">
//       <button>Close</button>
//     </form>
//   </dialog>
// });

// export default ResultModal;