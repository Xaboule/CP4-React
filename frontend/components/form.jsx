import React, { useState } from 'react';
import './form.css';

function Form({
  name1, 
  name2,
  setName1, 
  setName2, 
  setPlay, 
  ball1,
  setBall1, 
  ball2,
  setBall2}) {


  const onSubmit = (e) => {
    console.log('coucoucoucoucoucoucoucu', e.target.value);
  };

  return (
    <div id='forms'>
      <div id='mainForms'>
        <div id='player1'>
          <form>
            <label>
              Player 1's name : <br />
              <input
                type='text'
                id='name'
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              ></input>
              <button type='button' onClick={onSubmit}>
                {' '}
                OK{' '}
              </button>
            </label>
            <label>
              Balls' color : <br />
              <input type='color' name='ballColor' id='ballColor' value={ball1} onChange={(e)=> setBall1(e.target.value)} />
            </label>
          </form>
        </div>
        <div id='player2'>
          <form>
            <label>
              Player 2's name : <br />
              <input
                type='text'
                id='name'
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              ></input>
              <button type='submit'> OK </button>
            </label>
            <label>
              Balls' color : <br />
              <input type='color' name='ballColor' id='ballColor' value={ball2} onChange={(e)=> setBall2(e.target.value)} />
            </label>
          </form>
        </div>
      </div>
      <button id='play' onClick={()=> setPlay(true)}> Let's Play!</button>
    </div>
  );
}

export default Form;
