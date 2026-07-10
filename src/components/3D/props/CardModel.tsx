import {useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {CanvasTexture, Group, Mesh} from 'three';
import {useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import type {Vector3} from "three";
import type {Card} from "../../../types/Card.ts";

const ANIM_TIME = 0.06;

export default function CardModel({card, spawn, target}: { card: Card; spawn: Vector3; target: Vector3; }) {
    const {scene} = useGLTF("/models/card.glb");
    const groupRef = useRef<Group>(null);
    const flipRef = useRef<Group>(null);
    const settled = useRef(false);

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
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const symbolImg = new Image();
        symbolImg.src = '/cards/' + card.color + '.png';
        symbolImg.onload = () => {
            const size = 150;
            ctx.drawImage(symbolImg, (512 - size) / 2, (512 - size) / 2, size, size);
            applyTexture();
        };

        ctx.font = 'bold 80px Arial';
        ctx.fillStyle = card.color === "H" || card.color === "D" ? 'red' : 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.value, 60, 60);
        ctx.fillText(card.value, 452, 60);
        ctx.fillText(card.value, 60, 452);
        ctx.fillText(card.value, 452, 452);

        applyTexture();

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
            <group ref={flipRef}>
                <primitive object={clone} rotation={[Math.PI / 2, Math.PI / 2, 0]}/>
            </group>
        </group>
    );
}
