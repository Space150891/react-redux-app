import { useDispatch } from "react-redux";
import Header from "../Header";
import { Auth } from "../../pages/Auth";
import { logOut } from "../../store/reducers/auth";
import logOutWithFirebase from "../../api/logout";

function Layout({ user }) {
  const dispatch = useDispatch();

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Header
            user={user}
            onLogOut={() => {
              logOutWithFirebase();
              dispatch(logOut());
            }}
          />
        </>
      )}
    </>
  );
}

export default Layout;
