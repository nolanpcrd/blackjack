import {useGLTF} from "@react-three/drei";
import {useLayoutEffect, useRef, useState} from "react";
import type {Object3D} from "three";
import {Vector3} from "three";
import type {CasinoAnchors} from "../../../types/CasinoAnchors.ts";
import CardAnimationController from "./CardAnimationController.tsx";

const PLAYER_HAND_SLOTS = 11;
const DEALER_HAND_SLOTS = 10;

function initAnchors(root: Object3D): CasinoAnchors {
    root.updateMatrixWorld(true);

    const deckObject = root.getObjectByName("deck_pos");
    const player: Record<number, Vector3> = {};
    const dealer: Record<number, Vector3> = {};

    for (let i = 1; i <= PLAYER_HAND_SLOTS; i++) {
        const anchor = root.getObjectByName(`player_hand_${i}`);
        if (anchor) player[i] = anchor.getWorldPosition(new Vector3());
    }

    for (let i = 1; i <= DEALER_HAND_SLOTS; i++) {
        const anchor = root.getObjectByName(`dealer_hand_${i}`);
        if (anchor) dealer[i] = anchor.getWorldPosition(new Vector3());
    }

    return {
        deck: deckObject ? deckObject.getWorldPosition(new Vector3()) : null,
        player,
        dealer,
    };
}

export default function CasinoScene() {
    const {scene} = useGLTF("/models/casino.glb");
    const rotation = -Math.PI + Math.PI / 4;
    const rootRef = useRef<Object3D>(null);
    const [anchors, setAnchors] = useState<CasinoAnchors>({deck: null, player: {}, dealer: {}});

    useLayoutEffect(() => {
        if (rootRef.current) setAnchors(initAnchors(rootRef.current));
    }, [scene]);

    return (
        <>
            <primitive ref={rootRef} object={scene} scale={30} position={[0, 0, 0]} rotation={[0, rotation, 0]}/>
            <CardAnimationController anchors={anchors}/>
        </>
    );
}
