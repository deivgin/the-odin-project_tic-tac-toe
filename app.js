//function that creates dom elements
const components = (()=>{
    function createHeader(){
        const header = document.createElement("h1");
        header.classList.add("header")
        header.innerHTML = "Tic-Tac-Toe";
        return header;
    }
    function createStartBtn(){
        const startBtn = document.createElement("button");
        startBtn.classList.add("btn");
        startBtn.innerHTML = "Start Game";
        return startBtn;
    }
    function createGameBoardContaiener(){
        const gameContainer = document.createElement("div");
        gameContainer.className = "gameboard"
        return gameContainer
    }
    function createGameBox(id, stateOfBox){
        const gameBox = document.createElement("div");
        gameBox.className = "gameboard__box";
        gameBox.id = id;
        gameBox.innerHTML = stateOfBox;
        return gameBox;
    }
    function testBtn(){
        const testBtn = document.createElement("button");
        testBtn.innerHTML = "Test";
        return testBtn;
    }
    return {createHeader, createStartBtn, createGameBoardContaiener, createGameBox, testBtn};
})();

const gameboard = (()=>{
    const gameboard = [];
    const board = components.createGameBoardContaiener();

    const init = () => {
        for(let i=0; i<9; i++){
            const box = {
                id: `box-${i}`,
                state: ''
            }
            gameboard.push(box);
        }
    }

    const render = () => {
        board.innerHTML = '';
        gameboard.map(box => {
            const boxhtml = components.createGameBox(box.id, box.state);
            board.appendChild(boxhtml)
        });
        return board
    }

    const changeState = (index, state) => {
        gameboard[index].state = state;
        render();
        console.log(gameboard[index]);
        }

    const getBoard = () => board

    return { init, render, changeState, getBoard }
})();

//sukuria gameboard html
const appController = (() => {
    const app = document.getElementById("app");
    const board = gameboard.getBoard();
    const testBtn = components.testBtn();
    app.appendChild(testBtn)

    const startGame = () => {
        gameboard.init();
        gameboard.render();
        board.childNodes.forEach((node) => {
            node.addEventListener("click", pressHelper)
        });
        app.appendChild(board);
    }

    testBtn.addEventListener("click", () => {
        
    })

    const pressHelper = (event) => {
        const index = event.target.id.slice(4,5);
        const state = "X";
        gameboard.changeState(index, state);
    }
    
    startGame();
})();