import { ref, set } from "firebase/database";
import { db } from "../firebase";

const updateOrCreateUser = async (email, name = '', coords = {}, places = []) => {
  if (!email) return;
  const userId = email.replace(/[.]/g, "-");
  return await set(ref(db, "users/" + userId), {
    email,
    username: name,
    coords,
    places,
  });
};
export default updateOrCreateUser;
