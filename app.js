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
    function createGameBoard(){
        const gameContainer = document.createElement("div");
        gameContainer.className = "gameboard"
        return gameContainer
    }
    function createGameBox(index){
        const gameBox = document.createElement("div");
        gameBox.className = "gameboard__box";
        gameBox.id = `box-${index}`;
        return gameBox;
    }
    function testBtn(){
        const testBtn = document.createElement("button");
        testBtn.innerHTML = "Test";
        return testBtn;
    }
    return {createHeader, createStartBtn, createGameBoard, createGameBox, testBtn};
})();

//this bad boy should create the gameboard and controll its things
//perhaps only here things about it should change
const gameboard = (()=>{
    gameContainer = components.createGameBoard();
    const gameboard = [];

    function init(){

        for(let i=0; i<9; i++){
            const box = {
                state: '',
                dom: (click) =>{
                    let box = components.createGameBox(i)
                    box.addEventListener("click", click);
                    return box
                },
                changeState: (state) => console.log("State changed")
            }
            gameboard.push(box)
        }

        gameboard.map((box)=>{
            gameContainer.appendChild(box.dom())
        })
        return gameContainer
    }

    function getGameboard(){return gameboard}

    return { init, getGameboard }
})();

//this here controls the flow of the game, so i suppose
//it should only do that
//like start game, say who won, etc.
const appController = (() => {
    const app = document.getElementById("app");
    const header = components.createHeader();
    const startGameBtn = components.createStartBtn();
    const board = gameboard.init();
    const gameboardArray = gameboard.getGameboard();

    const testBtn = components.testBtn();

    let gameStarted = false;

    //bind events
    startGameBtn.addEventListener("click", startGame)
    testBtn.addEventListener("click", test);

    function init(){
        app.appendChild(testBtn)
        app.appendChild(header);
        // app.appendChild(startGameBtn);
        app.appendChild(board);
    };

    function startGame(){
        startGameBtn.remove();
        app.appendChild(board);
    }

    //delet later, for testing pupaces
    function test(){
        //kazkaip reikia pasiekti chang estate funkcija
        console.log(gameboardArray);
    }

    init();
})();