import { BoxBufferGeometry, Color, Group, Mesh, MeshBasicMaterial, Vector3 } from 'three'

import Scene from '@js/Scene'
import User from '@js/User'
import Datas from '@js/Datas'
import { Store } from '@js/Store'

class Users {
   constructor(opt) {
      this.datas = Datas.datas

      this.scene = Scene.scene

      this.users = []

      this.groups = {}
      this.groups.dev = new Group()
      this.groups.designer = new Group()

      this.initialized = false

      this.addUser()
   }

   addUser() {
      for (const dataUser of this.datas) {
         const user = new User({
            datas: dataUser
         })

         this.users.push(user)
         
         this.addToGroup(user.user.mesh)
      }
      
      Store.users = this.users
      console.log(Store.users);

      this.add(this.groups.dev)
      this.add(this.groups.designer)
   }

   addToGroup(object) {
      if (object.profile == 'Dev')
         this.groups.dev.add(object)
      else
         this.groups.designer.add(object)

      this.initialized = true
   }

   add(object) {
      this.scene.add(object)
   }

   update(time) {
      if (!this.initialized) return

      this.users.forEach(user => {
        user.update(time) 
      })
   }
}

export default Users