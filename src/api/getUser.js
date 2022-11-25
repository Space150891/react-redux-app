import { getDatabase, ref, get, child } from "firebase/database";

const getUserById = async (email) => {
  const dbRef = ref(getDatabase());
  const userId = email.replace(/[.]/g, "-");
  return get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export default getUserById;
