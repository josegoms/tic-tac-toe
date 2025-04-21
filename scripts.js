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
    const players = ["X", "O"];
    let currentPlayer = players[0];

    //Handle move: player picks a cell → module checks → updates gameboard
    const makeMove = (cell) => {
        const move = GameBoard.checkMove(cell);

        if (move === true) {
            GameBoard.updateBoard(cell, currentPlayer);
        

            if(checkWin()) {
                console.log(`You've won the game, Player ${currentPlayer}!`);
                scores[currentPlayer]++;
                setTimeout(() => {
                    resetDisplay();
                    GameBoard.resetGameBoard();
                }, 1000);
            }
            if (scores[currentPlayer] >= 3) {
                console.log(`You've won it all, Player ${currentPlayer}!`);
                setTimeout(() => {
                    resetDisplay();
                    resetAll();
                }, 1000);
            } else if (!GameBoard.checkFullBoard()) {
                switchPlayers();
            }

            if (GameBoard.checkFullBoard()) {
                console.log(`It's a tie!`);
                setTimeout(() => {
                    resetDisplay();
                    GameBoard.resetGameBoard();
                }, 1000);
            }
        } else {
            console.log(`Invalid move! Cell ${cell} is already filled.`);
        }
    };

    //Check for win/loss/tie after every move (using winning index combos)
    const checkWin = () => {
        //Indexes that indicates winning positions
        const winningConditions = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
          ];
        

        //Get the current player plays' index
        const currentPlayerCells = GameBoard.getBoard().map((cells, index) => cells === currentPlayer ? index : -10)
                                            .filter(index => index !== -10);
        
        //Compare to determine winner or not
        return winningConditions.some(subarray => subarray.every(win => currentPlayerCells.includes(win)));
    };

    //Switch players automatically after a valid move
    const switchPlayers = () => currentPlayer = (currentPlayer === "X") ? "O" : "X";

    //Keep track of who's playing (currentPlayer)
    const getCurrentPlayer = () => [...currentPlayer];

    //Track scores
    const scores = {
        X: 0,
        O: 0,
    };

    //Show scores
    const getScores = () => ({...scores});

    //Allow resetting game state (board + currentPlayer + scores)
    const resetAll = () => {
        GameBoard.resetGameBoard();
        currentPlayer = "X";
        scores.X = 0;
        scores.O = 0;
    };

    //Make methods available
    return { makeMove, getCurrentPlayer, getScores }
})();

//Handle display reset
function resetDisplay () {
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach((item) => {
        item.textContent = "";
    });
}

//Get the Date and display it on screen(just like on a notebook where we need to keep track of our notes)
const date = document.querySelector(".date");

document.addEventListener("DOMContentLoaded", () => {
    
    //Get today's date and format to DD/MM/YYY
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    //Display Date on screen
    date.textContent = formatted;
});

//Display players' marks
const gridContainer = document.querySelector(".grid-container");
gridContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("grid-item") && event.target.textContent === "") {
        //Display the current player mark
        event.target.textContent = GameController.getCurrentPlayer();

        //Pass down index to module
        const getClass = event.target.classList[0];
        const lastCharacter = getClass.slice(-1);
        GameController.makeMove(lastCharacter);
    }
});

//Change player's names
const changeName = document.querySelector(".players");
changeName.addEventListener("click", () => {

    //Call dialog
    const dialog = document.querySelector("#nameDialog");
    dialog.showModal();

    //Catch forms data
    const formsData = document.querySelector("#nameForm");
    formsData.addEventListener("submit", (event) => {

        const formData = new FormData(event.target);
        const playerName1 = formData.get("playerName1");
        const playerName2 = formData.get("playerName2");

        //Update the value
        const playerOutput1 = document.querySelector("#player1");
        const playerOutput2 = document.querySelector("#player2");

        playerOutput1.textContent = playerName1;
        playerOutput2.textContent = playerName2;
    });

    //Cancel button
    const cancel = document.querySelector("#cancel");
    cancel.addEventListener("click", () => {
        dialog.close();
    });
});
