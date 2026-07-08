import type {Card} from "../types/Card.ts";

const COLORS: string[] = ["S", "D", "C", "H"];
const VALUES: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

/**
 * Creates a deck of cards with all values and color possibilities
 * @returns {Card[]} An array of cards that represent the deck
 */
export function createDeck(): Card[] {
    const deck : Card[] = [];

    for (const value of VALUES) {
        for (const color of COLORS) {
            deck.push({
                id: `${value}${color}`,
                color: color,
                value: value
            });
        }
    }

    return shuffleDeck(deck);
}

/**
 * Shuffles the given deck
 * @param deck A deck that is just an array of cards (Card[])
 * @return {Card[]} The same deck but shuffled
 */
export function shuffleDeck(deck: Card[]): Card[] {
    let currentIndex: number = deck.length;
    while (currentIndex != 0) {
        const randomIndex: number = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

/**
 * Calculates the score of a hand of cards
 * @param hand the hand that is just an array of cards (Card[])
 * @return {number} the score of the hand
 */
export function calculateHand(hand: Card[]): number {
    let score = 0;
    let aces = 0;
    const heads = ["J", "Q", "K"];

    hand.forEach((card: Card) => {
        if (heads.includes(card.value)) {
            score += 10;
        } else if (card.value === "A") {
            score += 11;
            aces++;
        } else {
            score += parseInt(card.value);
        }
    });

    while (score > 21 && aces > 0) { // pass some aces to 1 if the score overflows
        score -= 10;
        aces--;
    }

    return score;
}

