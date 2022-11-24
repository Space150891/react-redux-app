import { ref, set } from "firebase/database";
import { db } from "../firebase";

const updateOrCreateUser = (name , email, places = []) => {
  if(!name || !email) return
  set(ref(db, "users/" + name), {
    username: name,
    email,
    places
  });
};
export default updateOrCreateUser;
