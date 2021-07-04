
function winnerReport(score1, score2, playerHand) {
    const result = document.createElement("div");
    result.className = "game-board__result";
    playerHand.appendChild(result);
    result.innerText = endGame(score1, score2);
}

function endGame(score1, score2) {
    if(score1 == 0) {
        return "player2 win";
    } else if(score2== 0) {
        return "player1 win";
    }
}

function playAgain(playerHand, modal) {
    const playAgainBtn = document.createElement("div");
    playAgainBtn.className = "game-board__play-again"
    playAgainBtn.innerText = "do you want to play?"
    playerHand.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", function() {
        localStorage.removeItem("selectedValue");
        modal.style.display = "block";
        document.querySelector("#players").selectedIndex = 0;
        playerHand.innerHTML = "";
    })
    
}

export {winnerReport, playAgain, endGame};