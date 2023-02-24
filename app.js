const GameBoard = (() => {
  const _gameBoard = [null, null, null, null, null, null, null, null, null];

  const setVal = (index, value) => {
    _gameBoard[index - 1] = value;
  };

  const getBoard = () => {
    return _gameBoard;
  };

  const print = () => {
    console.log(_gameBoard);
  };

  const reset = () => {
    for (let i = 0; i < _gameBoard.length; i++) {
      _gameBoard[i] = null;
    }
  };

  return { setVal, print, reset, getBoard };
})();

// v can be either X or O
const Player = (v) => {
  let _symbol = v;

  const getSymbol = () => {
    return _symbol;
  };

  return { getSymbol };
};

// const checkWin = (() => {

// })();

const DisplayController = (() => {
  const reset = () => {
    boxes.forEach((box) => {
      box.textContent = "";
    });
    GameBoard.reset();
    GameController.resetRound();
  };

  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      GameController.playRound();
      box.textContent = GameController.getCurSym();
      GameBoard.setVal(box.dataset.id, GameController.getCurSym());
      GameBoard.print();
      resultControl(GameController.checkWinner());
    });
  });
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", reset);

  const restart = document.querySelector(".modal-close");
  restart.addEventListener("click", () => {
    reset();
    const mdl = document.querySelector(".modal");
    mdl.classList.add("remove-modal");
  });

  const resultControl = (result) => {
    if (result !== "carry on") {
      const modal = document.querySelector(".modal");
      modal.classList.remove("remove-modal");
      const res = document.querySelector(".modal-result");
      res.textContent = result;
    }
  };
})();

const GameController = (() => {
  const playerA = Player("X");
  const playerB = Player("O");

  let round = 1;

  const resetRound = () => {
    round = 1;
  };

  const current = () => {
    return round % 2 === 0 ? playerB.getSymbol() : playerA.getSymbol();
  };

  let currentSym;

  const getCurSym = () => {
    return currentSym;
  };

  const playRound = () => {
    currentSym = current();

    round++;
    // checkWinner();
  };

  let board = GameBoard.getBoard();
  const checkWinner = () => {
    board = GameBoard.getBoard();

    // TODO: draw needs to be tweaked !!!!

    if (board[0] !== null && board[1] === board[2] && board[2] === board[0]) {
      round = 1;
      return board[0] + " winner";
    }
    if (board[3] !== null && board[3] === board[4] && board[4] === board[5]) {
      round = 1;
      return board[3] + " winner";
    }
    if (board[6] !== null && board[6] === board[7] && board[7] === board[8]) {
      round = 1;
      return board[6] + " winner";
    }
    if (board[0] !== null && board[0] === board[3] && board[3] === board[6]) {
      round = 1;
      return board[0] + " winner";
    }
    if (board[0] !== null && board[0] === board[4] && board[8] === board[0]) {
      round = 1;
      return board[0] + " winner";
    }
    if (board[1] !== null && board[1] === board[4] && board[4] === board[7]) {
      round = 1;
      return board[1] + " winner";
    }
    if (board[2] !== null && board[2] === board[5] && board[5] === board[8]) {
      round = 1;
      return board[2] + " winner";
    }
    if (board[2] !== null && board[4] === board[2] && board[2] === board[6]) {
      round = 1;
      return board[2] + " winner";
    }

    if (round > 9) {
      round = 1;
      return `It's a draw`;
    }

    return "carry on";
  };

  return { getCurSym, playRound, checkWinner, resetRound };
})();
