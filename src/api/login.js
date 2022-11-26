import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const logInWithFirebase = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((res) => res.user)
    .catch((err) => console.error(err.message));
};

export default logInWithFirebase;
