import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultWeatherOptions } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import { getItems } from '../../utils/api'; 

function Main({ clothingItems, weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  console.log("Weather data in Main:", weatherData);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        defaultWeatherOptions={defaultWeatherOptions}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;/ You may
          want to wear:
        </p>

        <ul className="cards__list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))
          ) : (
            <p>No clothing items available for this weather.</p>
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
