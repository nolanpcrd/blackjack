export const GameWinner = {
    PLAYER_WIN: 0,
    DEALER_WIN: 1,
    DRAW: 2
} as const;

export type GameWinner = typeof GameWinner[keyof typeof GameWinner];