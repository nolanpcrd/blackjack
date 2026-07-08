import './HUD.css'

export default function HUD({ showHit, showStand }: { showHit: boolean; showStand: boolean }) {
    return (
        <div className="hud">
            {showHit && <button className="hud-button hit-button">Hit</button>}
            {showStand && <button className="hud-button stand-button">Stand</button>}
        </div>
    )
}