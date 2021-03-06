import { BoxBufferGeometry, Color, Group, MathUtils, Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector2, Vector3 } from 'three'

import Raycaster from '@js/Raycaster'
import Mouse from '@js/Mouse'
import User from '@js/User'
import Datas from '@js/Datas'
import Views from '@js/Views'
import Scene from '@js/Scene'
import { Store } from '@js/Store'

class Users {
   constructor(opt) {
      this.users = []

      this.groups = {}
      this.groups.dev = new Group()
      this.groups.designer = new Group()
      this.groups.global = new Group()

      this.intersects = []

      this.raycastedMeshes = []

      this.initialized = false
   }
   
   async start() {
      return new Promise( resolve => {
         this.addUser().then( () => {
            this.event()

            this.initialized = true
            resolve()
         })
      })
   }

   async addUser() {
      return new Promise( resolve => {
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
   
         Store.nodes.users_count.innerHTML = Object.keys(this.users).length
   
         this.groups.global.add(this.groups.dev)
         this.groups.global.add(this.groups.designer)
   
         this.add(this.groups.global)

         resolve()
      })
   }

   addToGroup(object) {
      object.profile == 'Dev' ? this.groups.dev.add(object) : this.groups.designer.add(object)
   }
   
   add(object) {
      Scene.scene.add(object)
   }

   event() {
      window.addEventListener('click', () => {
         if (Views.currentView != 'userInfos' && Views.currentView != 'themeInfos') {
            if (this.intersects.length) {
               Views.goToUserInfo(this.intersects[0].object.name)
            }
         }
      })
   }

   update() {
      if (!this.initialized) return

      if (Views.currentView != 'userInfos' && Views.currentView != 'themeInfos') {
         Raycaster.raycaster.setFromCamera(Mouse.mouseScene, Scene.camera)
   
         this.intersects = Raycaster.raycaster.intersectObjects(this.raycastedMeshes)
   
         for (let i = 0; i < this.intersects.length; i ++) {
            document.body.style.cursor = 'pointer'
            if (Views.currentView == 'exp') Views.nodes.hover_item_info.classList.add('fadeIn')
            Views.nodes.hover_item_info.children[0].innerHTML = this.intersects[0].object.name
         }
      }
   }
}

const out = new Users()
export default out