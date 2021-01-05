//creates dom elements
const createDomElement = (addElement, addClass, addHtml, addId) => {
    const createdElement = document.createElement(addElement);
    addClass ? createdElement.classList.add(addClass) : null
    addHtml ? createdElement.innerHTML = addHtml : null
    addId ? createdElement.setAttribute("id", addId) : null
  
    return createdElement;
  };

const gameboard = ( () => {
    let board = [];
    let count = 1;

    const createBoard = () => {
        const boardContainer = createDomElement("div", "board")
        for(let i=0; i<9; i++){
            boardContainer.appendChild(createDomElement("div","board__box","",count))
            count++;
        }
        return boardContainer;
    };
    
    document.getElementById("app").appendChild(createBoard());

})();

