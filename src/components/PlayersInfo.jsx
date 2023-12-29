import { useState } from 'react';

export default function PlayersInfo({initialName , symbol, isActivePlayer, OnNameChanged}){
    const[playerName, setPlayerName]= useState(initialName);
    const[isEditing, setIsEdit]= useState(false);
    function handelEdit(){
        setIsEdit( editing=>!editing); // Alway pass function.This will not schedules the execution and make it fast
        if(!isEditing){
            OnNameChanged(symbol,playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }
    return (
    <li className={isActivePlayer ? 'active' : undefined}>
        <span className="player" >
            {isEditing ? <span className="player-name"> {playerName}</span> : <input type='text' value={playerName} onChange={handleChange} required />}
            <span className="player-symbol"> {symbol} </span>
        </span>
        <button onClick={handelEdit}>{isEditing ? "EDIT" : "SAVE" }</button>
      </li>
      );
}