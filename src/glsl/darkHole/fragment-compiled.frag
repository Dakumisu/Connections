precision highp float;
#define GLSLIFY 1

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uAlpha;
uniform vec3 uColor;
uniform sampler2D uVideoTexture;
uniform sampler2D uVideoTextureAlpha;

varying vec2 vUv;
// varying vec3 vPos;

void main() {
  vec3 color = vec3(uColor);

  vec4 video = texture2D(uVideoTexture, vUv);
  vec4 videoAlpha = texture2D(uVideoTextureAlpha, vUv);
  video.a = smoothstep(0., 1., videoAlpha.r) * uAlpha;

  gl_FragColor = video;
}