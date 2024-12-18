import RPPlayer from "./RPPlayer";
import './RefsPortalsDemo.css';
import TimerChalenge from "./TimerChallenge";
import RefsForm from "./RefsForm";
import { useRef } from "react";

function RefsPortalsDemo() {
  const ref = useRef();

  // Button Restart click.
  function handleRestart() {
    // calling clear() method exposed by form ref using useImperativeHandle hook in RefsForm.jsx.
    ref.current.clear();
  }

  return (
    <>
      {/* Usage of refs, forwardRef */}
      <RPPlayer />
      <div id="challenges">
        <TimerChalenge title="Easy" targetTime={1}/>
        <TimerChalenge title="Not Easy" targetTime={5}/>
        <TimerChalenge title="Getting Tough" targetTime={10}/>
        <TimerChalenge title="For Pros" targetTime={15}/>
      </div>
      {/* Usage of useImepratieHandle hook. */}
      <div id="use-imperative-handle-demo">
        <button onClick={handleRestart}>Restart</button>
        <RefsForm ref={ref}/>
      </div>
    </>
  );
}

export default RefsPortalsDemo;