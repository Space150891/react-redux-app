import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

const signUpWithFirebase = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => res.user)
    .catch((err) => console.error(err.message));
};
export default signUpWithFirebase;
