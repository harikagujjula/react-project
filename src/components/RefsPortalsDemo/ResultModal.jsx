export default function ResultModal({ ref, result, targetTime}) {
  // We want to show the result based on time from TimerChallenge comp, 
  // in a modal in ResultModal comp. And here we can use ref.
  return <dialog ref={ref} className="result-modal" open>
    <h2>You {result}</h2>
    <p>Target time was: {targetTime} seconds.</p>
    <p>You stopped timer with <strong>X</strong> seconds left. </p>
    {/* When we add a form with method set to dialog, button that submits the 
    form will close the modal without any extra js. */}
    <form method="dialog">
      <button>Close</button>
    </form>
  </dialog>
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