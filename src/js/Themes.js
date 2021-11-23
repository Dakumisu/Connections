import Scene from '@js/Scene'
import Raycaster from '@js/Raycaster'
import Mouse from '@js/Mouse'
import { Store } from '@js/Store'

import loadGLTF from '@utils/loader/loadGLTF'

import theme from '@model/testpoints2.glb'

class Themes {
   constructor(opt) {
      this.scene = Scene.scene

      this.themes = {}

      this.initialized = false
      this.parseInitialized = false

      this.init()
   }

   init() {
     this.loadModel()
   }

   loadModel() {
      loadGLTF(theme).then( value => {
         this.themesModel = value.scenes[0];

         this.setThemeName()
         this.parseTheme()
         this.add(this.themesModel)
      })
   }

   setThemeName() {
      for (let i = 0; i < this.themesModel.children.length; i++) {
         this.themesModel.children[i].name = Store.list[i]
      }
      
      console.log(this.themesModel);
   }
   
   parseTheme() {
      for (let i = 0; i < this.themesModel.children.length; i++) {
         this.themes[this.themesModel.children[i].name] = this.themesModel.children[i]
      }
      this.parseInitialized = true

      console.log(this.themes);
   }

   getPosition(name) {         
      return this.themes[name].position
   }
   
   setGeometry() {
      
   }
   
   setMaterial() {
      
   }
   
   setMesh() {
      
   }
   
   add(mesh) {
      this.scene.add(mesh)

      this.initialized = true
   }

   update() {
      if (!this.initialized) return

      Raycaster.raycaster.setFromCamera(Mouse.mouseScene, Scene.camera)

      const intersects = Raycaster.raycaster.intersectObjects(this.themesModel.children)

      for (let i = 0; i < intersects.length; i ++) {
         console.log('hover ' + intersects[ i ].object.id)
      }
   }
}

const out = new Themes()
export default out