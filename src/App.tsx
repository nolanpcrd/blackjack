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
    const gameState = useGameStore(state => state.gameState);

    const showButtons = gameState === GameState.PLAYER_TURN;
    const showResults = gameState === GameState.GAME_OVER;

    const startGame = () => {
        setIsMainMenuShown(false);
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
            <Scene>
                <></>
            </Scene>
            {isMainMenuShown && <MainMenu startCallback={startGame} />}
            {!isMainMenuShown && <HUD showButtons={showButtons} hitCallback={handleHit} standCallback={handleStand}/>}
            {showResults  && <Results onRestart={startGame} />}
        </>
    )
}

export default App
