import './HUD.css'

export default function HUD({ showButtons, hitCallback, standCallback, playerScore, dealerScore }: { showButtons: boolean; hitCallback?: () => void; standCallback?: () => void; playerScore: number; dealerScore: number }) {
    return (
        <>
            <div className="hud-buttons">
                {showButtons && <button className="hud-button hit-button" onClick={hitCallback}>Hit</button>}
                {showButtons && <button className="hud-button stand-button" onClick={standCallback}>Stand</button>}
            </div>
            <div className="hud-scores">
                <div className="hud-score player-score">Player: {playerScore}</div>
                <div className="hud-score dealer-score">Dealer: {dealerScore}</div>
            </div>
        </>

    )
}