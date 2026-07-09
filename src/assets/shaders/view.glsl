uniform float uPixelSize;
uniform float uColorDivisions;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 fragColor) {
    vec2 posPixel = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
    vec2 pixelUV = posPixel / resolution.xy;
    vec3 col = texture(inputBuffer, pixelUV).rgb;
    col = floor(col.rgb * uColorDivisions) / uColorDivisions;

    fragColor = vec4(col, 1.0);
}
