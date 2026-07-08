import { create } from 'zustand'
import {GameState} from "../types/enums/GameState.ts";
import {calculateHand, createDeck, distributeCards, verifyGameResult} from "../utils/blackjackLogic.ts";
import type {Card} from "../types/Card.ts";
import type {GameWinner} from "../types/enums/GameWinner.ts";
import type {GameStore} from "../types/GameStore.ts";

export const useGameStore = create<GameStore>((set, get) => ({
    deck: [],
    playerHand: [],
    dealerHand: [],
    playerScore: 0,
    dealerScore: 0,
    gameState: GameState.IDLE,
    gameWinner: null,

    initGame: () => {
        const newDeck: Card[] = createDeck();

        const pHand: Card[] = distributeCards(newDeck, 2);
        const dHand: Card[] = distributeCards(newDeck, 2);

        set({
            deck: newDeck,
            playerHand: pHand,
            dealerHand: dHand,
            playerScore: calculateHand(pHand),
            dealerScore: calculateHand(dHand),
            gameState: GameState.PLAYER_TURN
        });
    },

    verifyState: () => {
        const winner : GameWinner | null = verifyGameResult(get().playerScore, get().dealerScore);

        if (winner !== null) {
            set({
                gameState: GameState.GAME_OVER,
                gameWinner: winner
            });
        }
    },
}));