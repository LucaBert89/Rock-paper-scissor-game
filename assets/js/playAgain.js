
function winnerReport(score1, score2, playerHand) {
    const result = document.createElement("div");
    result.className = "game-board__result";
    playerHand.appendChild(result);
    console.log(score1.innerText== 0, score2.innerText == 0);
    if(score1.innerText == 0) {
        return result.innerText = "player2 win"
    } else if(score2.innerText == 0) {
        return result.innerText = "player1 win"
    }
}

function playAgain(playerHand) {
    const playAgainBtn = document.createElement("div");
    playAgainBtn.className = "game-board__play-again"
    playAgainBtn.innerText = "do you want to play?"
    playerHand.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", function() {
        localStorage.removeItem("selectedValue");
        modal.style.display = "block";
        selectPlayers.selectedIndex = 0;
        playerHand.innerHTML = "";
    })
    
}

export {winnerReport, playAgain};