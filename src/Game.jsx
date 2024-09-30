import { useState, useEffect } from "react";
import Card from "./components/Card"; 
import Scoreboard from "./components/Scoreboard"; 
import Timer from "./components/Timer";
import Popup from "./components/Popup";
import "./App.css"; 
import fruitsData from "./fruits.json";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";

const Game = () => {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);
  const [timer, setTimer] = useState(300); 
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false); 
  const [gameStarted, setGameStarted] = useState(false);

  const chooseCard = (fruit) => {
    if (fruitOne && fruitTwo) {
      return;
    }
    if (!fruitOne) {
      setFruitOne(fruit);
    } else if (!fruitTwo && fruit !== fruitOne) {
      setFruitTwo(fruit);
    }
  };

  // Initialize the game with shuffled fruits
  const initGame = () => {
    const allFruits = [...fruitsData, ...fruitsData]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random(), matched: false }));
    setFruits(allFruits);
    setFruitOne(null);
    setFruitTwo(null);
    setScore(0);
    setTimer(300);
    setGameOver(false);
    setGameWon(false);
  };

  // Reset the game when the reset button is clicked
  const resetGame = () => {
    initGame();
    setGameStarted(true); // Restart the game
  };

  // Handle matching logic
  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.emoji === fruitTwo.emoji) {
        setFruits((prevFruits) =>
          prevFruits.map((item) =>
            item.emoji === fruitOne.emoji ? { ...item, matched: true } : item
          )
        );
        setScore((prevScore) => prevScore + 10);
      } else {
        setTimeout(() => {
          setScore((prevScore) => Math.max(0, prevScore - 1));
        }, 500);
      }

      // Reset the selected fruits after a delay
      setTimeout(() => {
        setFruitOne(null);
        setFruitTwo(null);
      }, 1000);
    }
  }, [fruitOne, fruitTwo]);

  // Check if the user has won (all fruits are matched)
  useEffect(() => {
    if (fruits.length && fruits.every((fruit) => fruit.matched)) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [fruits]);

  return (
    <>
      {gameStarted && (
        <div className="game-status">
          <button className="reset" onClick={resetGame}>
            <h3>
              <HiMiniArrowUturnLeft />
            </h3>
          </button>
          <Scoreboard score={score} />
          <Timer timer={timer} setTimer={setTimer} setGameOver={setGameOver} />
        </div>
      )}

      {/* Conditional rendering of Popup */}
      {gameOver && (
        <Popup
          gameWon={gameWon}
          score={score}
          timer={timer}
          resetGame={resetGame}
        />
      )}

      {!gameStarted ? (
        <div className="StartGame">
          <h1>Card Guessing Game</h1>
          <button
            className="start-game"
            onClick={() => {
              initGame();
              setGameStarted(true);
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="MyGameBoard">
          <div className="game-block">
            {fruits.map((fruit, key) => (
              <Card
                key={key}
                chooseCard={chooseCard}
                flipped={
                  fruit === fruitOne || fruit === fruitTwo || fruit.matched
                }
                fruit={fruit}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Game;

