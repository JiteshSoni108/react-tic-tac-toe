
import PlayersInfo from './components/PlayersInfo'
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './WINNING_COMBO';
import GameOver from './components/GameOver';


const INITIAL_GAME_BOARD=[
  [null,null,null] ,
  [null,null,null],
  [null,null,null]
];

function derivedActivePlayer(gameTurns){
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') 
  {
    return 'O' ;
  }
  return 'X';
}

function derivedWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
   
    const firstSq=gameBoard[combination[0].row][combination[0].column];
    const secondSq=gameBoard[combination[1].row][combination[1].column]
    const thirdSq=gameBoard[combination[2].row][combination[2].column]    
    
    if(firstSq != null && firstSq === secondSq && firstSq === thirdSq){
      winner=players[firstSq];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns){
  let gameBoard= [ ...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns){
      const {square, player}=turn;
      const {row, col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}

function App() {
  // CONST START
  const[gameTurns, setGameTurns]= useState([]);
  const[players, setPlayers]= useState({
    X: 'Player 1',
    O: 'Player 2' 
  });
  const activePlayer= derivedActivePlayer(gameTurns);
  const gameBoard=derivedGameBoard(gameTurns);
  const winner=derivedWinner(gameBoard,players);
  const hasDraw= gameTurns.length === 9 && !winner;
  // CONST END
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChanged(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }
  function handleSelectSqaure(rowIndex, colIndex){

    setGameTurns( (prevTurns) =>{
      const curPlayer =derivedActivePlayer(prevTurns);
      const updateTruns=[
        { 
          square: {
                    row: rowIndex, 
                    col : colIndex
                  },
                  player: curPlayer
        },
        ...prevTurns,
      ];

      return updateTruns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
         <PlayersInfo initialName="Player 1"  symbol="X" isActivePlayer={activePlayer === 'X'} OnNameChanged={handlePlayerNameChanged}></PlayersInfo>
         <PlayersInfo initialName="Player 2"  symbol="O" isActivePlayer={activePlayer === 'O'} OnNameChanged={handlePlayerNameChanged}></PlayersInfo>
          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
        <GameBoard onSelectSquare={handleSelectSqaure} boardSetUp={gameBoard}></GameBoard>
      </div>
    </main>
  )
}

export default App
