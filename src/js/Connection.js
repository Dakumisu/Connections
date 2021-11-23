import Scene from '@js/Scene'
import { Store } from '@js/Store'
import { BufferGeometry, Line, LineBasicMaterial, LineCurve3, Vector3 } from 'three'

class Connections {
   constructor(opt) {
      this.start = opt.start
      this.end = opt.end
      this.from = opt.from
      this.to = opt.to

      this.scene = Scene.scene

      this.line = {}
      this.line.connect = {}
      this.line.connect.to = this.from
      this.line.connect.from = this.to

      this.points = []

      this.initialized = false

      this.init()
   }

   init() {
      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   setGeometry(start, end) {
      this.line.geometry = new BufferGeometry()

      this.points.push(this.start)
      this.points.push(this.end)
      
      this.line.geometry.setFromPoints( this.points );
   }

   setMaterial() {
      this.line.material = new LineBasicMaterial({
         color: 0x00ff00
      })
   }

   setMesh() {
      this.line.mesh = new Line(this.line.geometry, this.line.material);

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