import { possibleChoices } from "./gameRules.js";
import {winnerReport, playAgain} from "./playAgain.js";

function battle(selectedValue, playerHand, modal) {
    const score1 = document.querySelector(".game-board__player1").querySelector(".game-board__score");
    const score2 = document.querySelector(".game-board__player2").querySelector(".game-board__score");

    // difference function if you choose a Cpu vs cpu or human vs cpu type of game
    if(selectedValue === "Cpu vs Cpu") {
        return cpuVsCpu(score1, score2, playerHand, modal);
    } else {
        return humanVsCpu(score1, score2, playerHand, modal);
}

function cpuVsCpu(score1, score2, playerHand, modal) {
    // setting an interval of one second for the cpu moves
    const scoreManagment = setInterval(score, 1000);
    function score () { 
        // cpuChoice function to select a random move of the CPU
        const cpu1 = cpuChoice();
        const cpu2 = cpuChoice();
        //if the scores are bigger than 0 the game continues else interval stops and the report appear
        if(score1.innerText > 0 && score2.innerText > 0) {
            handAnimation(cpu1, cpu2);
            scoreResult(cpu1, cpu2, score1,score2);
        } else {
            clearInterval(scoreManagment);
            winnerReport(score1.innerText, score2.innerText, playerHand); 
            playAgain(playerHand, modal);
        }
      
    }
}

function humanVsCpu(score1, score2, playerHand,modal) {
    const playerChoice = document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand");
    playerChoice.forEach(e => {
        e.addEventListener("click", handChoice)
        // click on the selected hand to play
        function handChoice (e) {
            const humanPlay = e.target.innerText;
            const cpu = cpuChoice();
            if(score1.innerText > 0 && score2.innerText > 0) {
                handAnimation(humanPlay, cpu);
                /* this ternary operator is made to make the scoreResult function testable, 
                depending on the winner of each round the score of the opponent'll update
                */
                return playAlg(humanPlay, cpu) === "player2 winner"? score1.innerText = scoreResult(humanPlay, cpu, score1.innerText) : score2.innerText = scoreResult(humanPlay, cpu, score2.innerText);
            } else {
                // the game ends and you can't click anymore, a winnerReport and playAgain is called
                playerChoice.forEach(e => {e.removeEventListener("click", handChoice)});
                winnerReport(score1.innerText, score2.innerText, playerHand); 
                playAgain(playerHand, modal);
            }
        }
    })}
}

function cpuChoice () {
    const random = Math.floor(Math.random() * possibleChoices.length);
    // random selection of the hand from possibleChoices array of objects
    return possibleChoices[random].hand;
}

function scoreResult(player1, player2, score) {
    // if the score is not pair it'll be updated else not
    return (playAlg(player1, player2) !== "pair") ? score -1 : score;
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
        // selection who has the winner or loser hand
        if(player1 === e.hand && player2 === e.loser) {
            console.log(player1, player2)
            return "player1 winner";
        } else if(player2 === e.hand && player1 === e.loser){
            console.log(player1, player2)
            return "player2 winner";
        }
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