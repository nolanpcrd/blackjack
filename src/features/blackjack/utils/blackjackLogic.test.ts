import { describe, it, expect } from 'vitest';
import { createDeck, shuffleDeck, calculateHand } from './blackjackLogic';
import type { Card } from '../types/Card';

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
            expect(calculateHand(hand)).toBe(12); // 1 + 1 + 10
        });

        it('should return 0 for an empty hand', () => {
            expect(calculateHand([])).toBe(0);
        });
    });
});