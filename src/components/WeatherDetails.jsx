import styles from "./WeatherDetails.module.css";
import { flagemojiToPNG } from "../utils";
const fetchDetails = {
  coord: {
    lon: 92.8,
    lat: 24.8167,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 29.73,
    feels_like: 35.82,
    temp_min: 29.73,
    temp_max: 29.73,
    pressure: 1007,
    humidity: 76,
    sea_level: 1007,
    grnd_level: 1004,
  },
  visibility: 10000,
  wind: {
    speed: 1.65,
    deg: 233,
    gust: 3.35,
  },
  clouds: {
    all: 100,
  },
  dt: 1691210238,
  sys: {
    country: "IN",
    sunrise: 1691191092,
    sunset: 1691238689,
  },
  timezone: 19800,
  id: 1256287,
  name: "Silchar",
  cod: 200,
};

const weatherDetails = {
  main: "Clouds",
  description: "overcast clouds",
  icon: "04d",
  temp: 29.73,
  feels_like: 35.82,
  pressure: 1007,
  humidity: 76,
  wind: {
    speed: 1.65,
    deg: 233,
    gust: 3.35,
  },
  name: "Silchar",
  country: "IN",
};

function WeatherDetails() {
  return (
    <div className={styles.details}>
      <div className={styles.city}>
        <h3>{weatherDetails.name} </h3>
        {flagemojiToPNG(weatherDetails.country)}
      </div>
      <div className={styles.iconTemp}>
        <h3>{weatherDetails.temp} &deg;C</h3>
        <img src="https://openweathermap.org/img/wn/10n@2x.png" alt="icon" />
      </div>
      <p className={styles.description}>{weatherDetails.description}</p>
      <p className={styles.description} style={{ marginTop: 0 }}>
        Feels like {weatherDetails.feels_like}&deg; C
      </p>
      <div className={styles.params}>
        <WeatherParam></WeatherParam>
      </div>
    </div>
  );
}

function WeatherParam({ children }) {
  return <div className={styles.param}>{children}</div>;
}

export default WeatherDetails;
