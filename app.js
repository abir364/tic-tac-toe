const GameBoard = (() => {
  const _gameBoard = ['','','','','','','','',''];

  const setVal = (index,value) => {
    _gameBoard[index-1] = value;
  }

  const getBoard = () => {
    return _gameBoard;
  }

  const print = () => {
    console.log(_gameBoard);
  }

  const reset = () => {
    for (let i = 0; i < _gameBoard.length; i++) {
      _gameBoard[i] = '';
    }
  }

  return { setVal, print, reset, getBoard };
})();

// v can be either X or O
const Player = (v) => {
  let _symbol = v;

  const getSymbol = () => {
    return _symbol;
  }

  return { getSymbol };
};

// const checkWin = (() => {

// })();

const DisplayController = (() => {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.addEventListener('click',() => {
      GameController.playRound();
      box.textContent = GameController.getCurSym();
      GameBoard.setVal(box.dataset.id, GameController.getCurSym());
      GameBoard.print();
      GameController.checkWinner();
    })
  });
})();

const GameController = (() => {
  const playerA = Player('X');
  const playerB = Player('O');

  let round = 1;
  const current = () => {
    return round%2 === 0 ? playerB.getSymbol() : playerA.getSymbol();
  }

  let currentSym;

  const getCurSym = () => {
    return currentSym;
  }

  const playRound = () => {
    currentSym = current();
    

    round++;
    // checkWinner();
  }

  let board = GameBoard.getBoard();
  const checkWinner = () => {
    board = GameBoard.getBoard();

    // TODO: draw needs to be tweaked !!!!
    if (round > 9) {
      alert('draw');
    }

    if (board[0]!=='' && ((board[1] === board[2]) && (board[2] === board[0]))) {
      alert(board[1]+'winner');
    }
    if (board[3]!=='' && ((board[3] === board[4]) && (board[4] === board[5]))) {
      alert(board[3]+'winner');
    }
    if (board[6]!=='' && ((board[6] === board[7]) && (board[7] === board[8]))) {
      alert(board[6]+'winner');
    }
    if (board[0]!=='' && ((board[0] === board[3]) && (board[3] === board[6]))) {
      alert(board[0]+'winner');
    }
    if (board[0]!=='' && ((board[0] === board[4]) && (board[8] === board[0]))) {
      alert(board[0]+'winner');
    }
    if (board[1]!=='' && ((board[1] === board[4]) && (board[4] === board[7]))) {
      alert(board[1]+'winner');
    }
    if (board[2]!=='' && ((board[2] === board[5]) && (board[5] === board[8]))) {
      alert(board[2]+'winner');
    }
    if (board[2]!=='' && ((board[4] === board[2]) && (board[2] === board[6]))) {
      alert(board[2]+'winner');
    }
  }

  return { getCurSym, playRound, checkWinner };
})();