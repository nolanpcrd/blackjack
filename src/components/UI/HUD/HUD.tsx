import './HUD.css'

export default function HUD({ showButtons, hitCallback, standCallback }: { showButtons: boolean; hitCallback?: () => void; standCallback?: () => void }) {
    return (
        <div className="hud">
            {showButtons && <button className="hud-button hit-button" onClick={hitCallback}>Hit</button>}
            {showButtons && <button className="hud-button stand-button" onClick={standCallback}>Stand</button>}
        </div>
    )
}