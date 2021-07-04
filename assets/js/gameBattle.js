import { possibleChoices } from "./gameRules.js";
import {winnerReport, playAgain} from "./playAgain.js";



function battle(selectedValue, playerHand, modal) {
    const gameBoard = document.querySelector(".game-board");
    const score1 = document.querySelector(".game-board__player1").querySelector(".game-board__score");
    const score2 = document.querySelector(".game-board__player2").querySelector(".game-board__score");

    // difference function if you choose a Cpu vs cpu or human vs cpu type of game
    if(selectedValue === "Cpu vs Cpu") {
        return cpuVsCpu(score1, score2, gameBoard, modal, playerHand);
    } else {
        return humanVsCpu(score1, score2, gameBoard, modal, playerHand);
}

function cpuVsCpu(score1, score2, gameBoard, modal, playerHand) {
    // setting an interval of one second for the cpu moves
    const scoreManagment = setInterval(score, 1000);
    function score () { 
        // cpuChoice function to select a random move of the CPU
        const cpu1 = cpuRandom();
        const cpu2 =cpuRandom();
        //if the scores are bigger than 0 the game continues else interval stops and the report appear
        if(score1.innerText > 0 && score2.innerText > 0) {
            handAnimation(cpu1, cpu2);
            return playAlg(cpu1, cpu2) === "player2 winner"? score1.innerText = scoreResult(cpu1, cpu2, score1.innerText) : score2.innerText = scoreResult(cpu1, cpu2, score2.innerText);
        } else {
            clearInterval(scoreManagment);
            winnerReport(score1.innerText, score2.innerText, gameBoard); 
            playAgain(gameBoard, modal, playerHand);
        }
      
    }
}

function humanVsCpu(score1, score2, gameBoard,modal, playerHand) {
        const playerChoice = document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand");
        let game = true;
        playerChoice.forEach(e => {
            playerChoice.forEach(event => event.removeEventListener("click", handChoice));
            e.addEventListener("click", handChoice)
            // click on the selected hand to play
            function handChoice (e) {
                const humanPlay = e.target.getAttribute("data");
                const cpu = cpuRandom();
                if(game) {
                    if(score1.innerText > 0 && score2.innerText > 0) {
                    
                        handAnimation(humanPlay, cpu);
                        /* this ternary operator is made to make the scoreResult function testable, 
                        depending on the winner of each round the score of the opponent'll update
                        */
                        return playAlg(humanPlay, cpu) === "player2 winner"? score1.innerText = scoreResult(humanPlay, cpu, score1.innerText) : score2.innerText = scoreResult(humanPlay, cpu, score2.innerText);
                    } else {
                        game = false;
                        // the game ends and you can't click anymore, a winnerReport and playAgain is called
                        playerChoice.forEach(event => event.removeEventListener("click", handChoice));
                        winnerReport(score1.innerText, score2.innerText, gameBoard); 
                        playAgain(gameBoard, modal, playerHand);
                    }
                } else {
                    return;
                }
             
            }
        })
    }
}

function cpuRandom () {
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
        return "pair";
    } else {
        return winner(player1, player2);
        
    }
}

function winner(player1, player2) {
    for (const e of possibleChoices) {
        // selection who has the winner or loser hand
        if(player1 === e.hand && player2 === e.loser) {
            return "player1 winner";
        } else if(player2 === e.hand && player1 === e.loser){
            return "player2 winner";
        }
    }
}



function handAnimation(player1, player2) {
    const player1Hand = document.querySelector(".game-board__player1").querySelectorAll(".game-board__hand");
    const player2Hand = document.querySelector(".game-board__player2").querySelectorAll(".game-board__hand");
    player1Hand.forEach(e =>{
        if(e.getAttribute("src") === `./assets/images/${player1}.svg`) {
            e.style.transform = "translateX(150%)"
        } 
    })

    player2Hand.forEach(e =>{
        if(e.getAttribute("src") === `./assets/images/${player2}.svg`) {
            e.style.transform = "translateX(-150%)"
        } 
    })
   
    setTimeout(function(){ 
        document.querySelectorAll(".game-board__hand").forEach(e=> e.style.transform = "translateX(0px)");
     }, 500);
   
}



export {battle, playAlg, scoreResult};