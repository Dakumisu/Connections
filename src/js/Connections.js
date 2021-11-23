import { Vector3 } from 'three'

import Datas from '@js/Datas'
import { Store } from '@js/Store'

import Themes from '@js/Themes'
import Connection from '@js/Connection'

const tVec3a = new Vector3()
const tVec3b = new Vector3()

class Connections {
   constructor(opt) {
      this.datas = Datas.datas
      this.themes = Themes

      this.connections = []

      this.initialized = false

      setTimeout(() => {
         this.addConnection()
         this.updateConnections()
      }, 1000);
   }

   addConnection() {
      // let pseudo = ""
      console.log(Store.users);
      for (let i = 0; i < Store.users.length; i++) {
         const userData = Store.users[i].datas
         const pseudo = userData.pseudo
         for (const label in userData) {
            if (label != 'profile' && label != 'pseudo' && userData[label] != 'RIEN') {
               // console.log(`%c${label}`, "color:green");
               /* 
               this.splitData(userData[label]).forEach(e => {
                  console.log(e);
                  // do something ...
                  // ça renvoie le nom des sous categories
               })
               */

               const tmpThemePos = this.themes.getPosition(label)
               const tmpUserPos = Store.users[i].user.position
               const themeTarget = label

               const connection = new Connection({
                  start: tVec3a.copy(tmpUserPos),
                  end: tVec3b.copy(tmpThemePos),
                  from: pseudo,
                  to: themeTarget
               })
               
               this.connections.push(connection)
            }
         }
      }
   }

   updateConnections() {
      for (let i = 0; i < this.connections.length; i++) {
         // const tmpUserPos = Store.users[i].user.position
         // this.connections[i].line.mesh.geometry
      }
   }

   addToGroup(object) {
      this.scene.add(object)

      this.initialized = true
   }

   splitData(data) {
      const tmpData = data.split(', ')

      return tmpData
   }

   update() {
      if (!this.initialized) return

   }
}

export default Connections