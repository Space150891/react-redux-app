import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import { state, fetchLocationByPlace } from "../../store/reducers/auth";

const Header = ({ onLogOut, user }) => {
  const dispatch = useDispatch();
  const { places } = useSelector(state);
  const [place, setPlace] = useState("");
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    setCurrentUser(user)
  }, [user])
  
  useEffect(() => {
    if (currentUser && currentUser.email !== user.email) {
      const latitude = user.coords.latitude || 0;
      const longitude = user.coords.longitude || 0;
      if (latitude && longitude) {
        dispatch(
          // fetchLocationByPlace(`${latitude},${longitude}`)
        );
      }
    }
  }, [user, dispatch, currentUser]);
  
  const onFetchLocation = () => {
    dispatch(
      fetchLocationByPlace(place)
    );
  }
  return (
    <header className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          Welcome{" "}
          <span style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</span>
        </div>
        <div>
          <input
            id="place"
            name="place"
            type="input"
            placeholder="Type your place"
            value={place}
            onChange={(event) => setPlace(event.currentTarget.value)}
          />
          <Button style={{ width: 60 }} title="Save" onClick={onFetchLocation} />
        </div>
      </div>
      <Button style={{ width: 90 }} title="Log Out" onClick={onLogOut} />
    </header>
  );
};
export default Header;
