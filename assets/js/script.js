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
    possibleChoices.forEach(e => {
        const container = document.createElement("div");
        container.className = "game-board__hand";
        container.innerText = e.hand;
        playerHand.appendChild(container);
    })

    if(selectedValue === "Cpu vs Cpu") {
        const cpu1 = cpuChoice();
        const cpu2 = cpuChoice();
        if(cpu1 === cpu2) {
            console.log("pair", cpu1, cpu2);
        } else {
            possibleChoices.forEach(e => {
                if(cpu2 === e.hand && cpu1 === e.beat) {
                    return console.log("winner cpu2",cpu1, cpu2)
                } else if(cpu1 === e.hand && cpu2 === e.beat){
                    return console.log("winner cpu1",cpu1, cpu2);
                }
        })
        }
        
    } 
};



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

