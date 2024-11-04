import sunny from '../../assets/day/sunny.svg';
import './WeatherCard.css';

function WeatherCard({weatherData}){
    return(
        <section className = 'weather-card'>
            <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
            <img className='weather-card__img' src={sunny} alt="sunny" />
            </section>
    )
}

export default WeatherCard;