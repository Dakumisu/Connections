import * as THREE from 'three'

import { Store } from '@js/Store'
import Raf from '@js/Raf'
import { Vector3 } from 'three'

const twoPi = Math.PI * 2
class Scene {
   constructor() {
      this.canvas = document.querySelector('canvas.webgl')

      this.init()
      this.resize()
   }

   init() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, Store.sizes.width / Store.sizes.height, 0.01, 1000)
      this.camera.position.set(0, 0, 15);
      this.camera.lookAt(new Vector3())

      this.renderer = new THREE.WebGLRenderer({
         canvas: this.canvas,
         powerPreference: 'high-performance',
         antialias: true,
         alpha: true
      })
      this.renderer.setSize(Store.sizes.width, Store.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      // this.renderer.setClearColor(0x000000, 1)

      this.scene.add(this.camera)
   }

   resize() {
      window.addEventListener('resize', () => {
         // Update sizes
         Store.sizes.width = window.innerWidth
         Store.sizes.height = window.innerHeight
     
         // Update camera
         this.camera.aspect = Store.sizes.width / Store.sizes.height
         this.camera.updateProjectionMatrix()
     
         // Update renderer
         this.renderer.setSize(Store.sizes.width, Store.sizes.height)
         this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
     })
   }

   update() {
      // this.camera.position.x = Math.cos(Raf.timeElapsed *.005) * twoPi
      // this.camera.position.y = Math.sin(Raf.timeElapsed *.005) * twoPi
   }
   
   render () {
      this.renderer.render(this.scene, this.camera)
   }
}

const out = new Scene()
export default out