import {useGameStore} from "../../../store/useGameStore.ts";
import type {CasinoAnchors} from "../../../types/CasinoAnchors.ts";
import CardModel from "./CardModel.tsx";
import type {Vector3} from "three";

export default function CardAnimationController({anchors}: { anchors: CasinoAnchors }) {
    const playerHand = useGameStore(state => state.playerHand);
    const dealerHand = useGameStore(state => state.dealerHand);

    if (!anchors.deck) return null;

    return (
        <>
            {playerHand.map((card, index) => {
                const target = anchors.player[index + 1];
                if (!target) return null;
                return <CardModel key={card.id} card={card} spawn={anchors.deck as Vector3} target={target} hidden={false}/>;
            })}

            {dealerHand.map((card, index) => {
                const target = anchors.dealer[index + 1];
                if (!target) return null;
                const hidden = card.hidden !== null && card.hidden === true;
                return <CardModel key={card.id} card={card} spawn={anchors.deck as Vector3} target={target} hidden={hidden}/>;
            })}
        </>
    );
}
