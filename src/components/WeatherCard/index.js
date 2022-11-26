import logo from "../../logo.svg";
import styles from "./styles.module.css";

const WeatherCard = ({ weatherForecast }) => {
  const indexes = [
    0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108,
    114, 120, 126, 132, 138, 144, 150, 156, 162,
  ];
  const sunny = <span>&#9728;&#65039;</span>;
  const sunBehindSmallClouds = <span>&#127780;&#65039;</span>;
  const sunBehindLargeClouds = <span>&#127781;&#65039;</span>;
  const sunBehindRainCloud = <span>&#127782;&#65039;</span>;
  const cloudy = <span>&#9729;&#65039;</span>;
  const cloudWithRain = <span>&#127783;&#65039;</span>;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.card}>
      <h3>WEATHER FORECAST</h3>
      {!weatherForecast && <img src={logo} className="App-logo" alt="logo" />}
      <h4>IN {weatherForecast?.city?.toUpperCase()}</h4>
      {weatherForecast && (
        <div className={styles.week}>
          {indexes.map((index, i) => {
            let sky = sunny;
            if (
              weatherForecast.hourly.cloudcover[index] > 10 &&
              weatherForecast.hourly.cloudcover[index] < 50
            ) {
              sky = sunBehindSmallClouds;
            }
            if (
              weatherForecast.hourly.cloudcover[index] > 50 &&
              weatherForecast.hourly.cloudcover[index] < 90
            ) {
              if (weatherForecast.hourly.precipitation[index] > 1) {
                sky = sunBehindRainCloud;
              } else {
                sky = sunBehindLargeClouds;
              }
            }
            if (weatherForecast.hourly.cloudcover[index] === 100) {
              if (weatherForecast.hourly.precipitation[index] > 1) {
                sky = cloudWithRain;
              } else {
                sky = cloudy;
              }
            }
            let title = "Today";
            if (i > 3 && i < 8) {
              title = "Tomorrow";
            }
            if (i > 7) {
              title = "";
              const d = new Date(weatherForecast.hourly.time[index]);
              let day = d.getDay();
              title = weekday[day];
            }

            return (
              <div className={styles.row} key={i}>
                <div>{title}</div>
                {/* <div>{weatherForecast.hourly.time[index].slice(0, 10)}</div> */}
                <div>{weatherForecast.hourly.time[index].slice(11)}</div>
                <div className={styles.data}>
                  <span>{sky}</span>
                  <span>
                    {weatherForecast.hourly.temperature_2m[index]} &#8451;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default WeatherCard;
