import './App.css'
import Scene from "./features/blackjack/components/Scene.tsx";
import {useState} from "react";
import MainMenu from "./components/UI/MainMenu/MainMenu.tsx";
import HUD from "./components/UI/HUD/HUD.tsx";
import {useGameStore} from "./features/blackjack/store/useGameStore.ts";
import {GameState} from "./features/blackjack/types/enums/GameState.ts";
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

    };

    const handleHit = () => {

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
