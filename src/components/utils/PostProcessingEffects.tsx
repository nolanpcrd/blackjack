import { EffectComposer, Pixelation } from '@react-three/postprocessing'

export default function PostProcessingEffects({ pixelSize }: { pixelSize: number }) {
    return (
        <EffectComposer>
            <Pixelation granularity={pixelSize} />
        </EffectComposer>
    )
}