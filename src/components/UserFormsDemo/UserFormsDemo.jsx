import UFHeader from "./UFHeader";
import UFLoginUsingState from "./UFLoginUsingState";
// import UFLogin from "./UFLogin";
// import UFSignUp from "./UFSignUp";
import "./UserFormsDemo.css";

export default function UserFormsDemo() {
  return (
    <>
      <UFHeader />
      <main>
        {/* <UFLogin /> */}
        <UFLoginUsingState />
        {/* <UFSignUp /> */}
      </main>
    </>
  );

}
