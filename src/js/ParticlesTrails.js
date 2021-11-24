import { AdditiveBlending, BufferGeometry, Color, DoubleSide, InstancedBufferAttribute, InstancedBufferGeometry, LinearFilter, MathUtils, Mesh, PlaneBufferGeometry, QuadraticBezierCurve3, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, Vector3, VideoTexture } from 'three'

import Scene from '@js/Scene'
import { Store } from '@js/Store'

import { map } from '@utils/maths'

import vertex from '@glsl/particlesTrails/vertex.vert'
import fragment from '@glsl/particlesTrails/fragment.frag'

const tVec2a = new Vector2()
const tVec3a = new Vector3()

class ParticlesTrails {
   constructor(opt) {

      this.start = opt.start
      this.end = opt.end
      this.strength = opt.strength
      this.random = opt.random
      this.curve = opt.curve
      this.middle = opt.middle
      this.color = new Color(opt.color)
      this.alpha = opt.alpha
      this.dir = Math.sign(.5 - Math.random())

      // console.log(this.curve);

      this.points = this.curve.getPoints( 500 )
      // * ((this.middle.x + this.middle.y + this.middle.z) * 2)
      
      tVec3a.set(this.strength.x, this.strength.y, this.strength.z)
      // console.log(tVec3a);
      
      this.particles = {}
      
      this.initialized = false

      this.init()
      this.resize()
   }

   init() {
      // this.setPath()
      this.setAttributes()
      this.setGeometry()
      this.setMaterial()
      this.setMesh()

      this.initialized = true
   }

   setPath() {
      this.subdivisions = 20
      
      // this.points.push(this.start)
      // this.points.push(this.end)

      // this.geometry = new BufferGeometry()

      const curve = new QuadraticBezierCurve3()

      const middleX = (this.start.x + this.end.x) / 2
      const middleY = (this.start.y + this.end.y) / 2
      const middleZ = (this.start.z + this.end.z) / 2

      const { strength } = this.getStrength(this.start, this.end)
      const random = MathUtils.randFloatSpread(3)

      tVec3a.set(middleX + (random * strength.x), middleY + (random * strength.y), middleZ + (random * strength.z))


      curve.v0 = this.start
      curve.v1 = tVec3a
      curve.v2 = this.end

      this.points = curve.getPoints(200)
      
      // this.geometry.setFromPoints( points );
   }

   getStrength(start, end) {
      const strength = {}
      let x = start.x - end.x
      let y = start.y - end.y
      let z = start.z - end.z

      strength.x = x
      strength.y = y * ((z + x) * .5)
      strength.z = z
      
      x = map(x, -5, 20, 0, 1)
      y = map(y, -5, 20, 0, 1)
      z = map(z, -5, 20, 0, 1)

      strength.x *= x
      strength.y *= y
      strength.z *= z
      
      // console.log(strength.x, strength.x, strength.z);
      // if (x < this.limit.x) strength.x = .1
      // if (y < this.limit.y) strength.y = .1
      // if (z < this.limit.z) strength.z = .1

      return { strength }
   }

   setAttributes() {
      const particlesCount = this.points.length * 3

      this.positions = new Float32Array( particlesCount )
      this.params = new Float32Array( particlesCount )

      let j = 0

      for (let i = 0; i < particlesCount; i = i + 3) {
         this.positions[i + 0] = this.points[j].x
         this.positions[i + 1] = this.points[j].y
         this.positions[i + 2] = this.points[j].z
         
         this.params[i + 0] = MathUtils.randFloatSpread(50) // Offset
         this.params[i + 1] = MathUtils.randFloat(.7, 1.3) // Random Scale
         this.params[i + 2] = .5 + Math.cos(Math.PI + (i / particlesCount) * (Math.PI * 2)) * .5 // progress

         j++
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
      // const { strength } = this.getStrength(this.start, this.end)

      this.particles.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uColor: { value: this.color },
            uAlpha: { value: this.alpha},
            uStrength: { value: tVec3a },
            uDir: { value: this.dir },
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

   update(time) {
      if (!this.initialized) return

      this.particles.mesh.material.uniforms.uTime.value = time
   }
}

export default ParticlesTrails