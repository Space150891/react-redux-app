import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducers/auth";

import logInWithFirebase from "../../../api/login";
import getUserById from '../../../api/getUser';

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    const res = await logInWithFirebase(email, password);
    if (res) {
      getUserById(fullName).then((user) => {
        dispatch(setUser({ email: user.email, name: user.username }));
      }).catch((error) => console.error(error.message));
    }
  };

  const logInHandler = () => {
    if (email.length > 5 && password.length >= 8) {
      authenticateUser();
      setEmail("");
      setPassword("");
      setFullName("");
    }
  };
  return (
    <div className="sign-up">
      <span>Sign in</span>
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
      <button onClick={logInHandler}>Log in</button>
    </div>
  );
};
