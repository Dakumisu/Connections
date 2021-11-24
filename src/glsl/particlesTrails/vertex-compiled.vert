vec3 mod289(vec3 x) {
   return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
   return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
   return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
   const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
   0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
   -0.577350269189626,  // -1.0 + 2.0 * C.x
   0.024390243902439); // 1.0 / 41.0
// First corner
   vec2 i = floor(v + dot(v, C.yy));
   vec2 x0 = v - i + dot(i, C.xx);

// Other corners
   vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
   i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
   vec4 x12 = x0.xyxy + C.xxzz;
   x12.xy -= i1;

// Permutations
   i = mod289(i); // Avoid truncation effects in permutation
   vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

   vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
   m = m * m;
   m = m * m;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

   vec3 x = 2.0 * fract(p * C.www) - 1.0;
   vec3 h = abs(x) - 0.5;
   vec3 ox = floor(x + 0.5);
   vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
   m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

// Compute final noise value at P
   vec3 g;
   g.x = a0.x * x0.x + h.x * x0.y;
   g.yz = a0.yz * x12.xz + h.yz * x12.yw;
   return 130.0 * dot(m, g);
}

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

precision highp float;
#define GLSLIFY 1

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uDir;
uniform vec3 uStrength;

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

   vec3 trailPos = pos + aPositions;

   float loop = mod(uTime + aParams.x * maxDuration, maxDuration) / maxDuration;
   vLoop = loop;

   // trailPos.x += uDir * ((1. - loop) * (((uTime * .01) - 1.))) * (aParams.z * (uStrength.x * .02));
   trailPos.y += ((1. - (sin(uTime * .0015 + (aParams.x * 5.)) - 1.)) * .1) * (aParams.z * (uStrength.y * .1));
   trailPos.z += ((1. - (cos(uTime * .0015 + (aParams.x * 2.)) - 1.)) * .1) * (aParams.z * (uStrength.z * .1));

// * smoothstep(1., .75, aParams.z) * smoothstep(0., .25, aParams.z) * uStrength.x
// * smoothstep(1., .75, aParams.z) * smoothstep(0., .25, aParams.z) * uStrength.y

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