import type {Card} from "../types/Card.ts";
import {GameWinner} from "../types/enums/GameWinner.ts";

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

    shuffleDeck(deck);
    return deck
}

/**
 * Shuffles the given deck
 * @param deck A deck that is just an array of cards (CardModel[])
 */
export function shuffleDeck(deck: Card[]) {
    let currentIndex: number = deck.length;
    while (currentIndex !== 0) {
        const randomIndex: number = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
}

/**
 * Calculates the score of a hand of cards
 * @param hand the hand that is just an array of cards (CardModel[])
 * @returns {number} the score of the hand
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

/**
 *
 * @param playerScore the score of the player
 * @param dealerScore the score of the dealer
 * @param isPlayerTurn a bool that says if it's currently the player turn
 * @returns {GameWinner | null} the winner if there's one, else null
 */
export function verifyGameResult(playerScore: number, dealerScore: number, isPlayerTurn: boolean): GameWinner | null {
    if (playerScore > 21) {
        return GameWinner.DEALER_WIN;
    } else if (isPlayerTurn) {
        return null;
    }
    else if (dealerScore < 17) {
        return null;
    } else if (dealerScore > 21) {
        return GameWinner.PLAYER_WIN;
    } else if (playerScore > dealerScore) {
        return GameWinner.PLAYER_WIN;
    } else if (dealerScore > playerScore) {
        return GameWinner.DEALER_WIN;
    }
    return GameWinner.DRAW;
}

/**
 * distribute cards from the deck
 * @param deck the deck where we take cards
 * @param quantity the qtt of cards wanted
 * @returns {Card[]} the distributed cards
 */
export function distributeCards(deck: Card[], quantity: number): Card[] {
    return deck.splice(-quantity);
}