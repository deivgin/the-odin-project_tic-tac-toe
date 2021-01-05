const appController = (() => {
    const app = document.getElementById("app");
    let gameStart = false;

    function init(){
        if(!gameStart) createStartPage();
    };

    function createStartPage(){
        const startPage = document.createElement("div")
        startPage.classList.add("start-page")
        const header = document.createElement("h1");
        header.classList.add("header")
        header.innerHTML = "Tic-Tac-Toe";

        const startBtn = document.createElement("button");
        startBtn.classList.add("btn");
        startBtn.innerHTML = "Start Game"

        app.appendChild(header);
        app.appendChild(startBtn);
    }

    
    init();
})();