import { AdditiveBlending, Color, DoubleSide, InstancedBufferAttribute, InstancedBufferGeometry, LinearFilter, log, MathUtils, Mesh, PlaneBufferGeometry, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, VideoTexture } from 'three'

import Raf from '@js/Raf'
import Scene from '@js/Scene'
import { Store } from '@js/Store'

import vertex from '@glsl/sphereParticles/vertex.vert'
import fragment from '@glsl/sphereParticles/fragment.frag'

const tVec2a = new Vector2()

class SphereParticles {
   constructor(opt) {
      this.randomAxis = MathUtils.randFloat(0, 1)

      this.particles = {}

      this.initialized = false

      this.init()
      this.resize()
   }

   init() {
      this.setAttributes()
      this.setGeometry()
      this.setMaterial()
      this.setMesh()

      this.initialized = true
   }

   setAttributes() {
      const particlesCount = 2048 * 3

      this.positions = new Float32Array( particlesCount )
      this.params = new Float32Array( particlesCount )

      for (let i = 0; i < particlesCount; i = i + 3) {
         this.positions[i + 0] = MathUtils.randFloatSpread(.15)
         this.positions[i + 1] = MathUtils.randFloatSpread(.15)
         this.positions[i + 2] = MathUtils.randFloatSpread(.15)
         
         this.params[i + 0] = MathUtils.randFloatSpread(50) // Offset
         this.params[i + 1] = MathUtils.randFloat(.7, 1.3) // Random Scale
         this.params[i + 2] = 0 // Empty
      }
   }

   setGeometry() {
      const blueprintParticle = new PlaneBufferGeometry()
      blueprintParticle.scale(.01, .01, .01)

      this.particles.geometry = new InstancedBufferGeometry()

      this.particles.geometry.index = blueprintParticle.index
      this.particles.geometry.attributes.position = blueprintParticle.attributes.position
      this.particles.geometry.attributes.normal = blueprintParticle.attributes.normal
      this.particles.geometry.attributes.uv = blueprintParticle.attributes.uv

      this.particles.geometry.setAttribute( 'aPositions', new InstancedBufferAttribute( this.positions, 3, false ) );
      this.particles.geometry.setAttribute( 'aParams', new InstancedBufferAttribute( this.params, 3, false ) )
   }

   setMaterial() {
      this.particles.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: new Color('#82A5FF') },
            uAlpha: { value: 1 },
            uRandomAxis: { value: this.randomAxis },
            uResolution : { value : tVec2a.set(Store.sizes.width, Store.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio },
         },
         side: DoubleSide,
         transparent: true,

         /* pour les particules */
         depthTest: true,
         depthWrite: false,
         blending: AdditiveBlending
      })
   }

   setMesh() {
      this.particles.mesh = new Mesh(this.particles.geometry, this.particles.material)
      this.particles.mesh.frustumCulled = false

      this.add(this.particles.mesh)
   }

   add(object) {
      Scene.scene.add(object)
   }

   resize() {
      window.addEventListener('resize', () => {
         this.particles.material.uniforms.uResolution.value = tVec2a.set(Store.sizes.width, Store.sizes.height)
         this.particles.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update() {
      if (!this.initialized) return

      this.particles.mesh.material.uniforms.uTime.value = Raf.timeElapsed
   }
}

export default SphereParticles