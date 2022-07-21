import { useState } from 'react';
import reactLogo from './assets/react.svg';
import ThreeScene from './scene';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  return (
    <div className='App'>
        <ThreeScene />
      <div id='can-btn'>

        <div id='btn'>
          <button
            onClick={() =>
              setPlayer1((player1) => player1 + 1)
            }
          >
            Player 1 wins : {player1}
          </button>

          <button
            onClick={() =>
              setPlayer2((player2) => player2 + 1)
            }
          >
            Player 2 wins : {player2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
