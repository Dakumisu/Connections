import { Vector3 } from 'three'

import Datas from '@js/Datas'
import { Store } from '@js/Store'

import Themes from '@js/Themes'
import Connection from '@js/Connection'

const tVec3a = new Vector3()
const tVec3b = new Vector3()

class Connections {
   constructor(opt) {
      this.connections = {}
      this.connections.themes = []
      this.connections.users = []

      this.initialized = false
   }

   start() {
      this.addConnectionToThemes()
      this.addConnectionBetweenUsers()
      Store.nodes.connections_count.innerHTML = this.connections.themes.length + this.connections.users.length

      this.initialized = true
   }

   addConnectionToThemes() {
      for (const user in Store.users) {
         const userData = Store.users[user].datas
         const pseudo = userData.pseudo
         // console.log(`%c${userData.pseudo}`, "color:red");
         for (const label in userData) {
            if (label != 'profile' && label != 'pseudo' && userData[label] != 'Nothing') {
               // console.log(`%c${label}`, "color:green");
               this.splitData(userData[label]).forEach(e => { // ça renvoie le nom des sous categories
                  // console.log(`%c${e}`, "color:blue");
                  
                  const tmpUserPos = Store.users[user].user.position
                  const tmpThemePos = Themes.getChildPosition(label, e)
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

      for (const user in Store.users) {
         users.push(Store.users[user])  
      }

      for (let i = 0; i < users.length; i++) {         
         for (let j = 0; j < users.length; j++) {
            const pseudo1 = users[i].datas.pseudo
            const pseudo2 = users[j].datas.pseudo

            if (pseudo1 != pseudo2) {
               const tmpUser1Pos = users[i].user.position
               const tmpUser2Pos = users[j].user.position
   
               const connection = new Connection({
                  start: tVec3a.copy(tmpUser1Pos),
                  end: tVec3b.copy(tmpUser2Pos),
                  from: pseudo1,
                  to: pseudo2,
                  parent: '',
                  color: '#8265FF', 
                  opacity: .05,
                  type: 'users'
               })
               
               this.connections.users.push(connection)
            }
         }
      }
   }

   getUserConnections(name) {
      const connexions = []
      this.connections.themes.forEach(connection => {
         if (connection.from == name) connexions.push(connection)
      })
      this.connections.users.forEach(connection => {
         if (connection.from == name) connexions.push(connection)
      })
      
      return connexions
   }
   
   getThemeConnections(theme) {
      const connexions = []
      this.connections.themes.forEach(connection => {
         if (connection.parent == theme) connexions.push(connection)
      })

      return connexions
   }

   addToGroup(object) {
      Scene.scene.add(object)
   }

   splitData(data) {
      const tmpData = data.split(', ')

      return tmpData
   }

   update() {
      if (!this.initialized) return
      
      this.connections.themes.forEach(connection => {
         connection.update()
      })
      this.connections.users.forEach(connection => {
         connection.update()
      })
   }
}
const out = new Connections()
export default out