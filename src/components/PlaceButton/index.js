const PlaceButton = ({ place, onChoosePlace, onDeletePlace }) => {
  console.log(place);
  return (
    <div className="place-card" onClick={onChoosePlace}>
      <div>Country</div>:<span>city</span>
      <div onClick={onDeletePlace}>Delete</div>
    </div>
  );
};
export default PlaceButton;
