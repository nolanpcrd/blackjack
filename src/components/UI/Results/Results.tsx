import '../MainMenu/MainMenu.css'
import {useGameStore} from "../../../features/blackjack/store/useGameStore.ts";
import {GameWinner} from "../../../features/blackjack/types/enums/GameWinner.ts";

export default function Results({ onRestart }: { onRestart: () => void }) {
    let imageSrc = '';
    switch (useGameStore.getState().gameWinner) {
        case GameWinner.PLAYER_WIN:
            imageSrc = 'winner.png';
            break;
        case GameWinner.DEALER_WIN:
            imageSrc = 'loser.png';
            break;
        case GameWinner.DRAW:
            imageSrc = 'draw.png';
            break;
    }
    return (
        <div className="main-menu">
            <img src={imageSrc} alt="game result" className="menu-logo" />
            <button className="menu-start" onClick={onRestart}>Restart Game</button>
        </div>
    )
}