export const GameState = {
    IDLE: 0,
    PLAYER_TURN: 1,
    DEALER_TURN: 2,
    GAME_OVER: 3,
} as const;

export type GameState = typeof GameState[keyof typeof GameState];