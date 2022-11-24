import { getDatabase, ref, get, child } from "firebase/database";

const getUserById = async(name) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `users/${name}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
};
export default getUserById;
