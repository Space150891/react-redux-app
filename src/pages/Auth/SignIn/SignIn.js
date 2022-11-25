import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import { setUser } from "../../../store/reducers/auth";
import logInWithFirebase from "../../../api/login";
import getUserById from "../../../api/getUser";
import updateOrCreateUser from "../../../api/updateOrCreateUser";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    const res = await logInWithFirebase(email, password);
    if (res) {
      getUserById(email)
        .then((user) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const crd = pos.coords;
                const coords = {
                  latitude: crd.latitude,
                  longitude: crd.longitude,
                };
                dispatch(
                  setUser({ email: user.email, name: user.username, coords })
                );
                updateOrCreateUser(email, user.username, coords);
              },
              (err) => {
                dispatch(setUser({ email, name: user.username }));
                console.warn(`ERROR(${err.code}): ${err.message}`);
              }
            );
          } else {
            dispatch(setUser({ email: user.email, name: user.username }));
            alert(
              "Geolocation is not supported by your browser. Please update your browser. Visit Help Center."
            );
          }
        })
        .catch((error) => console.error(error.message));
    }
  };

  const logInHandler = () => {
    if (email.length > 5 && password.length >= 8) {
      authenticateUser();
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="sign-up">
      <span>Sign in</span>
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
      <Button title="Log in" onClick={logInHandler} />
    </div>
  );
};
