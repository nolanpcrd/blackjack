import {useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {CanvasTexture, Group, Mesh} from 'three';
import {useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import type {Vector3} from "three";
import type {Card} from "../../../types/Card.ts";

const ANIM_TIME = 0.06;

export default function CardModel({card, spawn, target, hidden}: { card: Card; spawn: Vector3; target: Vector3; hidden: boolean }) {
    const {scene} = useGLTF("/models/card.glb");
    const groupRef = useRef<Group>(null);
    const settled = useRef(false);
    const rotation = useMemo(() => {
        return hidden ? [Math.PI / 2, Math.PI / 2, Math.PI] : [Math.PI / 2, Math.PI / 2, 0];
    }, [hidden]);

    const clone = useMemo(() => {
        const cloned = scene.clone(true);
        cloned.traverse((child) => {
            if (child instanceof Mesh && child.material) {
                child.material = child.material.clone();
            }
        });
        return cloned;
    }, [scene]);

    useLayoutEffect(() => {
        settled.current = false;
        const group = groupRef.current;
        group?.position.copy(spawn);
    }, [card.id, spawn]);


    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 244;
        canvas.height = 396;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const symbolImg = new Image();
        symbolImg.src = '/cards/' + card.color + '.png';

        symbolImg.onload = () => {
            const symbolSize = 60;
            const margin = 10;

            ctx.drawImage(symbolImg, margin, margin, symbolSize, symbolSize);
            ctx.drawImage(symbolImg, canvas.width - margin - symbolSize, margin, symbolSize, symbolSize);
            ctx.drawImage(symbolImg, margin, canvas.height - margin - symbolSize, symbolSize, symbolSize);
            ctx.drawImage(symbolImg, canvas.width - margin - symbolSize, canvas.height - margin - symbolSize, symbolSize, symbolSize);

            applyTexture();
        };

        ctx.font = 'bold 180px Arial';
        ctx.fillStyle = card.color === "H" || card.color === "D" ? 'red' : 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.value, canvas.width / 2, canvas.height / 2);

        function applyTexture() {
            const texture = new CanvasTexture(canvas);
            texture.flipY = false;
            texture.center.set(0.5, 0.5);
            texture.rotation = Math.PI;
            const mesh = clone.getObjectByName("card_face");

            if (mesh instanceof Mesh && mesh.material) {
                mesh.material.map = texture;
                mesh.material.needsUpdate = true;
            }
        }
    }, [card, clone]);

    useFrame(() => {
        const group = groupRef.current;
        if (!group || settled.current) return;

        group.position.lerp(target, ANIM_TIME);

        if (group.position.distanceTo(target) < ANIM_TIME) {
            group.position.copy(target);
            settled.current = true;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={clone} scale={1.3} rotation={rotation}/>
        </group>
    );
}
