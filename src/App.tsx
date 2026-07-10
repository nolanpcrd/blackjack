import './App.css'
import Scene from "./components/3D/Scene.tsx";
import {useState} from "react";
import MainMenu from "./components/UI/MainMenu/MainMenu.tsx";
import HUD from "./components/UI/HUD/HUD.tsx";
import {useGameStore} from "./store/useGameStore.ts";
import {GameState} from "./types/enums/GameState.ts";
import Results from "./components/UI/Results/Results.tsx";

function App() {
    const [isMainMenuShown, setIsMainMenuShown] = useState<boolean>(true);
    const [isAnimatingCamera, setIsAnimatingCamera] = useState<boolean>(false);

    const gameState = useGameStore(state => state.gameState);
    const playerScore = useGameStore(state => state.playerScore);
    const dealerScore = useGameStore(state => state.dealerScore);

    const showButtons = gameState === GameState.PLAYER_TURN && playerScore <= 21;
    const showResults = gameState === GameState.GAME_OVER;

    const startGame = () => {
        setIsMainMenuShown(false);
        setIsAnimatingCamera(true);
        useGameStore.getState().initGame();
    };

    const handleStand = () => {
        useGameStore.getState().stand();
    };

    const handleHit = () => {
        useGameStore.getState().hit();
    };

    return (
        <>
            <Scene isAnimatingCamera={isAnimatingCamera}>
                <></>
            </Scene>
            {isMainMenuShown && <MainMenu startCallback={startGame} />}
            {!isMainMenuShown && <HUD showButtons={showButtons} hitCallback={handleHit} standCallback={handleStand} playerScore={playerScore} dealerScore={dealerScore}/>}
            {showResults  && <Results onRestart={startGame} />}
        </>
    )
}

export default App
