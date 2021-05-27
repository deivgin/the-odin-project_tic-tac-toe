const global = (() => {
  const app = document.getElementById("app");
  let currentPlayer = null;
  return { app, currentPlayer };
})();

const GameBoard = (() => {
  const gameBoard = [];
  const container = document.createElement("div");
  container.classList.add("game-board");

  function createBoard() {
    for (let i = 0; i <= 8; i++) {
      gameBoard.push({ id: i, mark: "" });
    }
    app.appendChild(container);
    renderBox();
  }

  function renderBox() {
    container.innerHTML = "";
    gameBoard.map((item) => {
      const box = document.createElement("div");
      box.setAttribute("id", item.id);
      box.classList.add("box");
      box.innerHTML = item.mark;
      box.addEventListener("click", handleBoxClick);
      container.appendChild(box);
    });
  }

  function handleBoxClick(e) {
    const foundBox = gameBoard.find(
      (item) => item.id === parseInt(e.target.id)
    );
    updateBox(foundBox, currentPlayer);
  }

  function updateBox(box, player) {
    if (box.mark === "") {
      box.mark = player.mark;
    } else {
      console.log("spotTaken");
    }
    renderBox();
  }
  createBoard();
  return { createBoard, updateBox };
})();

const Player = (name, mark) => ({
  name,
  mark,
});

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");

const GameController = (() => {
  const init = () => {
    const heading = document.createElement("h1");
    heading.classList.add("heading");
    heading.innerHTML = "Tic-Tac-Toe";

    const button = document.createElement("button");
    button.innerHTML = "Start game";
    button.setAttribute("id", "startButton");
    button.addEventListener("click", gameStart);

    app.appendChild(heading);
    app.appendChild(button);
  };

  function gameStart() {
    currentPlayer = player1;
    const currPlayerHTML = document.createElement("h1");
    currPlayerHTML.innerHTML = currentPlayer.name;
    app.appendChild(currPlayerHTML);
  }
  gameStart();
})();
