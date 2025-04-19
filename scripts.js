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

    //Make methods available
    return { getBoard, checkMove, updateBoard, resetGameBoard, checkFullBoard };
})();


// Game Controller / Players module
const GameController = ( () => {
    //Create two players (could be just symbols "X" and "O" for now)
    const players = ["O", "X"];
    let currentPlayer = player[0];

    //Handle move: player picks a cell → module checks → updates gameboard
    const makeMove = (cell) => {
        const move = GameBoard.checkMove(cell);

        if (move === true) {
            GameBoard.updateBoard(cell, currentPlayer);
        }
    };

    //Check for win/loss/tie after every move (using winning index combos)
    const checkWin = () => {
        //Indexes taht indicates winning positions
        const winningConditions = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
          ];
        

        //Get the current player plays' index
        const currentPlayerCells = () => GameBoard.getBoard
                                            .map((cells, index) => cells === currentPlayer ? index : -10)
                                            .filter(index => index !== -10);
        
        //Compare to determine winner or not                                    
    };
})();

    //Check for win/loss/tie after every move (using winning index combos)
    //Switch players automatically after a valid move
    //Keep track of who's playing (currentPlayer)
    //Track scores (wins, losses, ties) [good addition!]
    //Allow resetting game state (board + currentPlayer + scores)

