import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import placeholder from "../../assets/placeholder.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  openRegisterModal,
  openLoginModal,
  handleLogout,
  weatherData,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const handleAddClick = () => {
    
    console.log("Add clothes clicked");
  };

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
        {!currentUser ? (
          <div className="header__auth-buttons">
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
          <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          +Add clothes
        </button>
      

      <div className="header__user-container">
        <Link to="/profile" className="header__link">
          <p className="header__userName">{currentUser.name}</p>
        </Link>

        <img className="header__avatar" src={currentUser.avatarURL || avatar} alt={currentUser.name} />
            {/* <button
              onClick={handleLogout}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign Out
            </button> */}
          </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
