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
      this.users = Store.users
      this.themes = Themes

      this.connections = {}
      this.connections.themes = []
      this.connections.users = []

      this.initialized = false

      setTimeout(() => {
         this.addConnectionToThemes()
         this.addConnectionBetweenUsers()
         this.updateConnections()
      }, 1000);
   }

   addConnectionToThemes() {
      for (let i = 0; i < this.users.length; i++) {
         const userData = this.users[i].datas
         const pseudo = userData.pseudo
         // console.log(`%c${userData.pseudo}`, "color:red");
         for (const label in userData) {
            if (label != 'profile' && label != 'pseudo' && userData[label] != 'RIEN') {
               // console.log(`%c${label}`, "color:green");
               this.splitData(userData[label]).forEach(e => { // ça renvoie le nom des sous categories
                  // console.log(`%c${e}`, "color:blue");
                  
                  const tmpUserPos = this.users[i].user.position
                  const tmpThemePos = this.themes.getChildPosition(label, e)
                  const themeChildTarget = e
                  const themeTarget = label
   
                  const connection = new Connection({
                     start: tVec3a.copy(tmpUserPos),
                     end: tVec3b.copy(tmpThemePos),
                     from: pseudo,
                     to: themeChildTarget,
                     parent: themeTarget,
                     color: '#ffffff',
                     opacity: .05, 
                     type: 'themes'
                  })
                  
                  this.connections.themes.push(connection)
               })
            }
         }
      }
   }

   addConnectionBetweenUsers() {
      const users = []

      for (const user in this.users) {
         users.push(this.users[user])  
      }

      let k = 1
      for (let i = 0; i < users.length; i++) {         
         for (let j = k; j < users.length; j++) {
            const pseudo1 = users[i].datas.pseudo
            const pseudo2 = users[j].datas.pseudo

            const tmpUser1Pos = users[i].user.position
            const tmpUser2Pos = users[j].user.position

            const connection = new Connection({
               start: tVec3a.copy(tmpUser1Pos),
               end: tVec3b.copy(tmpUser2Pos),
               from: pseudo1,
               to: pseudo2,
               parent: '',
               color: '#00ff00', 
               opacity: 0.1, 
               type: 'users'
            })
            
            this.connections.users.push(connection)
         }

         k++
      }
      console.log(users);
   }

   updateConnections() {
      for (let i = 0; i < this.connections.themes.length; i++) {
         // const tmpUserPos = this.users[i].user.position
         // this.connections.themes[i].line.mesh.geometry
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