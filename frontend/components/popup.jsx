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
{/*     
    {win1 === true ? ( */}
  <Popup className='popupwin' open={win1 ===true ? open : null}  onClick={!open}>
          <div id='winOne'><p >{name1} wins</p> </div>
        </Popup>
      {/* ) : null} */}
      {win2 === true ? (
        <Popup className='popupWin'>
          <div id='winTwo'><p>{name2} wins</p></div>
        </Popup>
      ) : null}
      </div>
  );
}

export default PopupWin;
