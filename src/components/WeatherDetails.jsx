import styles from "./WeatherDetails.module.css";
import { flagemojiToPNG } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY } from "../utils";
import Loader from "./Loader";

function WeatherDetails({ coordinates }) {
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
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
      rain: fetchDetails.rain?.["1h"] || 0,
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
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.details}>
          <button className={styles.backbtn} onClick={() => navigate(-1)}>
            &larr;
          </button>
          <div className={styles.city}>
            <h3>{id} </h3>
            {flagemojiToPNG(weatherDetails.country)}
          </div>
          <div className={styles.iconTemp}>
            <h3>{weatherDetails.temp} &deg;C</h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherDetails.icon}.png`}
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
                src="https://cdn-icons-png.flaticon.com/128/5664/5664979.png"
                alt=""
              />
              <h4>Humidity</h4>
              <p>{weatherDetails.humidity} %</p>
            </WeatherParam>
            <WeatherParam>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3313/3313888.png"
                alt=""
              />
              <h4>Rain</h4>
              <p>{weatherDetails.rain} mm</p>
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
