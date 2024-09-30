// eslint-disable-next-line react/prop-types
const Card =({ fruit, flipped, chooseCard }) => {
  const cardClickHandle = () => {
    chooseCard(fruit);
  };

  return (
    <div className={`card ${flipped ? 'matched' : ''}`} onClick={cardClickHandle}>
      {flipped ? (
        <span style={{ fontSize: '40px', transform: 'rotateY(180deg)' }}>
          {fruit.emoji}
        </span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
          <line x1="12" y1="19" x2="12" y2="19.01"></line>
        </svg>
      )}
    </div>
  );
}

export default Card;
