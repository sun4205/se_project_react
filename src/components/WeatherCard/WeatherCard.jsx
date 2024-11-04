import sunny from "../../assets/day/sunny.svg";
import { weatherOptions,defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData, defaultWeatherOptions}) {
  const fliteredOptions = weatherOptions.filter((option) => {
    return (
      option.day == weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if(fliteredOptions.length === 0){
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  }else{
     weatherOption = fliteredOptions[0];
  }

  
//   const weatherOptionUrl = fliteredOptions[0]?.url;
//   const weatherOptioncondition = fliteredOptions[0]?.condition;
//   const weatherOptionDay = fliteredOptions[0]?.day;

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img
        className={weatherOption?.url}
        src={sunny}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${weatherOption?.condition} weather`}
      />
    </section>
  );
}

export default WeatherCard;
