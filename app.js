const gameBoard = (() => {
  const gameboard = [];
  const app = document.getElementById("app");

  const init = () => {
    for (let i = 0; i < 9; i++) {
      const box = {
        id: `box-${i}`,
        state: "",
      };
      gameboard.push(box);
    }
  };
  const render = () => {
    app.innerHTML = "";
    const board = document.createElement("div");
    board.classList.add("gameboard");
    gameboard.map((box) => {
      const gameBox = document.createElement("div");
      gameBox.className = "gameboard__box";
      gameBox.id = box.id;
      gameBox.innerHTML = box.state;
      gameBox.addEventListener("click", changeState);
      board.appendChild(gameBox);
      return board;
    });
    app.appendChild(board);
  };

  const changeState = (event) => {
    const found = gameboard.find((found) => found.id == event.target.id);
    found.state === '' ? found.state = "X" : null
    render();
    console.log(gameboard);
  };
  init();
  render();
})();
