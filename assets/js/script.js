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
    const gameBoard = document.querySelector(".game-board");
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
    
    
    if(selectedValue === "Cpu vs Cpu") {
        const score1 = document.querySelector(".game-board__player1").querySelector(".game-board__score");
        const score2 = document.querySelector(".game-board__player2").querySelector(".game-board__score");
             setInterval(function() { 
                const cpu1 = cpuChoice();
                const cpu2 = cpuChoice();
                if(score1.innerText > 0 && score2.innerText > 0) {
                    if(playAlg(cpu1, cpu2) === "loser") {
                        score2.innerText = score2.innerText -1;
                    } else {
                        score1.innerText = score1.innerText -1;
                    }
                } else {
                    clearInterval();
                }
              
            }, 1000);

        
        /*while (score.innerText >= 0) {
            setInterval(function(){ 
                if(playAlg(cpu1, cpu2) === cpu1) {
                    score.innerText = score.innerText -1;
                }
            }, 1000);
        }*/
    } else {
        playerHand.addEventListener("click", function (e) {
            const humanPlay = e.target.innerText;
            const cpu = cpuChoice();
            playAlg(humanPlay, cpu);
        })
    }
};



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
            return "winner";
        } else if(player2 === e.hand && player1 === e.beat){
            return "loser";
        }
    }
}