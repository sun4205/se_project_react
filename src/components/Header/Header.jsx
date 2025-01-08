import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ openRegisterModal, weatherData,openLoginModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__controls">
        <ToggleSwitch />
        <button
          onClick={openRegisterModal}
          type="button"
          className="header__add-clothes-btn"
        >
          Sign up
        </button>
      </div>

      <div className="header__user-container">
      <button
          onClick={openLoginModal}
          type="button"
          className="header__add-clothes-btn"
        >
          Log in
        </button>

        <img className="header__avatar" src={avatar} alt="Terrence Tegegine" />
      </div>
    </header>
  );
}

export default Header;
