import {playAlg, scoreResult} from "../assets/js/gameBattle"
import {endGame} from "../assets/js/playAgain"

describe('should return the winner of the game given the hands provided', () => {
    test("should return player2 winner", () => {
        expect(playAlg("scissor","rock")).toBe("player2 winner");
    });
    test("should return player1 winner", () => {
        expect(playAlg("rock","scissor")).toBe("player1 winner");
    });
    test("should return player1 winner", () => {
        expect(playAlg("paper","rock")).toBe("player1 winner");
    });
    test("should return player2 winner", () => {
        expect(playAlg("paper","scissor")).toBe("player2 winner");
    });
    test("should return player2 winner", () => {
        expect(playAlg("paper","paper")).toBe("pair");
    });
})

describe('should return the final winner of the game', () => {
    test("should return player2 win", () => {
        expect(endGame("0","2")).toBe("player2 win");
    });
    test("should return player1 win", () => {
        expect(endGame("2","0")).toBe("player1 win");
    });
})

describe('should return the updated score after one round', () => {
    test("should return 9 updated score for player2", () => {
        expect(scoreResult("scissor","paper", 10)).toBe(9);
    });
    test("should return 10 if pair", () => {
        expect(scoreResult("scissor","scissor", 10)).toBe(10);
    });
})