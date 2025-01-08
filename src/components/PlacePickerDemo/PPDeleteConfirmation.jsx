import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;
export default function PPDeleteConfirmation({ onConfirm, onCancel }) {
  // Moved Progress bar related code to a separate component ProgressBar.jsx.

  /* We are trying to set a timer to simulate a delay for the user to confirm
  the deletion. But once the timer is set, it still runs in the background and there
  is no way to quit the timer. useEffect() also provides Cleanup function to
  perform such tasks. */
  // setTimeout(() => {
  //   console.log("Timer");
  //   // Executes the function passed to onConfirm after 3 seconds.
  //   onConfirm();
  // }, 3000);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Timer");
      // Executes the function passed to onConfirm after 3 seconds.
      onConfirm();
    }, TIMER);

    /* Cleaning up using useEffect() will be triggered right before the next execution of
      useEffect() or when the component is dismounted/removed from the DOM.

      We define cleanup function by returning it from inside the useEffect(). */
    return () => {
      console.log("Cleanup");
      clearTimeout(timer);
    }
    /* Passing onConfirm() as value to useEffect() as a dependency that will make
     sure that the useEffect()is executed only when onConfirm() changes.
     But passing functions as value to useEffect is not recommended as it might
     end up in infinite loop. This is because in javascript, functions are objects.
     And even though its the same code inside the function, 2 function objects are never equal.
     Hence, the useEffect() will be executed everytime as it thinks the
     dependencies are changed eventhough its the same function/object.
     To overcome this, we can make use of useCallback() hook.

     useCallback() hook is used to make sure the function is not recreatead
     everytime, rather stored and re-used.
    */
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* Moving ProgressBar to a separate component. */}
      <ProgressBar timer={TIMER} />
    </div>
  );
}
