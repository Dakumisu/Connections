import { BoxBufferGeometry, Color, Group, MathUtils, Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector2, Vector3 } from 'three'

import Scene from '@js/Scene'
import User from '@js/User'
import Datas from '@js/Datas'
import { Store } from '@js/Store'

class Users {
   constructor(opt) {
      this.users = []

      this.groups = {}
      this.groups.dev = new Group()
      this.groups.designer = new Group()

      this.initialized = false

      this.addUser()
      // this.setPositions()

      this.initialized = true

   }

   addUser() {
      const sphereGeometry = new SphereBufferGeometry(10, 16, 16)
      const sphereGeometryPos = sphereGeometry.attributes.position.array
      const usersPos = []

      let i = 0
      let j = 0

      for (const dataUser of Datas.datas) {
         let random = Math.floor(MathUtils.randFloat(0, sphereGeometryPos.length / 3))
         random += random % 3

         usersPos.push(new Vector3(sphereGeometryPos[random + i], sphereGeometryPos[random + i + 1], sphereGeometryPos[random + i + 2]))

         // this.users[j].user.mesh.position.copy(usersPos[j])

         
         // console.log(usersPos[j]);
         
         const user = new User({
            datas: dataUser,
            position: usersPos[j]
         })
         
         this.users.push(user)
         
         this.addToGroup(user.user.mesh)

         i += 3
         j++
      }

      // this.setPositions()

      Store.users = this.users

      this.add(this.groups.dev)
      this.add(this.groups.designer)
   }

   setPositions() {
      const sphereGeometry = new SphereBufferGeometry(10, 16, 16)
      const sphereGeometryPos = sphereGeometry.attributes.position.array
      const usersPos = []

      let j = 0

      for (let i = 0; i < this.users.length * 3; i += 3) {
         let random = Math.floor(MathUtils.randFloat(0, sphereGeometryPos.length / 3))
         random += random % 3

         usersPos.push(new Vector3(sphereGeometryPos[random + i], sphereGeometryPos[random + i + 1], sphereGeometryPos[random + i + 2]))

         this.users[j].user.mesh.position.copy(usersPos[j])

         j++
      }

      // for (let i = 0; i < usersPos.length; i++) {
      //    this.users[i].user.mesh.position.copy(usersPos[i])
         
      // }
   }

   addToGroup(object) {
      if (object.profile == 'Dev')
         this.groups.dev.add(object)
      else
         this.groups.designer.add(object)
   }

   add(object) {
      Scene.scene.add(object)
   }

   update(time) {
      if (!this.initialized) return

      this.users.forEach(user => {
        user.update(time) 
      })
   }
}

export default Users