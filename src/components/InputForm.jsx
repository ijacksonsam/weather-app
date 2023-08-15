/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./InputForm.module.css";
import { API_KEY, flagemojiToPNG } from "../utils";
import { useNavigate } from "react-router-dom";

function InputForm({ onSubmit }) {
  const [value, setValue] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  async function fetchCity(city) {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      );
      const cities = await data.json();
      setCities(cities);
    } catch (e) {
      if (e.name === "AbortError") return;
      console.log(e);
    }
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchCities(city) {
        try {
          const data = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
            { signal: controller.signal }
          );
          const cities = await data.json();
          setCities(cities);
        } catch (e) {
          if (e.name === "AbortError") return;
          console.log(e);
        }
      }
      if (value) fetchCities(value);
      else setCities([]);

      return function () {
        controller.abort();
      };
    },
    [value]
  );

  function handleSubmit(e) {
    e.preventDefault();
    fetchCity(value);
    onSubmit({ lat: cities.at(0).lat, lng: cities.at(0).lon });
    navigate(`/weather/${value}`);
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Search for the city</h1>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter city name ..."
        />
        <CitiesList cities={cities} setValue={setValue} />
        <button>Search</button>
      </form>
    </div>
  );
}

function CitiesList({ cities, setValue }) {
  return (
    <div className={styles.cities}>
      {cities.length > 0 &&
        cities.map((city, i) => (
          <City city={city} setValue={setValue} key={i} />
        ))}
    </div>
  );
}

function City({ city, setValue }) {
  function handleClick(city) {
    setValue(city.name);
  }
  return (
    <div className={styles.city} onClick={() => handleClick(city)}>
      <p>{city.name}</p>
      {flagemojiToPNG(city.country)}
    </div>
  );
}

export default InputForm;
