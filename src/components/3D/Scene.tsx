import { Canvas } from "@react-three/fiber";
import PostProcessingEffects from "./utils/PostProcessingEffects.tsx";
import * as React from "react";
import CasinoScene from "./props/CasinoScene.tsx";

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 11, 2], rotation: [-0.3, 0, 0], fov: 90 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />

                <CasinoScene/>
                {children}

                <PostProcessingEffects pixelSize={5.0} colorDivisions={20.0}/>

            </Canvas>
        </div>
    )
}