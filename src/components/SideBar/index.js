import PlaceCard from "../PlaceCard";
import styles from "./styles.module.css";

const SideBar = ({ places, user, weatherForecast }) => {
  return (
    <div className={styles.sidebar}>
      {user?.location && (
        <PlaceCard
          place={user.location}
          userLocation
          disabled={user.location?.city === weatherForecast?.city}
        />
      )}
      {places?.map((place, i) => (
        <PlaceCard
          key={i}
          place={place}
          disabled={place?.city === weatherForecast?.city}
        />
      ))}
    </div>
  );
};
export default SideBar;
