const playerHand = document.querySelector(".game-board__hands");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// When the user clicks on the button, open the modal
btn.addEventListener("click", handCreation);

const selectNofPlayers = document.querySelector("#players");

const possibleChoices = [
    {
        hand: "rock",
        beat: "scissor"
    },
    {
        hand: "paper",
        beat: "rock"
    },
    {
        hand: "scissor",
        beat: "paper"
    }
];

selectNofPlayers.addEventListener("change", function(e) {
    localStorage.setItem("selectedValue", e.target.value);
})


function handCreation() {
   

    const selectedValue = localStorage.getItem("selectedValue");
    modal.style.display = "none";
    for(i=1; i<=2;i++) {
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
    
    const score1 = document.querySelector(".game-board__player1").querySelector(".game-board__score");
    const score2 = document.querySelector(".game-board__player2").querySelector(".game-board__score");
    if(selectedValue === "Cpu vs Cpu") {
           const scoreManagment = setInterval(score, 1000);
            function score () { 
                if(score1.innerText > 0 && score2.innerText > 0) {
                    const cpu1 = cpuChoice();
                    const cpu2 = cpuChoice();
                    handAnimation(cpu1, cpu2);
                    if(playAlg(cpu1, cpu2) === "loser") {
                        score1.innerText = score2.innerText -1;
                    } else if(playAlg(cpu1, cpu2) === "winner") {
                        score2.innerText = score1.innerText -1;
                    } 
                } else {
                    
                    clearInterval(scoreManagment);
                    winnerReport(score1, score2); 
                    playAgain();
                }
              
            }
    } else {
        document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand").forEach(e => {
            e.addEventListener("click", handChoice)
            function handChoice (e) {
                if(score1.innerText > 0 && score2.innerText > 0) {
                    const humanPlay = e.target.innerText;
                    const cpu = cpuChoice();
                    handAnimation(humanPlay, cpu);
                    if(playAlg(humanPlay, cpu) === "loser") {
                        console.log(playAlg(humanPlay, cpu))
                        score1.innerText = score1.innerText -1;
                    } else if(playAlg(humanPlay, cpu) === "winner") {
                        score2.innerText = score2.innerText -1;
                    } 
                } else {
                    document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand").forEach(e => {e.removeEventListener("click", handChoice)});
                    winnerReport(score1, score2); 
                    playAgain();
                }
        }
    })}
};

function handAnimation(player1, player2) {
    document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand").forEach(e=> e.style.color = "black");
    document.querySelector(".game-board__player2").querySelectorAll(".game-board__hand").forEach(e=> e.style.color = "black");
    
    document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand").forEach(e =>{
        if(e.innerText === player1) {
            e.style.color = "red";
        }
    })
    document.querySelector(".game-board__player2").querySelectorAll(".game-board__hand").forEach(e =>{
        if(e.innerText === player2) {
            e.style.color = "red";
        }
    })
}

function winnerReport(score1, score2) {
    const result = document.createElement("div");
    result.className = "game-board__result";
    playerHand.appendChild(result);
    console.log(score1.innerText== 0, score2.innerText == 0);
    if(score1.innerText == 0) {
        result.innerText = "player2 win"
    } else if(score2.innerText == 0) {
        result.innerText = "player1 win"
    }
}

function cpuChoice () {
    const random = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[random].hand;
}


function playAlg(player1, player2) {
    if(player1 === player2) {
        console.log("pair", player1, player2);
        return "pair";
    } else {
        return winner(player1, player2);
        
    }
}

function winner(player1, player2) {
    for (const e of possibleChoices) {
        if(player1 === e.hand && player2 === e.beat) {
            console.log(player1, player2)
            return "winner";
        } else if(player2 === e.hand && player1 === e.beat){
            console.log(player1, player2)
            return "loser";
        }
    }
}

function playAgain() {
    const playAgainBtn = document.createElement("div");
    playAgainBtn.className = "game-board__play-again"
    playAgainBtn.innerText = "do you want to play?"
    playerHand.appendChild(playAgainBtn);

    playAgainBtn.addEventListener("click", function() {
        localStorage.removeItem("selectedValue");
        modal.style.display = "block";
        selectNofPlayers.selectedIndex = 0;
        playerHand.innerHTML = "";
    })
    
}