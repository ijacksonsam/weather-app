import Header from "./components/Header";
import InputForm from "./components/InputForm";
import WeatherCard from "./components/WeatherCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";

const API_KEY = "2d4c650292c84ef7ef1b01348fa8a426";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherCard />}>
            <Route path="form" element={<InputForm />} />
            <Route path="weather" element={<WeatherDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
