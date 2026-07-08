import { Canvas } from "@react-three/fiber";
import PostProcessingEffects from "./utils/PostProcessingEffects.tsx";
import * as React from "react";
import {Environment} from "@react-three/drei";

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 5, 5], fov: 90 }}>
                <Environment files="casino_skybox.jpg" background backgroundIntensity={0.2} />

                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />

                {children}

                <PostProcessingEffects pixelSize={4} />

            </Canvas>
        </div>
    )
}