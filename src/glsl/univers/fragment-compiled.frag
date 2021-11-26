precision highp float;
#define GLSLIFY 1

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uAlpha;
uniform sampler2D uVideoTexture;

varying vec2 vUv;
// varying vec3 vPos;

void main() {
  vec4 video = texture2D(uVideoTexture, vUv);
  video.a = uAlpha;

  gl_FragColor = video;
}