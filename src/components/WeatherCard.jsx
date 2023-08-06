import { Outlet } from "react-router-dom";
import styles from "./WeatherCard.module.css";
function WeatherCard() {
  return (
    <div className={styles.card}>
      <Outlet />
    </div>
  );
}

export default WeatherCard;
