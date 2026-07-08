import './App.css'
import Scene from "./features/blackjack/components/Scene.tsx";
import {useState} from "react";
import MainMenu from "./components/UI/MainMenu/MainMenu.tsx";
import HUD from "./components/UI/HUD/HUD.tsx";
import {useGameStore} from "./features/blackjack/store/useGameStore.ts";
import {GameState} from "./features/blackjack/types/enums/GameState.ts";

function App() {
    const [isMainMenuShown, setIsMainMenuShown] = useState<boolean>(true);
    const showButtons : boolean = useGameStore.getState().gameState === GameState.PLAYER_TURN;
    const maskMainMenu = () => {
        setIsMainMenuShown(false);
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
            {isMainMenuShown && <MainMenu startCallback={maskMainMenu} />}
            {!isMainMenuShown && <HUD showButtons={showButtons} hitCallback={handleHit} standCallback={handleStand}/>}
        </>
    )
}

export default App
