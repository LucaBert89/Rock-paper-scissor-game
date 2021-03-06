
function winnerReport(score1, score2, gameBoard) {
    // game is ended and a report appear with the winner
    const result = document.createElement("div");
    result.className = "game-board__result";
    gameBoard.appendChild(result);
    result.innerText = endGame(score1, score2);
}

function endGame(score1, score2) {
    if(score1 == 0) {
        return "player2 win";
    } else if(score2== 0) {
        return "player1 win";
    }
}

function playAgain(gameBoard, modal, playerHand) {
    // you want to play again div is created
    const playAgainBtn = document.createElement("div");
    playAgainBtn.className = "game-board__play-again"
    playAgainBtn.innerText = "Play again?"
    gameBoard.appendChild(playAgainBtn);
    // clicking on playAgain the game'll start over and the value of the previous game are deleted
    playAgainBtn.addEventListener("click", function() {
        localStorage.removeItem("selectedValue");
        modal.style.display = "block";
        document.querySelector("#players").selectedIndex = 0;
        document.querySelectorAll(".game-board__result").forEach(e => e.innerHTML = "");
        playerHand.innerHTML = "";
        playAgainBtn.remove();
    })
    
}

export {winnerReport, playAgain, endGame};