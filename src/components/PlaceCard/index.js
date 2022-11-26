import { useDispatch } from "react-redux";
import { removePlace, fetchWeatherForecast } from "../../store/reducers/auth";
import styles from "./styles.module.css";

const PlaceCard = ({ place, userLocation, disabled }) => {
  const dispatch = useDispatch();

  const onRemovePlace = () => {
    dispatch(
      removePlace({ latitude: place.latitude, longitude: place.longitude })
    );
  };
  const onShowWeather = () => {
    dispatch(
      fetchWeatherForecast({
        latitude: place.latitude,
        longitude: place.longitude,
        city: place.city,
      })
    );
  };

  if(!place) return null;
  
  return (
    <div className={styles.placeCard} style={disabled ? {backgroundColor: 'cadetblue'} : {}}>
      {userLocation && <div>USER LOCATION</div>}
      <span>{place.city}</span> - <span>{place.country}</span>
      <div>
        Coords: <span>{place.latitude}</span>,<span>{place.longitude}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {!disabled && (
          <div
            className={styles.placeBtn}
            style={{ backgroundColor: "aqua" }}
            onClick={onShowWeather}
          >
            Show weather
          </div>
        )}
        {!userLocation && (
          <div
            className={styles.placeBtn}
            style={{ backgroundColor: "deeppink" }}
            onClick={onRemovePlace}
          >
            Remove
          </div>
        )}
      </div>
    </div>
  );
};
export default PlaceCard;
