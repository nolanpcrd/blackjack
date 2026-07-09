import { EffectComposer } from '@react-three/postprocessing'
import {WrappedViewEffect} from "./ViewEffect.ts";

export default function PostProcessingEffects({ pixelSize, colorDivisions }: { pixelSize: number; colorDivisions: number }) {
    return (
        <EffectComposer>
            <WrappedViewEffect pixelSize={pixelSize} colorDivisions={colorDivisions} />
        </EffectComposer>
    )
}
