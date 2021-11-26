import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // https://threejs.org/docs/#examples/en/controls/OrbitControls

import Scene from '@js/Scene'

class Control {
   constructor() {
      this.camera = Scene.camera
      this.renderer = Scene.renderer

      this.init()
   }
   
   init() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
   
      this.controls.enabled = false
      this.controls.maxDistance = 50
   }

   stop() {
      this.controls.enabled = false
   }
   
   use() {
      this.controls.enabled = true
   }

   reset() {
      this.controls.reset()
   }
}

const out = new Control()
export default out