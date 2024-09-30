import '../App.css'
// eslint-disable-next-line react/prop-types
const Popup = ({ gameWon, score, resetGame }) => {

  return (
    <div className="popupOverlay">
        <div className="popup">
      {gameWon ? (
        <div className="popup-content">
          <h2>Congratulations! You won the game!</h2>
          <p>Your final score: {score}</p>
        </div>
      ) : (
        <div className="popup-content">
          <h2>Game Over! Time has run out.</h2>
          <p>Your final score: {score}</p>
        </div>
      )}
      <button onClick={resetGame}>Play Again</button>
    </div>
    </div>
  );
};

export default Popup;
