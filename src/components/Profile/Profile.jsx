import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";
import "./Profile.css";

const Profile = ({ onCardLike, onCardClick, currentUser, clothingItems, handleAddClick, changeCurrentUserData, handleLogOut}) => {

  
  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar changeCurrentUserData={changeCurrentUserData} handleLogOut={handleLogOut}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
          currentUser={currentUser} 
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default Profile;
