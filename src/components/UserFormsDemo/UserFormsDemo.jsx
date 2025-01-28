import UFHeader from "./UFHeader";
// import UFLogin from "./UFLoginUsingState";
import UFSignUp from "./UFSignUp";
import "./UserFormsDemo.css";

export default function UserFormsDemo() {
  return (
    <>
      <UFHeader />
      <main>
        {/* <UFLogin /> */}
        <UFSignUp />
      </main>
    </>
  );

}
