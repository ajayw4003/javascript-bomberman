let containerDiv = document.querySelector('#container');

let gameActive = true;
let gameStatus = document.getElementById('resultDisplay');
let winningMessage = () => `win`
let lossMessage =() => `game over`

//helper function
function setAttributes(el, attrs){
    for(var key in attrs){
        el.setAttribute(key, attrs[key]);
    }
}

//creating blocks
for(let i = 1; i<=81; i++){
    let div = document.createElement('div');

    setAttributes(div, {"class": "cell", "id": "cell_"+i});
    // div.innerHTML = i;
    containerDiv.appendChild(div);
}

//creating array of random unique numbers
window.random = [];
while(window.random.length <10){
    var num = Math.floor(Math.random()*81+1);
    if(window.random.indexOf("cell_"+num) === -1){
        window.random.push("cell_"+num);
    }
}
console.log(window.random);


let clickCount = 0;
function displayCell(event){
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("id");
    console.log(clickedCell);
    console.log(clickedCellIndex);
    

    if(!gameActive){
        return;
    }

    const boxCount = 0;
    //check weather clickedCell contains BOMB
    if(window.random.indexOf(clickedCellIndex) !== -1){
        gameActive = false;
        for(var i =0; i<window.random.length; i++){
            var cell = document.getElementById(""+window.random[i]);
            
            cell.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')";
            cell.style.backgroundColor = "red"
        }
        gameStatus.innerHTML = lossMessage();
        return;
    }

    //if clickedCell does not contains BOMB
    let cell1 = document.getElementById(""+clickedCellIndex);
    if(cell1.style.backgroundColor !== "green"){
        cell1.style.backgroundColor = "green";
        document.getElementById("gameScore").innerHTML = ++clickCount;
    }
    
    

    //if player click 70% cell 0f 81 cell withought clicking bomb then he wins the game
    if(clickCount === 71){
        gameActive = false;
        gameStatus.innerHTML = winningMessage();
        return;
    }
    

    
}

function handleRestartGame(){
    gameActive = true;
    clickCount =0
    document.getElementById("gameScore").innerHTML = 0;
    document.getElementById('resultDisplay').innerHTML = "";
    document.querySelectorAll(".cell").forEach(cell =>{cell.style.backgroundColor ="transparent", cell.style.backgroundImage = "", cell.innerHTML = ""});


    //resetting random bomb array
    window.random = [];
    while(window.random.length <10){
        var num = Math.floor(Math.random()*81+1);
        if(window.random.indexOf("cell_"+num) === -1){
            window.random.push("cell_"+num);
        }
    }
    console.log(window.random);
    
}

document
.querySelectorAll('.cell')
.forEach(cell => {cell.addEventListener("click", displayCell)   
});

document.querySelector('.game-restart').addEventListener("click", handleRestartGame);