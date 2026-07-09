import type {Card} from "./Card.ts";
import {GameState} from "./enums/GameState.ts";
import type {GameWinner} from "./enums/GameWinner.ts";

interface GameMemory {
    deck: Card[],
    playerHand: Card[],
    dealerHand: Card[],
    playerScore: number,
    dealerScore: number,
    gameState: GameState,
    gameWinner: GameWinner | null,
}

interface GameActions {
    initGame: () => void;
    verifyState: () => void;
    hit: () => void;
    stand: () => void;
}

export type GameStore = GameMemory & GameActions;