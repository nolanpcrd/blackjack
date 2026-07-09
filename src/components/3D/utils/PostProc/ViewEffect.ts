import { wrapEffect } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'
import { Uniform, Vector2, type WebGLRenderer } from 'three'
import viewShader from '../../../../assets/shaders/view.glsl?raw'

const fragmentShader = viewShader.replaceAll('texture(', 'texture2D(')

class ViewEffect extends Effect {
    constructor({ pixelSize, colorDivisions }: { pixelSize: number; colorDivisions: number }) {
        super('ViewEffect', fragmentShader, {
            uniforms: new Map<string, Uniform>([
                ['uPixelSize', new Uniform(pixelSize)],
                ['uColorDivisions', new Uniform(colorDivisions)],
                ['iResolution', new Uniform(new Vector2(1, 1))],
            ]),
        })
    }

    update(renderer: WebGLRenderer): void {
        const resolution = this.uniforms.get('iResolution')!.value as Vector2
        renderer.getDrawingBufferSize(resolution)
    }
}

export const WrappedViewEffect = wrapEffect(ViewEffect)