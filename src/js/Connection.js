import { BufferGeometry, Color, Line, LineBasicMaterial, LineCurve3, LineDashedMaterial, MathUtils, Object3D, QuadraticBezierCurve3, Vector3 } from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline';

import Scene from '@js/Scene'
import { Store } from '@js/Store'

import { map } from '@utils/maths'

const tVec3a = new Vector3()
const tVec3b = new Vector3()
const dummy = new Object3D()
class Connections {
   constructor(opt) {
      this.start = opt.start
      this.end = opt.end
      this.from = opt.from
      this.to = opt.to
      this.parent = opt.parent
      this.color = opt.color
      this.opacity = opt.opacity
      this.type = opt.type

      this.scene = Scene.scene

      this.line = {}
      this.line.id = ` ${this.parent} ${this.from} ${this.to}`
      this.line.connect = {}
      this.line.connect.to = this.from
      this.line.connect.from = this.to

      this.points = []
      this.subdivisions = 50

      this.limit = {}
      this.limit.x = 5
      this.limit.y = 3
      this.limit.z = 5

      this.initialized = false

      this.init()
   }

   init() {
      this.setGeometry()
      this.setMaterial()
      this.setLineMesh()
   }

   setGeometry() {
      this.subdivisions = 20
      
      this.points.push(this.start)
      this.points.push(this.end)

      this.line.geometry = new BufferGeometry()

      // const points = []
      const curve = new QuadraticBezierCurve3()

      const middleX = (this.start.x + this.end.x) / 2
      const middleY = (this.start.y + this.end.y) / 2
      const middleZ = (this.start.z + this.end.z) / 2

      const { strength } = this.getStrength(this.start, this.end)
      const random = MathUtils.randFloatSpread(3)

      // console.log(strength, random);
      
      tVec3a.set(middleX + (random * strength.x), middleY + (random * strength.y), middleZ + (random * strength.z))

      curve.v0 = this.start
      curve.v1 = tVec3a
      curve.v2 = this.end

      const points = curve.getPoints(50)
      // console.log(points);
      // console.log(this.line.geometry)
      // for (let j = 0; j < this.subdivisions; j++) {
      //    points.push( curve.getPoint(j / this.subdivisions) )
      // }
      
      // this.line.geometry = new MeshLine()
      // this.line.geometry.setPoints(points.flat());
      
      this.line.geometry.setFromPoints( points );
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

   setMaterial() {
      this.line.material = new LineBasicMaterial({
         color: new Color(this.color),
         linewidth: .5,
         // dashSize: .1, 
         // gapSize: .05, 
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
      this.scene.add(mesh)

      this.initialized = true
   }

   // getPosition() {
   //    this.line.position.copy(this.line.mesh.position)

   //    return this.line.position
   // }

   update() {
      if (!this.initialized) return

   }
}

export default Connections