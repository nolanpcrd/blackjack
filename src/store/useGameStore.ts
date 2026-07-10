import { create } from 'zustand'
import {GameState} from "../types/enums/GameState.ts";
import {GameWinner} from "../types/enums/GameWinner.ts";
import {calculateHand, createDeck, distributeCards, verifyGameResult} from "../utils/blackjackLogic.ts";
import type {Card} from "../types/Card.ts";
import type {GameStore} from "../types/GameStore.ts";

const CARD_ANIMATION_MS = 1000;
const RESULT_DELAY_MS = 2000;
const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

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

        set({
            deck: newDeck,
            playerHand: [],
            dealerHand: [],
            gameState: GameState.PLAYER_TURN
        });
        void (async () => {
            for (let i = 0; i < 4; i++) {
                const isPlayer = i % 2 === 0;
                const newCard: Card[] = distributeCards(get().deck, 1);
                if (isPlayer) {
                    const newHand: Card[] = [...get().playerHand, ...newCard];
                    set({
                        playerHand: newHand,
                        playerScore: calculateHand(newHand),
                    });
                } else {
                    const newHand: Card[] = [...get().dealerHand, ...newCard];
                    set({
                        dealerHand: newHand,
                        dealerScore: calculateHand(newHand),
                    });
                }
                await wait(CARD_ANIMATION_MS);
            }
        })();
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

        set({ gameState: GameState.DEALER_TURN });

        void (async () => {
            await wait(CARD_ANIMATION_MS);

            let dealerScore = get().dealerScore;
            while (dealerScore < 17) {
                const newDeck = get().deck;
                const newCard: Card[] = distributeCards(newDeck, 1);
                const newDealerHand = [...get().dealerHand, ...newCard];
                dealerScore = calculateHand(newDealerHand);

                set({
                    deck: newDeck,
                    dealerHand: newDealerHand,
                    dealerScore,
                });

                await wait(CARD_ANIMATION_MS);
            }

            get().verifyState();
        })();
    },

    verifyState: () => {
        const playerScore = get().playerScore;
        const dealerScore = get().dealerScore;
        const isPlayerTurn = get().gameState === GameState.PLAYER_TURN;
        const winner : GameWinner | null = verifyGameResult(playerScore, dealerScore, isPlayerTurn);
        void (async () => {
            if (winner !== null) {
                await wait(RESULT_DELAY_MS);
                set({
                    gameState: GameState.GAME_OVER,
                    gameWinner: winner
                });
            }
        })();
    },
}));