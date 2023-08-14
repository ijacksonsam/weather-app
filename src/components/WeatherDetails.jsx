import styles from "./WeatherDetails.module.css";
import { flagemojiToPNG } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../utils";
import Loader from "./Loader";
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

// const weatherDetails = {
//   description: fetchDetails.weather.at(0).description,
//   icon: fetchDetails.weather.at(0).icon,
//   temp: fetchDetails.main.temp,
//   feels_like: fetchDetails.main.feels_like,
//   pressure: fetchDetails.main.pressure,
//   humidity: fetchDetails.main.humidity,
//   wind: fetchDetails.wind,
//   name: fetchDetails.name,
//   country: fetchDetails.sys.country,
// };

function WeatherDetails({ coordinates }) {
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  async function getWeatherDetails(coordinates) {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${API_KEY}&units=metric`
    );
    const fetchDetails = await data.json();
    const weatherDetails = {
      description: fetchDetails.weather.at(0).description,
      icon: fetchDetails.weather.at(0).icon,
      temp: fetchDetails.main.temp,
      feels_like: fetchDetails.main.feels_like,
      pressure: fetchDetails.main.pressure,
      humidity: fetchDetails.main.humidity,
      wind: fetchDetails.wind,
      name: fetchDetails.name,
      country: fetchDetails.sys.country,
    };
    setWeatherDetails(weatherDetails);
    setIsLoading(false);
  }
  useEffect(
    function () {
      if (!coordinates) navigate("/");
      else {
        try {
          getWeatherDetails(coordinates);
        } catch (e) {
          console.log(e);
        }
      }
    },
    [coordinates, navigate]
  );

  return (
    <div className={styles.card}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.details}>
          <button className={styles.backbtn} onClick={() => navigate(-1)}>
            &larr;
          </button>
          <div className={styles.city}>
            <h3>{weatherDetails.name} </h3>
            {flagemojiToPNG(weatherDetails.country)}
          </div>
          <div className={styles.iconTemp}>
            <h3>{weatherDetails.temp} &deg;C</h3>
            <img
              src="https://openweathermap.org/img/wn/10n@2x.png"
              alt="icon"
            />
          </div>
          <p className={styles.description}>{weatherDetails.description}</p>
          <p className={styles.description} style={{ marginTop: 0 }}>
            Feels like {weatherDetails.feels_like}&deg; C
          </p>
          <div className={styles.params}>
            <WeatherParam>
              <img
                src="https://cdn-icons-png.flaticon.com/128/8171/8171960.png"
                alt=""
              />
              <h4>Pressure</h4>
              <p>{weatherDetails.pressure} hPa</p>
            </WeatherParam>
            <WeatherParam>
              <img
                src="https://cdn-icons-png.flaticon.com/128/959/959711.png"
                alt=""
              />
              <h4>Wind Speed</h4>
              <p>{weatherDetails.wind.speed} m/s</p>
            </WeatherParam>
            <WeatherParam>
              <img
                src="https://cdn-icons-png.flaticon.com/128/8171/8171960.png"
                alt=""
              />
              <h4>Pressure</h4>
              <p>{weatherDetails.pressure} hPa</p>
            </WeatherParam>
            <WeatherParam>
              <img
                src="https://cdn-icons-png.flaticon.com/128/8171/8171960.png"
                alt=""
              />
              <h4>Pressure</h4>
              <p>{weatherDetails.pressure} hPa</p>
            </WeatherParam>
          </div>
        </div>
      )}
    </div>
  );
}

function WeatherParam({ children }) {
  return <div className={styles.param}>{children}</div>;
}

export default WeatherDetails;
