import './App.css'
import Scene from "./features/blackjack/components/Scene.tsx";
import {useState} from "react";
import MainMenu from "./components/UI/MainMenu/MainMenu.tsx";

function App() {
    const [isMainMenuShown, setIsMainMenuShown] = useState(true);

    const maskMainMenu = () => {
        setIsMainMenuShown(false);
    };

    return (
        <>
            <Scene>
                <></>
            </Scene>
            {isMainMenuShown && <MainMenu startCallback={maskMainMenu} />}
        </>
    )
}

export default App
