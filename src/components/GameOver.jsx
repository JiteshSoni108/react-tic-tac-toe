export default function GameOver({winner,onRestart}){
    return <div id="game-over">
        <h2>GAME OVER !</h2>
        {winner && <p>{winner} WON!</p> }
        {!winner && <p>IT'S A DRAW</p> }
        <p><button onClick={onRestart}>RESTART</button></p>
    </div>
}