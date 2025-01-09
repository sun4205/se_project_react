import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import placeholder from "../../assets/placeholder.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ openRegisterModal, weatherData, openLoginModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getPlaceholderAvatar = (name) => {
    const firstLetter = name ? name[0].toUpperCase() : "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
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
        <button
          onClick={openRegisterModal}
          type="button"
          className="header__add-clothes-btn"
        >
          Sign up
        </button>
      </div>

      <div className="header__user-container">
        {!currentUser ? (
          <>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Log in
            </button>
            <img
              className="header__avatar"
              src={placeholder}
              alt="Default avatar"
            />
          </>
        ) : (
          <>
            <span className="header__user-name">{currentUser.name}</span>
            {currentUser.avatar ? (
              <img
                className="header__avatar"
                src={currentUser.avatar}
                alt={currentUser.name}
              />
            ) : (
              getPlaceholderAvatar(currentUser.name)
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
