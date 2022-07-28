import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import ThreeScene from './scene';
import Form from '../components/form';
import './App.css';
import Popup from 'reactjs-popup';
import PopupWin from '../components/popup';




function App() {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [draw, setDraw] = useState(0);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [play, setPlay] = useState(false);
  const [ball1, setBall1] = useState('#ff0000');
  const [ball2, setBall2] = useState('#0000ff');
  const [win1, setWin1] = useState(false);
  const [win2, setWin2] = useState(false);

  const playerStats = {};

  const sendUpdate = (playerStats) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/playerUpdate`);
  };

  function onWinPlus(){
  }
  
  useEffect(() => {
    win1 === true ?  setPlayer1(player1 + 1) : win2 === true ? setPlayer2(player2 + 1) : null
    
  }, [win1, win2])
  
  console.log(win1)
  return (
    <div className='App'>
      {!play ? (
        <>
        <h1>FourByFour</h1>
        <Form
          name1={name1}
          setName1={setName1}
          name2={name2}
          setName2={setName2}
          setPlay={setPlay}
          ball1= {ball1}
          setBall1={setBall1}
          ball2={ball2}
          setBall2={setBall2}
          />
          </>
      ) : null}

       {win1 === true || win2 === true ? (<PopupWin
       win1={win1}
       win2={win2}
       name1={name1}
       name2={name2}
       />) : null}

      {play ? (
        <>
      <ThreeScene 
      ball1={ball1}
      ball2={ball2}
      setWin1={setWin1}
      setWin2={setWin2}
      player1={player1}
      player2={player2}
      />
    
      <div id='can-btn'>
        <div id='btn'>
          <span>
            {name1} wins : {player1}
          </span >
          <span onChange={() => setDraw((draw) => draw + 1)}>
            Draws : {draw}
          </span>
          <span
            onClick={() => sendUpdate(setPlayer2((player2) => player2 + 1))}
            >
            {name2} wins : {player2}
          </span>
        </div>
      </div>
      </>
        ): null}
    </div>
  );
}


export default App;
