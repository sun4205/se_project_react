import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  console.log("Item in ItemCard:", item);
  console.log("Image URL:", item.imageUrl);

  const handleLike = () => {
    const { _id, isLiked } = item; 
    onCardLike({ id: _id, isLiked }); 
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__content">
      <h2 className="card__name">{item.name}</h2>
      <button onClick={handleLike} className="card__like-btn">       
      </button>
      </div>
      
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
     
     
    </li>
  );
}

export default ItemCard;
