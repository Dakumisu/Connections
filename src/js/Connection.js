import { BufferGeometry, Color, Line, LineBasicMaterial, LineCurve3, LineDashedMaterial, MathUtils, QuadraticBezierCurve3, Vector3 } from 'three'

import Score from '@js/Score'
import Scene from '@js/Scene'
import ParticlesTrails from '@js/ParticlesTrails'
import { Store } from '@js/Store'

import { map } from '@utils/maths'

const tVec3a = new Vector3()
const tVec3b = new Vector3()
const tVec3c = new Vector3()
class Connections {
   constructor(opt) {
      this.start = opt.start
      this.end = opt.end
      this.from = opt.from
      this.to = opt.to
      this.parent = opt.parent
      this.color = opt.color
      this.opacity = opt.opacity
      this.alpha = 1.
      this.scale = 1.
      this.type = opt.type

      this.line = {}
      this.line.id = ` ${this.parent} ${this.from} ${this.to}`
      this.line.connect = {}
      this.line.connect.to = this.from
      this.line.connect.from = this.to

      this.points = null
      this.subdivisions = 50

      this.limit = {}
      this.limit.x = 5
      this.limit.y = 3
      this.limit.z = 5

      this.particlesTrails = []

      this.initialized = false

      this.init()
   }

   init() {
      this.setGeometry()
      this.setMaterial()
      this.setLineMesh()

      if (this.type == 'users') {
         // console.log(this.from, this.to, Score.getScore(this.from, this.to).norm, Score.getHighScore(this.from).norm);
         if ( Score.getScore(this.from, this.to).norm == Score.getHighScore(this.from).norm ) { // Best Macth
            this.alpha = .75
            this.color = new Color('#0f0')
         } else if ( Score.getScore(this.from, this.to).norm == Score.getWorstScore(this.from).norm ) { // Worst Match
            this.alpha = .75
            this.color = new Color('#f00')
         } else {
            this.alpha = 0.5
            this.scale = 0.15
            // this.color = new Color('#000')
         }

         this.addParticlesTrails()
      }

      this.initialized = true
   }

   addParticlesTrails() {
      const particlesTrails = new ParticlesTrails({
         start: this.start,
         end: this.end,
         strength: this.strength,
         curve: this.curve,
         middle: this.middle,
         color: this.color,
         alpha: this.alpha,
         scale: this.scale
      })

      this.particlesTrails.push(particlesTrails)
   }

   setGeometry() {
      this.subdivisions = 50
      
      // this.points.push(this.start)
      // this.points.push(this.end)

      this.line.geometry = new BufferGeometry()

      // const points = []
      this.curve = new QuadraticBezierCurve3()

      const middleX = (this.start.x + this.end.x) / 2
      const middleY = (this.start.y + this.end.y) / 2
      const middleZ = (this.start.z + this.end.z) / 2

      this.middle = tVec3c.set(middleX, middleY, middleZ)

      const { strength } = this.getStrength(this.start, this.end)
      const random = MathUtils.randFloatSpread(2)

      this.strength = {
         x: random * strength.x,
         y: random * strength.y,
         z: random * strength.z,
      }
      
      tVec3a.set(middleX + this.strength.x, middleY + this.strength.y, middleZ + this.strength.z)

      this.curve.v0 = this.start
      this.curve.v1 = tVec3a
      this.curve.v2 = this.end

      this.points = this.curve.getPoints( 200 )
      
      this.line.geometry.setFromPoints( this.points );
   }

   getStrength(start, end) {
      const strength = {}
      let x = start.x - end.x
      let y = start.y - end.y
      let z = start.z - end.z

      strength.x = x
      strength.y = y * ((z + x) * .2)
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

   setMaterial() {
      this.line.material = new LineBasicMaterial({
         color: new Color(this.color),
         linewidth: .5,
         transparent: true,
         depthTest: true
      })
   }
   
   setLineMesh() {
      this.line.mesh = new Line(this.line.geometry, this.line.material);
      this.line.mesh.computeLineDistances();
      this.line.mesh.name = this.line.id
      
      this.line.mesh.material.opacity = this.opacity

      if (this.opacity === 0) this.line.mesh.visible = false

      this.add(this.line.mesh)
   }

   add(mesh) {
      Scene.scene.add(mesh)
   }

   update() {
      if (!this.initialized) return

      this.particlesTrails.forEach(particlesTrail => {
         particlesTrail.update()
      })
   }
}

export default Connections