import { Canvas } from "@react-three/fiber";
import PostProcessingEffects from "./utils/PostProc/PostProcessingEffects.tsx";
import * as React from "react";
import CasinoScene from "./props/CasinoScene.tsx";
import CameraController from "./utils/Camera/CameraController.tsx";

export default function Scene({ children, isAnimatingCamera }: { children: React.ReactNode, isAnimatingCamera: boolean }) {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas camera={{ position: [0, 16, 2], rotation: [-0.3, 0, 0], fov: 90 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1} />

                <CameraController isAnimating={isAnimatingCamera}/>

                <CasinoScene/>
                {children}

                <PostProcessingEffects pixelSize={3.0} colorDivisions={10.0}/>
            </Canvas>
        </div>
    )
}