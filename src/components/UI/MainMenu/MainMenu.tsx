import './MainMenu.css'

export default function MainMenu({startCallback}: {startCallback: () => void}) {
    return (
        <div className="main-menu">
            <img src="logo.png" alt="logo" className="menu-logo" />
            <button className="menu-start" onClick={startCallback}>Start Game</button>
        </div>
    )
}