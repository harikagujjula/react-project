import RPPlayer from "./RPPlayer";
import './RefsPortalsDemo.css';
import TimerChalenge from "./TimerChallenge";

function RefsPortalsDemo() {
  return (
    <>
      <RPPlayer />
      <div id="challenges">
        <TimerChalenge title="Easy" targetTime={1}/>
        <TimerChalenge title="Not Easy" targetTime={5}/>
        <TimerChalenge title="Getting Tough" targetTime={10}/>
        <TimerChalenge title="For Pros" targetTime={15}/>
      </div>
    </>
  );
}

export default RefsPortalsDemo;