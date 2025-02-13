import classes from "./URAuth.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/counter";

const URAuth = () => {
  const dispatch = useDispatch();

  const loginHandler = (event) => {
    event.preventDefault();

    // Dispatch login action defined in the redux store.
    dispatch(authActions.login());
  };
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default URAuth;
