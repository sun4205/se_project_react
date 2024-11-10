import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../../ToggleSwich/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      
      <div className="header__controls">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          +Add clothes
        </button>
      </div>

      <div className="header__user-container">
        <p className="header__userName">Terrence Tegegine</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegine" />
      </div>
    </header>
  );
}

export default Header;
