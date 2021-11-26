import { BoxBufferGeometry, Color, Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector3 } from 'three'

import Raycaster from '@js/Raycaster'
import Mouse from '@js/Mouse'
import Scene from '@js/Scene'
import { Store } from '@js/Store'

class User {
   constructor(opt) {
      this.datas = opt.datas
      this.position = opt.position

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
      this.user.geometry = new SphereBufferGeometry(.04, 16, 8)
   }

   setMaterial() {
      this.user.material = new MeshBasicMaterial({
         color: new Color(0xffffff)
      })
   }

   setMesh() {
      this.user.mesh = new Mesh(this.user.geometry, this.user.material)
      
      this.user.mesh.pseudo = this.datas.pseudo
      this.user.mesh.name = this.datas.pseudo
      this.user.mesh.profile = this.datas.profile

      const color = this.user.mesh.profile == 'Dev' ? '#A7AA26' : '#26AA6B'
      this.user.mesh.material.color = new Color(color)
      
      // this.startPosition.y = .5 - Math.random() * 2.5
      // this.startPosition.z = .5 - Math.random() * 5.5

      this.user.mesh.position.copy(this.user.position)
   }

   getPosition() {
      this.user.position.copy(this.user.mesh.position)

      return this.user.position
   }

   update() {
      if (!this.initialized) return

   }
}

export default User