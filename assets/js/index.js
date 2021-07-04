import { possibleChoices } from "./gameRules.js";
import { battle } from "./gameBattle.js";



window.load = (function() {    
    const openGame = document.querySelector(".start-game__btn");
    const selectPlayers = document.querySelector("#players");
    localStorage.removeItem("selectedValue");
    // open the game button to create the board of the game
    openGame.addEventListener("click", handCreation);
    
    // selection of the game type: cpu vs cpu or human vs cpu
    selectPlayers.addEventListener("change", function(e) {
        localStorage.setItem("selectedValue", e.target.value);
    })


//creation of the game
function handCreation() {
    document.querySelector(".start-game__selector").style.borderColor = "#fff"
    document.querySelector(".start-game__selector").style.borderWidth = "1px"
    const selectedValue = localStorage.getItem("selectedValue");
    if(selectedValue !== null) {
        const modal = document.querySelector(".start-game__modal");
        const playerHand = document.querySelector(".game-board__hands");
        

        // create the two players and the scores
        for(let i=1; i<=2;i++) {
            playerAndScore(i, playerHand);
        }
        // call the battle function with the algorithm of the game
    
        modal.style.display = "none";
        battle(selectedValue, playerHand, modal);
    } else {
        document.querySelector(".start-game__selector").style.borderColor = "red"
        document.querySelector(".start-game__selector").style.borderWidth = "5px"
    }
};

function playerAndScore(i, playerHand) {
    const player = document.createElement("div");
    player.className = `game-board__player${i}`;
    playerHand.appendChild(player);

    // creation of the board with the hands
    possibleChoices.forEach(e => {
        const containerBoard = document.createElement("img");
        containerBoard.className = "game-board__hand";
        containerBoard.src = `./assets/images/${e.hand}.svg`;
        containerBoard.setAttribute("data", e.hand);
        containerBoard.style.height = document.querySelector(".game-board__hands").offsetHeight/possibleChoices.length + "px";
        player.appendChild(containerBoard);
    })
        const score = document.createElement("div");
        score.className = `game-board__score`;
        const scorePlayer = document.createElement("div");
        scorePlayer.className = "game-board__score-player";
        scorePlayer.innerText = `player${i} score:`;
        const scoreNumber = document.createElement("div");
        scoreNumber.className = "game-board__score-total"
        scoreNumber.innerText = 10;
        
        score.appendChild(scorePlayer);
        score.appendChild(scoreNumber);
        player.appendChild(score); 
}

})();