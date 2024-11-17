import { defaultClothingItems } from "../../utils/constants";

import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ onCardClick, clothingItems, handleAddClick }) => {
  return (
    <div className="clothesSection">
      <section className="clothesSection__controls">
        <p className="clothesSection__items">Your Items</p>
        <button onClick={handleAddClick} className="clothesSection__btn">
          +Add new
        </button>
      </section>
      <section className="clothesSection__lists">
        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ClothesSection;
