const gameBoard = (() => {
  const gameBoard = [];

  const init = () => {
    for (let i = 0; i <= 8; i++) gameBoard.push("");
  };

  const clear = () => gameBoard.splice(0, gameBoard.length);

  const getBoard = () => gameBoard;

  const updateBoard = (index, mark) =>
    gameBoard[index] === "" && (gameBoard[index] = mark);

  return { init, clear, getBoard, updateBoard };
})();

const Player = (name, mark) => ({ name, mark });

const gameController = (() => {
  const board = gameBoard.getBoard();
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");

  let isGameStarted = false;
  let currPlayer = player1;

  const getIsGameStarted = () => isGameStarted;

  const getCurrPlayer = () => currPlayer;

  const gameStart = () => {
    gameBoard.init();
    isGameStarted = true;
  };

  const checkWinCondition = (player) => {
    const horizontal = [0, 3, 6].map((i) => [i, i + 1, i + 2]);
    const vertical = [0, 1, 2].map((i) => [i, i + 3, i + 6]);
    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winCondition = []
      .concat(horizontal)
      .concat(vertical)
      .concat(diagonal);

    const res = winCondition.some(
      (indices) =>
        board[indices[0]] == player.mark &&
        board[indices[1]] == player.mark &&
        board[indices[2]] == player.mark
    );
    return res;
  };

  const checkDrawCondition = () => {
    const res = board.every((item) => item !== "");
    return res;
  };

  const onBoxClick = (index) => {
    gameBoard.updateBoard(index, currPlayer.mark);
    const isGameWon = checkWinCondition(currPlayer);
    const isGameDraw = checkDrawCondition();
    if (isGameWon) {
      alert("gameWon");
      return;
    } else if (isGameDraw) {
      alert("gameDraw");
      return;
    }
    if (currPlayer === player1) currPlayer = player2;
    else if (currPlayer === player2) currPlayer = player1;
    console.log("currPlayer", currPlayer);
  };

  return { gameStart, getIsGameStarted, onBoxClick, getCurrPlayer };
})();

const displayController = (() => {
  const app = document.getElementById("app");
  const board = gameBoard.getBoard();

  const handleStartGame = () => {
    gameController.gameStart();
    renderGameScreen();
  };

  const handleBoxClick = (e) => {
    if (e.target.innerText === "") {
      gameController.onBoxClick(e.target.id);
      renderGameScreen();
    } else console.error("box is used");
  };

  const createHeader = (name) => {
    const header = document.createElement("h1");
    header.classList.add("header");
    name && (header.innerText = name);
    return header;
  };
  const createButton = (name, handleClick) => {
    const button = document.createElement("button");
    button.innerText = name;
    button.classList.add("button");
    handleClick && button.addEventListener("click", handleClick);
    return button;
  };
  const createInput = (placeholder) => {
    const input = document.createElement("input");
    input.classList.add(input);
    placeholder && (input.placeholder = placeholder);
    return input;
  };

  const createContainer = (className) => {
    const container = document.createElement("div");
    container.classList.add(className);
    return container;
  };

  const renderGameBoard = (board) => {
    const container = createContainer("game-board");
    board.map((item, index) => {
      const box = document.createElement("div");
      box.id = index;
      box.classList.add("box");
      box.innerText = item;
      box.addEventListener("click", handleBoxClick);
      container.appendChild(box);
    });
    return container;
  };

  const renderPlayer = () => {
    const { name } = gameController.getCurrPlayer();
    const heading = document.createElement("h2");
    heading.innerText = `${name}'s turn`;
    heading.classList.add("player-heading");
    return heading;
  };

  const homeScreen = () => {
    app.innerHTML = "";
    app.appendChild(createHeader("Tic-Tac-Toe"));
    app.appendChild(createButton("Start Game", handleStartGame));
  };

  const renderGameScreen = () => {
    app.innerHTML = "";
    app.appendChild(renderGameBoard(board));
    app.appendChild(renderPlayer());
  };

  homeScreen();
})();
