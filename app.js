const GameBoard = (() => {
  const gameBoard = [];

  function init() {
    for (let i = 0; i <= 8; i++) {
      gameBoard.push("");
    }
  }

  function clear() {
    gameBoard.splice(0, gameBoard.length);
  }

  function getBoard() {
    return gameBoard;
  }

  function updateBoard(index, mark) {
    if (gameBoard[index] === "") gameBoard[index] = mark;
    else alert("NONOON");
  }

  return { init, clear, getBoard, updateBoard };
})();

const Player = (name, mark) => ({
  name,
  mark,
});

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");

const GameController = (() => {
  const app = document.getElementById("app");
  const board = GameBoard.getBoard();
  const container = document.createElement("div");
  container.classList.add("game-board");

  function startGame() {
    GameBoard.init();
    app.appendChild(container);
    renderBoard(board);
  }

  function renderBoard(board) {
    container.innerHTML = "";
    board.map((item, index) => {
      const box = document.createElement("div");
      box.classList.add("box");
      box.id = index;
      box.innerHTML = item;
      box.addEventListener("click", handleBoxClick);
      container.appendChild(box);
    });
  }

  function handleBoxClick(e) {
    GameBoard.updateBoard(e.target.id, "X");
    renderBoard(board);
  }

  startGame();
})();
