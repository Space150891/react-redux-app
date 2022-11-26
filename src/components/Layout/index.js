import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header";
import SideBar from "../SideBar";
import WeatherCard from "../WeatherCard";
import { Auth } from "../../pages/Auth";
import { state, logOut, fetchWeatherForecast } from "../../store/reducers/auth";
import logOutWithFirebase from "../../api/logout";

function Layout() {
  const dispatch = useDispatch();
  const { places, user, weatherForecast } = useSelector(state);

  useEffect(() => {
    if(user?.location) {
      const latitude = user.location.latitude || 0
      const longitude = user.location.longitude || 0
      if(latitude && longitude) {
        dispatch(fetchWeatherForecast({latitude, longitude, city: user.location.city}))        
      }
    }
  }, [user, dispatch]);
  
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
          <div style={{ display: "flex" }}>
            <SideBar places={places} user={user} weatherForecast={weatherForecast} />
            <WeatherCard weatherForecast={weatherForecast} />
          </div>
        </>
      )}
    </>
  );
}

export default Layout;
