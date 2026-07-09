import {useGLTF} from "@react-three/drei";

export default function CasinoScene() {
    const { scene } = useGLTF("/models/casino.glb");
    const rotation = -Math.PI+Math.PI/4;
    return <primitive object={scene} scale={30} position={[0, 0, 0]} rotation={[0, rotation, 0]} />;
}