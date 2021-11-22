import { Color, DoubleSide, LinearFilter, Mesh, PlaneBufferGeometry, RGBFormat, ShaderMaterial, Vector2, VideoTexture } from 'three'

import Scene from '@js/Scene'
import { Store } from '@js/Store'
import loadGLTF from '@utils/loader/loadGLTF'

import theme from '@model/testpoints.glb'

console.log(theme);

class Themes {
   constructor(opt) {
      this.scene = Scene.scene


      this.initialized = false

      this.init()
   }

   init() {
     this.loadModel()
   }

   loadModel() {
      loadGLTF(theme).then( value => {
         this.themes = value.scenes[0];
         console.log(this.themes);

         this.add(this.themes)
         this.initialized = true
      })
   }

   setGeometry() {

   }

   setMaterial() {

   }

   setMesh() {
      
   }

   add(mesh) {
      console.log(mesh);
      this.scene.add(mesh)
   }

   update() {
      if (!this.initialized) return

   }
}

export default Themes