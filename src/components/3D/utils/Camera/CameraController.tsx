import {Euler, Quaternion, Vector3} from "three";
import {useFrame} from "@react-three/fiber";

export default function CameraController({isAnimating} : {isAnimating: boolean}) {
    const targetPosition: Vector3 = new Vector3(0, 10, -2);
    const targetRotation: Quaternion = new Quaternion().setFromEuler(new Euler(-0.8, 0, 0));
    const animTime: number = 0.03;

    useFrame((state => {
        if (!isAnimating) return;
        const camera = state.camera;
        camera.position.lerp(targetPosition, animTime);
        camera.quaternion.slerp(targetRotation, animTime);
    }));

    return null;
}