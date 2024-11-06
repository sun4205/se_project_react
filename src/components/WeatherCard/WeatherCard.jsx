import sunny from "../../assets/day/sunny.svg";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData, defaultWeatherOptions }) {
  console.log("WeatherCard Props:", weatherData, defaultWeatherOptions);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData?.isDay &&
      option.condition === weatherData?.condition
    );
  });

  console.log("Weather Data:", weatherData);
  console.log("Weather Options:", weatherOptions);

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData?.isDay ? "day" : "night"];
  } else {
    weatherOption = fliteredOptions[0];
  }
  console.log(weatherOptions[2].url);
  console.log("Selected weatherOption:", weatherOption);
  console.log("Image URL:", weatherOption?.url);
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData?.temp?.F} &deg; F</p>
      <img
        className={`weather-card__image ${
          weatherOption?.condition || "default-condition"
        }`}
        src={weatherOption?.url || "default-image-path"}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
      />
    </section>
  );
}

export default WeatherCard;
