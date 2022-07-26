import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './popup.css';

function PopupWin({
  name1, name2, win1, win2}) {


  const onSubmit = (e) => {
    console.log('coucoucoucoucoucoucoucu', e.target.value);
  };

  return (
    <div id="popup">
    
    {win1 === true ? (
          <div id='winOne'>{name1} wins</div>
      ) : null}
      {win2 === true ? (
          <div id='winTwo'>{name2} wins</div>
      ) : null}
      </div>
  );
}

export default PopupWin;
