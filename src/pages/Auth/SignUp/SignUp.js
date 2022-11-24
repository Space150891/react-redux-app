import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducers/auth";
import signUpWithFirebase from "../../../api/signup";
import updateOrCreateUser from '../../../api/updateOrCreateUser';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  const dispatch = useDispatch();

  const signUpHandler = async () => {
    if (email.length > 5 && password.length >= 8) {
      const user = await signUpWithFirebase(email, password);
      if (user) {
        updateOrCreateUser(fullName, email).then(() => {
          dispatch(setUser({ email: email, name: fullName }));
        })
      }
    }
  };

  return (
    <div className="sign-up">
      <span>Sign up</span>
      <input
        id="fullName"
        name="fullName"
        type="input"
        placeholder="Full Name"
        value={fullName}
        onChange={(event) => setFullName(event.currentTarget.value)}
      />
      <input
        id="email"
        name="email"
        type="input"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <button onClick={signUpHandler}>Create new user</button>
    </div>
  );
};
