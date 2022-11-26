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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    setLoading(true);
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
                  setUser({ email: user.email, name: user.name, coords })
                );
                updateOrCreateUser(email, user.name, coords);
                setLoading(false);
              },
              (err) => {
                dispatch(setUser({ email, name: user.name }));
                setLoading(false);
                console.warn(`ERROR(${err.code}): ${err.message}`);
              }
            );
          } else {
            dispatch(setUser({ email: user.email, name: user.name }));
            setLoading(false);
            alert(
              "Geolocation is not supported by your browser. Please update your browser. Visit Help Center."
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again!");
    }
  };

  const logInHandler = () => {
    if (email.length > 5 && password.length >= 8) {
      authenticateUser();
      setEmail("");
      setPassword("");
    }
  };

  if (loading) return <span>Loading...</span>;

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
