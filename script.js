const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setBoard = (index, value) => {
    board[index] = value;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  return { getBoard, setBoard, resetBoard };
})();

const displayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const resetButton = document.querySelector(".reset-button");
  const restartButton = document.querySelector(".restartButton");
  const message = document.querySelector(".message");
  

  const render = () => {
    gameBoard.getBoard().forEach((cell, index) => {
      cells[index].textContent = cell;
    });
  };

  const showMessage = (text) => {
    message.textContent = text;
  };

  const clearMessage = () => {
    message.textContent = " ";
  };

  const clearBoard = () => {
    gameBoard.resetBoard();
    render();
  };

  return { render, showMessage, clearMessage, clearBoard, cells, resetButton, restartButton };
})();

const player = (name, marker) => {
  return { name, marker };
};

const game = (() => {
  const player1 = player(prompt("Choose a name"), "X");


  const player2 = player(prompt("Choose a name"), "O");
  let currentPlayer = player1;
  let isGameOver = false;

  const checkWinner = () => {
    const board = gameBoard.getBoard();
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        displayController.showMessage(`${currentPlayer.name} wins!`);
        isGameOver = true;
        return;
      }
    }

    if (!board.includes("")) {
      displayController.showMessage("It's a tie!");
      isGameOver = true;
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const play = (index) => {
    if (isGameOver || gameBoard.getBoard()[index] !== "") return;
    gameBoard.setBoard(index, currentPlayer.marker);
    displayController.render();
    checkWinner();
    if (!isGameOver) {
      switchPlayer();
    }
  };

  const restartGame = () => {
    isGameOver = false;
    currentPlayer = player1;
    displayController.clearBoard();
    displayController.clearMessage();
  }

  return { play, restartGame };
})();   

displayController.cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    game.play(index);
  });
});

displayController.resetButton.addEventListener("click", () => {
  displayController.clearBoard();
  displayController.clearMessage();
});

displayController.restartButton.addEventListener("click", () => {
  game.restartGame();

});

displayController.render(); 
    
