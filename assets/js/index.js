import { possibleChoices } from "./gameRules.js";
import { battle } from "./gameBattle.js";



window.load = (function() {    
    const openGame = document.querySelector("#myBtn");
    const selectPlayers = document.querySelector("#players");

    openGame.addEventListener("click", handCreation);
    
    selectPlayers.addEventListener("change", function(e) {
        localStorage.setItem("selectedValue", e.target.value);
    })



function handCreation() {
    const modal = document.getElementById("myModal");
    const playerHand = document.querySelector(".game-board__hands");
    const selectedValue = localStorage.getItem("selectedValue");
    modal.style.display = "none";

    for(let i=1; i<=2;i++) {
        playerAndScore(i, playerHand);
    }
    
    battle(selectedValue, playerHand, modal);
    
};

function playerAndScore(i, playerHand) {
    const player = document.createElement("div");
    player.className = `game-board__player${i}`;
    playerHand.appendChild(player);

    possibleChoices.forEach(e => {
        const containerBoard = document.createElement("div");
        containerBoard.className = "game-board__hand";
        containerBoard.innerText = e.hand;
        player.appendChild(containerBoard);
    })
        const score = document.createElement("div");
        score.className = `game-board__score`;
        score.innerText = 10;
        player.appendChild(score); 
}

})();