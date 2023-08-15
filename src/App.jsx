import Header from "./components/Header";
import InputForm from "./components/InputForm";
import WeatherCard from "./components/WeatherCard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import WeatherDetails from "./components/WeatherDetails";
import { useState } from "react";

function App() {
  const [coordinates, setCoordinates] = useState();

  function handleSubmit(coordinates) {
    setCoordinates(coordinates);
  }

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherCard />}>
            <Route index element={<InputForm onSubmit={handleSubmit} />} />
            <Route
              path="weather/:id"
              element={<WeatherDetails coordinates={coordinates} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
