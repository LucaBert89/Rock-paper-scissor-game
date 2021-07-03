import { possibleChoices } from "./gameRules.js";
import {winnerReport, playAgain} from "./playAgain.js";

function battle(selectedValue, playerHand) {
    const score1 = document.querySelector(".game-board__player1").querySelector(".game-board__score");
    const score2 = document.querySelector(".game-board__player2").querySelector(".game-board__score");
    if(selectedValue === "Cpu vs Cpu") {
        return cpuVsCpu(score1, score2, playerHand);
    } else {
        return humanVsCpu(score1, score2, playerHand);
}

function cpuVsCpu(score1, score2) {
    const scoreManagment = setInterval(score, 1000);
    function score () { 
        const cpu1 = cpuChoice();
        const cpu2 = cpuChoice();
        if(score1.innerText > 0 && score2.innerText > 0) {
            handAnimation(cpu1, cpu2);
            scoreResult(cpu1, cpu2, score1,score2);
        } else {
            clearInterval(scoreManagment);
            winnerReport(score1, score2, playerHand); 
            playAgain(playerHand);
        }
      
    }
}

function humanVsCpu(score1, score2, playerHand) {
    const playerChoice = document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand");
    playerChoice.forEach(e => {
        e.addEventListener("click", handChoice)
        function handChoice (e) {
            const humanPlay = e.target.innerText;
            const cpu = cpuChoice();
            if(score1.innerText > 0 && score2.innerText > 0) {
                handAnimation(humanPlay, cpu);
                return scoreResult(humanPlay, cpu, score1,score2);
            } else {
                playerChoice.forEach(e => {e.removeEventListener("click", handChoice)});
                winnerReport(score1, score2, playerHand); 
                playAgain(playerHand);
            }
        }
    })}
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
            return "player1 winner";
        } else if(player2 === e.hand && player1 === e.beat){
            console.log(player1, player2)
            return "player2 winner";
        }
    }
}

function scoreResult(cpu1, cpu2, score1,score2) {
    if(playAlg(cpu1, cpu2) === "player2 winner") {
        return score1.innerText = score1.innerText -1;
    } else if(playAlg(cpu1, cpu2) === "player1 winner") {
        return score2.innerText = score2.innerText -1;
    } 
}

function handAnimation(player1, player2) {
    const player1Hand = document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand");
    const player2Hand = document.querySelector(".game-board__player2").querySelectorAll(".game-board__hand");
    document.querySelectorAll(".game-board__hand").forEach(e=> e.style.color = "black");

    player1Hand.forEach(e =>{
        if(e.innerText === player1) {
            e.style.color = "red";
        } 
    })

    player2Hand.forEach(e =>{
        if(e.innerText === player2) {
            e.style.color = "red";
        } 
    })
}



export {battle, playAlg, scoreResult};