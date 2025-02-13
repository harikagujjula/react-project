import URCounter from "./URCounter";
// import URCounterClassBased from "./URCounterClassBased";
import { useSelector } from "react-redux";

import URAuth from "./URAuth";
import URHeader from "./URHeader";
import URUserProfile from "./URUserProfile";

export default function UsingReduxDemo() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {/* <URCounterClassBased /> */}
      {/* Adding multiple components. */}
      <URHeader />
      {!isAuth && <URAuth />}
      {isAuth && <URUserProfile />}
      <URCounter />
    </>
  );
}
