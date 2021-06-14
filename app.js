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
  let player1;
  let player2;
  let player1Name;
  let player2Name;
  let isGameOver = false;
  let isDraw = false;
  let currPlayer;

  const getIsGameOver = () => isGameOver;
  const getIsDraw = () => isDraw;

  const getCurrPlayer = () => currPlayer;

  const getPlayerValue = () => {
    player1Name = document.querySelector("#p1").value;
    player2Name = document.querySelector("#p2").value;
  };

  const gameStart = () => {
    console.log(player1Name);
    if (!player1Name && !player2Name) {
      getPlayerValue();
    }
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
    currPlayer = player1;
    gameBoard.init();
  };

  const gameReset = () => {
    isGameOver = false;
    isDraw = false;
    currPlayer = player1;
    gameBoard.clear();
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
      isGameOver = true;
    } else if (isGameDraw) {
      isGameOver = true;
      isDraw = true;
    }
    if (currPlayer === player1) currPlayer = player2;
    else if (currPlayer === player2) currPlayer = player1;
  };

  const resetPlayerNames = () => {
    player1Name = null;
    player2Name = null;
  };

  return {
    gameStart,
    onBoxClick,
    getCurrPlayer,
    getIsGameOver,
    gameReset,
    getIsDraw,
    resetPlayerNames,
  };
})();

const displayController = (() => {
  const app = document.getElementById("app");
  const board = gameBoard.getBoard();

  // handle functions
  const handleStartGame = () => {
    gameController.gameStart();
    renderGameScreen();
  };

  const handleBoxClick = (e) => {
    if (e.target.innerText === "") {
      gameController.onBoxClick(e.target.id);
      !gameController.getIsGameOver()
        ? renderGameScreen()
        : renderGameOverScreen(gameController.getCurrPlayer());
    } else console.error("box is used");
  };

  const handleReset = () => {
    gameController.gameReset();
    gameController.gameStart();
    renderGameScreen();
  };

  const handleReturnHome = () => {
    gameController.gameReset();
    gameController.resetPlayerNames();
    renderHomeScreen();
  };

  //element creation functions
  const createHeading = (name) => {
    const heading = document.createElement("h1");
    heading.classList.add("heading");
    name && (heading.innerText = name);
    return heading;
  };
  const createButton = (name, handleClick) => {
    const button = document.createElement("button");
    button.innerText = name;
    button.classList.add("button");
    handleClick && button.addEventListener("click", handleClick);
    return button;
  };
  const createInput = (id, placeholder, value) => {
    const input = document.createElement("input");
    input.id = id;
    input.classList.add("input");
    placeholder && (input.placeholder = placeholder);
    value && (input.value = value);
    return input;
  };

  const createContainer = (className) => {
    const container = document.createElement("div");
    container.classList.add(className);
    return container;
  };

  // render functions
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
    heading.classList.add("heading");
    return heading;
  };

  const renderGameOverScreen = ({ name }) => {
    const isDraw = gameController.getIsDraw();
    app.innerHTML = "";
    const container = createContainer();
    const heading = createHeading();
    container.appendChild(heading);
    const resetButton = createButton("Play again", handleReset);
    const homeButton = createButton("Quit", handleReturnHome);

    if (isDraw) {
      heading.innerText = `DRAW!`;
    } else heading.innerText = `${name} WON!`;

    container.appendChild(resetButton);
    container.appendChild(homeButton);
    app.appendChild(container);
    app.appendChild(renderFooter());
  };

  const renderHomeScreen = () => {
    const inputContainer = createContainer("input-container");
    app.innerHTML = "";
    inputContainer.appendChild(createInput("p1", "player name", "Player 1"));
    inputContainer.appendChild(createInput("p2", "player name", "Player 2"));
    app.appendChild(createHeading("Tic-Tac-Toe"));
    app.appendChild(inputContainer);
    app.appendChild(createButton("Start Game", handleStartGame));
    app.appendChild(renderFooter());
  };

  const renderGameScreen = () => {
    app.innerHTML = "";
    app.appendChild(renderPlayer());
    app.appendChild(renderGameBoard(board));
    app.appendChild(renderFooter());
  };

  const renderFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerText = "Created by Deividas Gineitis, 2021";
    return footer;
  };

  renderHomeScreen();
})();
