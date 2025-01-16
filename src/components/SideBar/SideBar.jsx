import { useContext } from "react"; 
import CurrentUserContext from "../../contexts/CurrentUserContext"; 
import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

const SideBar = ({ handleLogOut, changeCurrentUserData }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const avatarURL = currentUser?.avatarURL || avatar; 
  const userName = currentUser?.name || "User Avatar"; 
  return (
    <div className="sideBar">
      <div className="sideBar__userInfo">
      <img className="sideBar__avatar" src={avatarURL}  alt={userName} />
      <p className="sideBar__userName">{userName}</p>
      </div>
      <div className = "sideBar__editProfile">
      <button className="sideBar__changeUserData" onClick={changeCurrentUserData} type="button">
        Change Profile Data
      </button>
      <button className = "sideBar__logout" onClick={handleLogOut} type="button">
        Log Out
      </button>
      </div>
      </div>
  );
};

export default SideBar;
