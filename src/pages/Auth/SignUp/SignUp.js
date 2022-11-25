import React, { useState } from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducers/auth";
import signUpWithFirebase from "../../../api/signup";
import updateOrCreateUser from "../../../api/updateOrCreateUser";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();

  const signUpHandler = async () => {
    if (email.length > 5 && password.length >= 8) {
      const user = await signUpWithFirebase(email, password);
      if (user) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const crd = pos.coords;
              const coords = {
                latitude: crd.latitude,
                longitude: crd.longitude,
              };
              updateOrCreateUser(email, fullName, coords).then(() => {
                dispatch(setUser({ email, name: fullName, coords }));
              });
            },
            (err) => {
              dispatch(setUser({ email, name: fullName }));
              console.warn(`ERROR(${err.code}): ${err.message}`);
            }
          );
        } else {
          dispatch(setUser({ email, name: fullName }));
          alert(
            "Geolocation is not supported by your browser. Please update your browser. Visit Help Center."
          );
        }
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
      <Button title="Sign Up" onClick={signUpHandler} />
    </div>
  );
};
