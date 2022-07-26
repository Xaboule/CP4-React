import { useState } from 'react';
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

       {/* {win1 === true || win2 === true ? (<PopupWin
       win1={win1}
       win2={win2}
       name1={name1}
       name2={name2}
       />) : null} */}
 {/* {win1 === true ? (<Popup className='popupwin'><div>{name1} wins </div></Popup>) : win2 === true ? (<Popup className='popupwin'><div> {name2} wins</div></Popup>): null} */}
      {/* {win1 === false && win2 === false &&  */}
      {play ? (
        <>
      <ThreeScene 
      ball1={ball1}
      ball2={ball2}
      setWin1={setWin1}
      setWin2={setWin2}
      />
    
      <div id='can-btn'>
        <div id='btn'>
          <button onClick={() => setPlayer1((player1) => player1 + 1)}>
            {name1} wins : {player1}
          </button>
          <button onClick={() => setDraw((draw) => draw + 1)}>
            Draws : {draw}
          </button>
          <button
            onClick={() => sendUpdate(setPlayer2((player2) => player2 + 1))}
            >
            {name2} wins : {player2}
          </button>
        </div>
      </div>
      </>
        ): null}
    </div>
  );
}


export default App;
