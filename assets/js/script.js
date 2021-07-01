const playerHand = document.querySelector(".game-board__hands");


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

(function handCreation() {
    possibleChoices.forEach(e => {
        const container = document.createElement("div");
        container.className = "game-board__hand";
        container.innerText = e.hand;

        playerHand.appendChild(container);
    })
})();


function cpuChoice () {
    const random = Math.floor(Math.random() * possibleChoices.length);
    return possibleChoices[random].hand;
}

playerHand.addEventListener("click", function (e) {
    const humanPlay = e.target.innerText;
    possibleChoices.forEach(e => {
        if(e.hand === humanPlay) {
            const cpu = cpuChoice();
            if(humanPlay === cpu) {
                console.log("pair", humanPlay, cpu);
            } else if(cpu === e.beat) {
                console.log("winner",humanPlay, cpu)
            } else {
                console.log("loser",humanPlay, cpu);
            }
        }
    })
})

