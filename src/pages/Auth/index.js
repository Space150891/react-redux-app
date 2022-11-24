import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import "../../App.css";
import logo from "../../logo.svg";

export const Auth = () => {
  const [signUp, setSignUp] = useState(false);

  const changeSignUpHandler = () => {
    setSignUp((prev) => !prev);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {signUp ? <SignUp /> : <SignIn />}
        <span
          style={{ fontSize: 12, marginTop: 20 }}
          onClick={changeSignUpHandler}
        >
          {signUp ? "Log in instead" : "Create new user"}
        </span>
      </header>
    </div>
  );
};
