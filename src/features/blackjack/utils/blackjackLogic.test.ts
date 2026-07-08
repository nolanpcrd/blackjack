import { describe, it, expect } from 'vitest';
import {createDeck, shuffleDeck, calculateHand, verifyGameResult, distributeCards} from './blackjackLogic';
import type { Card } from '../types/Card';
import {GameWinner} from "../types/enums/GameWinner.ts";

describe('Blackjack Logic', () => {
    describe('createDeck', () => {
        it('should create a deck of 52 cards', () => {
            const deck: Card[] = createDeck();
            expect(deck).toHaveLength(52);
        });

        it('should contain unique cards (so unique ids)', () => {
            const deck: Card[] = createDeck();
            const ids: string[] = deck.map(card => card.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(52);
        });
    });

    describe('shuffleDeck', () => {
        it('should keep 52 cards', () => {
            const deck: Card[] = createDeck();
            shuffleDeck(deck);
            expect(deck).toHaveLength(52);
        });

        it('should modify the order of cards', () => {
            const deck: Card[] = createDeck();
            const originalIds: string[] = deck.map(c => c.id);

            shuffleDeck(deck);
            const shuffledIds: string[] = deck.map(c => c.id);

            expect(shuffledIds).not.toEqual(originalIds);
        });
    });

    describe('calculateHand', () => {
        it('should calculate simple (2-10) cards', () => {
            const hand: Card[] = [
                { id: '2S', value: '2', color: 'S' },
                { id: '5D', value: '5', color: 'D' },
                { id: '9C', value: '9', color: 'C' }
            ];
            expect(calculateHand(hand)).toBe(16);
        });

        it('should count heads as 10 points', () => {
            const hand: Card[] = [
                { id: 'JS', value: 'J', color: 'S' },
                { id: 'QD', value: 'Q', color: 'D' },
                { id: 'KC', value: 'K', color: 'C' }
            ];
            expect(calculateHand(hand)).toBe(30);
        });

        it('should count an A as 11 if score does not overflows', () => {
            const hand: Card[] = [
                { id: '7S', value: '7', color: 'S' },
                { id: 'AH', value: 'A', color: 'H' }
            ];
            expect(calculateHand(hand)).toBe(18);
        });

        it('should count an A as 1 if score overflows', () => {
            const hand: Card[] = [
                { id: '10S', value: '10', color: 'S' },
                { id: 'KD', value: 'K', color: 'D' },
                { id: 'AH', value: 'A', color: 'H' }
            ];
            expect(calculateHand(hand)).toBe(21);
        });

        it('should handle multiple A', () => {
            const hand: Card[] = [
                { id: 'AS', value: 'A', color: 'S' },
                { id: 'AD', value: 'A', color: 'D' },
                { id: 'AC', value: 'A', color: 'C' }
            ];
            expect(calculateHand(hand)).toBe(13);
        });

        it('should lower multiple A if a big card happens', () => {
            const hand: Card[] = [
                { id: 'AS', value: 'A', color: 'S' },
                { id: 'AD', value: 'A', color: 'D' },
                { id: '10C', value: '10', color: 'C' }
            ];
            expect(calculateHand(hand)).toBe(12);
        });

        it('should return 0 for an empty hand', () => {
            expect(calculateHand([])).toBe(0);
        });
    });

    describe('verifyGameResult', () => {
        it('should return PLAYER_WIN if player score is higher than dealer score', () => {
            const playerScore = 20;
            const dealerScore = 18;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(GameWinner.PLAYER_WIN);
        });
        it('should return PLAYER_WIN if the dealer bust and not the player', () => {
            const playerScore = 10;
            const dealerScore = 22;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(GameWinner.PLAYER_WIN);
        });
        it('should return DRAW if the dealer and the player have the same score', () => {
            const playerScore = 20;
            const dealerScore = 20;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(GameWinner.DRAW);
        });
        it('should return DEALER_WIN if the player and the dealer busted', () => {
            const playerScore = 22;
            const dealerScore = 22;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(GameWinner.DEALER_WIN);
        });
        it('should retuen DEALER_WIN if the dealer score is higher than player score', () => {
            const playerScore = 18;
            const dealerScore = 20;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(GameWinner.DEALER_WIN);
        });
        it('should return null if the player has less than 21 and the dealer didn\'t finished to draw (less than 17)', () => {
            const playerScore = 20;
            const dealerScore = 16;
            expect(verifyGameResult(playerScore, dealerScore)).toBe(null);
        });
    });

    describe('distributeCards', () => {
        it('should return the quantity of cards wanted', () => {
            const deck: Card[] = createDeck();
            const quantity = 5;
            const distributedCards: Card[] = distributeCards(deck, quantity);
            expect(distributedCards).toHaveLength(quantity);
        });
        it('should remove the cards distributed from the deck', () => {
            const deck: Card[] = createDeck();
            const quantity = 5;
            const originalDeckLength = deck.length;
            distributeCards(deck, quantity);
            expect(deck).toHaveLength(originalDeckLength - quantity);
        });
    });
});