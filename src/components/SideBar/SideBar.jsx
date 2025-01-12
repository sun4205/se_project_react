import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

const SideBar = ({ handleLogout, changeCurrenUserData }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sideBar">
      <img className="sideBar__avatar" src={currentUser.avatarURL || avatar}  alt={currentUser.name} />
      <p className="sideBar__userName">{currentUser.name}</p>
      <button onClick={changeCurrenUserData} type="button">
        Change Profile Data
      </button>
      <button onClick={handleLogout} type="button">
        Log Out
      </button>
    </div>
  );
};

export default SideBar;
