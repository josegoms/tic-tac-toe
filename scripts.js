// Gameboard module
const GameBoard = ( () => {
    //Create gameboard with "blank" spaces
    const board = Array(9).fill(null);

    //Function to get a copy of the Gameboard safely (getter)
    const getBoard = () => [...board];

    //Check if a move is valid (if cell is empty)
    const checkMove = (cell) => board[cell] === null;

    //Update the cell with player's move
    const updateBoard = (cell, currentPlayer) => board[cell] = currentPlayer;

    //Reset gameboard
    const resetGameBoard = () => board.fill(null);

    //Check if board is full
    const checkFullBoard = () => board.every(cell => cell !== null);
})();


// Game Controller / Players module
const GameController = ( () => {

})();
    //Create two players (could be just symbols "X" and "O" for now)
    //Handle move: player picks a cell → module checks → updates gameboard
    //Check for win/loss/tie after every move (using winning index combos)
    //Switch players automatically after a valid move
    //Keep track of who's playing (currentPlayer)
    //Track scores (wins, losses, ties) [good addition!]
    //Allow resetting game state (board + currentPlayer + scores)

