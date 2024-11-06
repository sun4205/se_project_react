import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultWeatherOptions } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick }) {
  console.log("Weather data in Main:", weatherData);
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        defaultWeatherOptions={defaultWeatherOptions}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg;/ You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
