import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { state, fetchWeatherAsync } from "./store/reducers/auth";
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch();
  const { user, weatherForecast } = useSelector(state);
  
  useEffect(() => {
    if(user) {
      const latitude = user.coords.latitude || 0
      const longitude = user.coords.longitude || 0
      if(latitude && longitude) {
        dispatch(fetchWeatherAsync({latitude, longitude}))        
      }
    }
  }, [user, dispatch]);

  return <Layout user={user} weatherForecast={weatherForecast} />;
}

export default App;
