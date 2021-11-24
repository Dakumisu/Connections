precision highp float;
#define GLSLIFY 1

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uAlpha;
uniform float uPixelRatio;
uniform vec3 uColor;
uniform vec2 uResolution;

varying float vLoop;
varying float vRandomScale;
varying vec2 vUv;
varying vec3 vPos;

void main() {
  vec2 uv = vUv;

  vec2 res = gl_FragCoord.xy / uResolution.xy;
  res /= uPixelRatio;

  float strength = .5 * (vRandomScale *.5) / distance(uv, vec2(.5));
  
  vec3 particle = vec3(uColor);

  particle *= strength * vRandomScale;
  particle *= smoothstep(1., 10., particle);

  float alpha = smoothstep(1., .75, vLoop) * smoothstep(.0, .25, vLoop) * (vPos.x +  vPos.y +  vPos.z + uAlpha);
  alpha *= vRandomScale;

  gl_FragColor = vec4(particle, alpha);
}