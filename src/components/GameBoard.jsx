export default function GameBoard( { onSelectSquare , boardSetUp}){
    /*const [gameBoard , setGameBoard]= useState(initialGameBoard);
   
    function markPlayerStep(rowIndex , colIndex){
        setGameBoard( (prevGameBoard) => {
            const updateBaord= [...prevGameBoard.map(innerArray=> [...innerArray] ) ]; // copy old values
            updateBaord[rowIndex][colIndex] = activePlayerSymbol;
            return updateBaord;
        }) ;
        onSelectSquare(); 
    }*/

    
    return (
        <ol id="game-board">
            {
            boardSetUp.map( (row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map( (playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                <button onClick={ () => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol != null ? true : false}>{playerSymbol}</button>
                            </li>)}
                    </ol>
                </li>)
            }
        </ol> );
}