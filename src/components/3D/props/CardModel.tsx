import { useEffect } from 'react';
import {CanvasTexture, Mesh} from 'three';
import { useGLTF } from '@react-three/drei';
import type {Card} from "../../../types/Card.ts";

export default function CardModel({ card }: { card: Card }) {
    const { scene } = useGLTF("/models/card.glb");

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const symbolImg = new Image();
            symbolImg.src = '../../../../public/cards/' + card.color + '.png';
            symbolImg.onload = () => {
                const size = 150;
                ctx.drawImage(symbolImg, (512 - size) / 2, (512 - size) / 2, size, size);
                updateTexture();
            };

            ctx.font = 'bold 80px Arial';
            if (card.color === "H" || card.color === "D") ctx.fillStyle = 'red'
            else ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const value: string = card.value;
            ctx.fillText(value, 60, 60);
            ctx.fillText(value, 452, 60);
            ctx.fillText(value, 60, 452);
            ctx.fillText(value, 452, 452);
        }


        function updateTexture() {
            const texture = new CanvasTexture(canvas);
            texture.flipY = false;
            const mesh = scene.getObjectByName("card_face");

            if (mesh instanceof Mesh && mesh.material) {
                mesh.material.map = texture;
                mesh.material.needsUpdate = true;
            }
        }
        updateTexture();
    }, [card, scene]);

    return <primitive object={scene} scale={2} position={[0, 10, 0]} rotation={[0, -Math.PI/2, 0]} />;
}