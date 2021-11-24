#pragma glslify: snoise = require(../function/noise.glsl)
#pragma glslify: rotate = require(../function/rotate.glsl)

precision highp float;

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uRandomAxis;

attribute vec3 aPositions;
attribute vec3 aParams;

varying float vLoop;
varying float vRandomScale;
varying vec2 vUv;
varying vec3 vPos;

const float maxDuration = 1000.;

void main() {
   vUv = uv;
   vPos = position;
   vRandomScale = aParams.y;
   vec3 pos = position;

   vec3 spherePos = pos + aPositions;

   float loop = mod(uTime + aParams.x * maxDuration, maxDuration) / maxDuration;
   vLoop = loop;

   spherePos.x += (loop) * spherePos.x * (2. - (sin(uTime * .0015 + (aParams.x * 10.)) - 1.));
   spherePos.y += (loop) * spherePos.y * (3. - (sin(uTime * .0015 + (aParams.x * 5.))));
   spherePos.z += (loop) * spherePos.z * (2. - (cos(uTime * .0015 + (aParams.x * 2.)) - 1.));

   float noiseX = snoise(vec2(spherePos.x, uTime * .001));
   float noiseY = snoise(vec2(spherePos.y, uTime * .001));
   float noiseZ = snoise(vec2(spherePos.z, uTime * .001));
   // spherePos.x -= noiseX * .01;
   // spherePos.y += noiseY * .01;
   // spherePos.z -= noiseZ * .01;

   spherePos.x -= (sin(uTime * .001 + (aParams.x * 10.)) * .1) * (1. - loop) * (spherePos.x * aParams.x * 1.2) * (1. - abs(aParams.x * .06) * (noiseX * .1));
   spherePos.y += (sin(uTime * .001 + aParams.x) * .1) * (1. - loop) * (spherePos.y * aParams.x * 1.8) * (1. - abs(aParams.x * .06) * (noiseY * .1)) * .2;
   spherePos.z += (sin(uTime * .001 + (aParams.x * 5.)) * .1) * (1. - loop) * (spherePos.z * aParams.x * 1.8) * (1. - abs(aParams.x * .06) * (noiseZ * .1));

   spherePos.xyz = rotate(spherePos.xyz, vec3(1. + sin(uRandomAxis * uTime)), PI * (uTime * .0005));

   vec4 mv = modelViewMatrix * vec4(spherePos, 1.);

   mv.xyz += pos.xyz * (PI * 2.);

   gl_Position = projectionMatrix * mv;
}