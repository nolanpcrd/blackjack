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
        get().verifyState();
    },

    hit: () => {
        if (get().gameState !== GameState.PLAYER_TURN) return;

        const newDeck = get().deck;
        const newCard: Card[] = distributeCards(newDeck, 1);
        const newPlayerHand = [...get().playerHand, ...newCard];
        const newPlayerScore = calculateHand(newPlayerHand);

        set({
            deck: newDeck,
            playerHand: newPlayerHand,
            playerScore: newPlayerScore
        });
        get().verifyState();
    },

    stand: () => {
        if (get().gameState !== GameState.PLAYER_TURN) return;

        set({
            gameState: GameState.DEALER_TURN
        });

        let dealerScore = get().dealerScore;
        while (dealerScore < 17) {
            const newDeck = get().deck;
            const newCard: Card[] = distributeCards(newDeck, 1);
            const newDealerHand = [...get().dealerHand, ...newCard];
            dealerScore = calculateHand(newDealerHand);

            set({
                deck: newDeck,
                dealerHand: newDealerHand,
                dealerScore: dealerScore
            });
        }
        get().verifyState();
    },

    verifyState: () => {
        const playerScore = get().playerScore;
        const dealerScore = get().dealerScore;
        const isPlayerTurn = get().gameState === GameState.PLAYER_TURN;
        const winner : GameWinner | null = verifyGameResult(playerScore, dealerScore, isPlayerTurn);

        if (winner !== null) {
            set({
                gameState: GameState.GAME_OVER,
                gameWinner: winner
            });
        }
    },
}));