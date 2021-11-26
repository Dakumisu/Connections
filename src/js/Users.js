import { BoxBufferGeometry, Color, Group, MathUtils, Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector2, Vector3 } from 'three'

import Raycaster from '@js/Raycaster'
import Mouse from '@js/Mouse'
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
      this.groups.global = new Group()

      this.raycastedMeshes = []

      this.initialized = false

      // this.init()
   }
   
   start() {
      this.init()
      this.event()
   }

   init() {
      this.addUser()
   
      this.initialized = true
   }

   addUser() {
      const sphereGeometry = new SphereBufferGeometry(6, 32, 32)
      const sphereGeometryPos = sphereGeometry.attributes.position.array
      const usersPos = []
      const checkAvailablePos = []

      let i = 0
      let j = 0

      for (const dataUser of Datas.datas) {
         let random = 0

         random = Math.floor(MathUtils.randFloat(0, sphereGeometryPos.length))
         random += random % 3

         do {
            random = Math.floor(MathUtils.randFloat(0, sphereGeometryPos.length))
            random += random % 3
         } while (checkAvailablePos.includes(random))

         checkAvailablePos.push(random)

         usersPos.push(new Vector3(sphereGeometryPos[random], sphereGeometryPos[random + 1], sphereGeometryPos[random + 2]))

         const user = new User({
            datas: dataUser,
            position: usersPos[j]
         })
         
         this.users[dataUser.pseudo] = user
         
         this.raycastedMeshes.push(user.user.mesh)

         this.addToGroup(user.user.mesh)

         i += 3
         j++
      }

      Store.users = this.users

      // this.add(this.groups.dev)
      // this.add(this.groups.designer)

      this.groups.global.add(this.groups.dev)
      this.groups.global.add(this.groups.designer)

      this.add(this.groups.global)
   }

   addToGroup(object) {
      object.profile == 'Dev' ? this.groups.dev.add(object) : this.groups.designer.add(object)
   }
   
   add(object) {
      Scene.scene.add(object)
   }

   event() {
      window.addEventListener('click', () => {
         if (this.intersects.length) {
            console.log(this.intersects[0].object.name);
         }
      })
   }

   update() {
      if (!this.initialized) return

      // this.users.forEach(user => {
      //   user.update() 
      // })

      Raycaster.raycaster.setFromCamera(Mouse.mouseScene, Scene.camera)

      this.intersects = Raycaster.raycaster.intersectObjects(this.raycastedMeshes)

      // document.body.style.cursor = 'default'
      for (let i = 0; i < this.intersects.length; i ++) {
         document.body.style.cursor = 'pointer'
         // console.log('hover ' + this.intersects[i].object.name)
      }
   }
}

const out = new Users()
export default out