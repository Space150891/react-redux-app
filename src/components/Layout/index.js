import { useSelector, useDispatch } from "react-redux";
import { Auth } from "../../pages/Auth";
import { state, logOut } from "../../store/reducers/auth";
import logOutWithFirebase from "../../api/logout";

function Layout() {
  const dispatch = useDispatch();
  const { user } = useSelector(state);

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <button
          onClick={() => {
            logOutWithFirebase();
            dispatch(logOut());
          }}
        >
          Log Out
        </button>
      )}
    </>
  );
}

export default Layout;
