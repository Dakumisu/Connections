#pragma glslify: snoise = require(../function/noise.glsl)
#pragma glslify: rotate = require(../function/rotate.glsl)

precision highp float;

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uDir;
uniform vec3 uStrength;

attribute vec3 aPositions;
attribute vec3 aParams;
attribute vec3 aParamsProgress;

varying float vLoop;
varying float vRandomScale;
varying float vTrailProgress;
varying vec2 vUv;
varying vec3 vPos;

const float maxDuration = 1000.;

void main() {
   vUv = uv;
   vPos = position;
   vRandomScale = aParams.y;
   vTrailProgress = aParamsProgress.y;

   vec3 pos = position;

   vec3 trailPos = pos + aPositions;

   float loop = mod(uTime + aParams.x * maxDuration, maxDuration) / maxDuration;
   vLoop = loop;

   // trailPos.x += uDir * ((1. - loop) * (((uTime * .01) - 1.))) * (aParamsProgress.x * (uStrength.x * .02));
   // trailPos.y += ((1. - (sin(uTime * .0015 + (aParams.x * 5.)) - 1.)) * .1) * (aParamsProgress.x * (uStrength.y * .1));
   // trailPos.z += ((1. - (cos(uTime * .0015 + (aParams.x * 2.)) - 1.)) * .1) * (aParamsProgress.x * (uStrength.z * .1));

// * smoothstep(1., .75, aParamsProgress.x) * smoothstep(0., .25, aParamsProgress.x) * uStrength.x
// * smoothstep(1., .75, aParamsProgress.x) * smoothstep(0., .25, aParamsProgress.x) * uStrength.y

   // float noiseX = snoise(vec2(trailPos.x, uTime * .0001));
   // float noiseY = snoise(vec2(trailPos.y, uTime * .0001));
   // float noiseZ = snoise(vec2(trailPos.z, uTime * .0001));
   // trailPos.x -= noiseX * .01;
   // trailPos.y += noiseY * .01;
   // trailPos.z -= noiseZ * .01;

   // trailPos.x -= (sin(uTime * .00001 + (aParams.x * 10.)) * .1) * (1. - loop) * (trailPos.x * aParams.x * 1.2) * (1. - abs(aParams.x * .06) * (noiseX * .001));
   // trailPos.y += (sin(uTime * .00001 + aParams.x) * .1) * (1. - loop) * (trailPos.y * aParams.x * 1.8) * (1. - abs(aParams.x * .06) * (noiseY * .001)) * .002;
   // trailPos.z += (sin(uTime * .00001 + (aParams.x * 5.)) * .1) * (1. - loop) * (trailPos.z * aParams.x * 1.8) * (1. - abs(aParams.x * .06) * (noiseZ * .001));

   // trailPos.xyz = rotate(trailPos.xyz, vec3(1. + sin(uTime)), PI * (uTime * .0005));

   vec4 mv = modelViewMatrix * vec4(trailPos, 1.);
   mv.xyz += pos.xyz * (PI * 2.);

   gl_Position = projectionMatrix * mv;
}