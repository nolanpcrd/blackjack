import { create } from 'zustand'
import {GameState} from "../types/enums/GameState.ts";
import {GameWinner} from "../types/enums/GameWinner.ts";
import {calculateHand, createDeck, distributeCards, verifyGameResult} from "../utils/blackjackLogic.ts";
import type {Card} from "../types/Card.ts";
import type {GameStore} from "../types/GameStore.ts";

const CARD_ANIMATION_MS = 1000;
const RESULT_DELAY_MS = 3000;
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

        if (newPlayerScore > 21) {
            void (async () => {
                await wait(CARD_ANIMATION_MS);
                set({
                    gameState: GameState.GAME_OVER,
                    gameWinner: GameWinner.DEALER_WIN,
                });
            })();
        }
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

            await wait(RESULT_DELAY_MS);

            const winner = verifyGameResult(get().playerScore, get().dealerScore, false);
            set({
                gameState: GameState.GAME_OVER,
                gameWinner: winner,
            });
        })();
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