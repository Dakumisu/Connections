import { BoxBufferGeometry, Color, Mesh, MeshBasicMaterial, Vector3 } from 'three'

import Scene from '@js/Scene'
import { Store } from '@js/Store'

class User {
   constructor(opt) {
      this.datas = opt.datas
      this.position = opt.position

      console.log(this.position);

      this.startPosition = new Vector3()

      this.user = {}
      this.user.position = this.position

      this.initialized = false

      this.init()
   }

   init() {
      this.setGeometry()
      this.setMaterial()
      this.setMesh()
      this.getPosition()

      this.initialized = true
   }

   setGeometry() {
      this.user.geometry = new BoxBufferGeometry(.05, .05, .05, 1, 1, 1)
   }

   setMaterial() {
      this.user.material = new MeshBasicMaterial({
         color: new Color(0xffffff)
      })
   }

   setMesh() {
      this.user.mesh = new Mesh(this.user.geometry, this.user.material)
      
      this.user.mesh.pseudo = this.datas.pseudo
      this.user.mesh.profile = this.datas.profile
      
      this.user.mesh.material.color = this.user.mesh.profile == 'Dev' ? new Color('#f00') : new Color('#00f')
      // this.startPosition.y = .5 - Math.random() * 2.5
      // this.startPosition.z = .5 - Math.random() * 5.5

      this.user.mesh.position.copy(this.user.position)
   }

   getPosition() {
      this.user.position.copy(this.user.mesh.position)

      return this.user.position
   }

   update(time) {
      if (!this.initialized) return

      // this.user.mesh.position.x = this.startPosition.x + (.5 - Math.sin(time *.001) * .5)
   }
}

export default User