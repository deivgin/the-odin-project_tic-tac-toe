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
    function testBtn(){
        const testBtn = document.createElement("button");
        testBtn.innerHTML = "Test";
        return testBtn;
    }
    return {createHeader, createStartBtn, testBtn};
})();

const gameboard = (()=>{
    const gameboard = [];

    function init(){
        //create container for box
        const gameContainer = document.createElement("div");
        gameContainer.className = "gameboard"
        //create 9 objects of box and add them to array
        for(let i=0; i<9; i++){
            //sitam for cikle reiketu kurti naujas dezes su pries tai aprasytom funkcijom
            //Kuriamas objektas manau turetu buti su prototype
            const box = {
                state: '',
                dom: () =>{
                    const gameBox = document.createElement("div");
                    gameBox.className = "gameboard__box";
                    gameBox.id = `box-${i}`;
                    return gameBox;
                },
                changeState: () =>{
                    return console.log("change state");
                }
            }
            gameboard.push(box)
        }
        
        gameboard.map((box)=>{
            gameContainer.appendChild(box.dom())
        })
        return gameContainer
    }

    return { init, gameboard }
})();

const appController = (() => {
    const app = document.getElementById("app");
    const header = components.createHeader();
    const startGameBtn = components.createStartBtn();
    const board = gameboard.init();

    const testBtn = components.testBtn();

    let gameStarted = false;

    //bind events
    startGameBtn.addEventListener("click", startGame)
    testBtn.addEventListener("click", test)
    

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

    function test(){
        //kazkaip reikia pasiekti chang estate funkcija
        console.log(gameboard.gameboard);
    }

    init();
})();