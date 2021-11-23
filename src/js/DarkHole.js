import { Color, DoubleSide, LinearFilter, Mesh, PlaneBufferGeometry, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, VideoTexture } from 'three'

import Scene from '@js/Scene'
import { Store } from '@js/Store'

import vertex from '@glsl/vertex.vert'
import fragment from '@glsl/fragment.frag'

import bouleNoire from '@static/video/laboulenoir.mp4'
import boulenoirAlpha from '@static/video/laboulenoirAlpha.mp4'

class DarkHole {
   constructor(opt) {
      this.scene = Scene.scene

      this.darkHole = {}

      this.initialized = false

      this.init()
      this.resize()
   }

   init() {
      this.videoTexture = this.getVideo(bouleNoire)
      this.videoTextureAlpha = this.getVideo(boulenoirAlpha)

      this.setGeometry()
      this.setMaterial()
      this.setMesh()
   }

   setGeometry() {
      this.darkHole.geometry = new PlaneBufferGeometry(1, 1, 1, 1)
   }

   setMaterial() {
      this.darkHole.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uVideoTexture: { value: this.videoTexture },
            uVideoTextureAlpha: { value: this.videoTextureAlpha },
            uColor: { value: new Color(0xffffff) },
            uAlpha: { value: 1 },
            uAspect : { value : new Vector2(Store.sizes.width, Store.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio }
         },
         side: DoubleSide,
         transparent: true,

         /* pour les particules */
         // depthTest: false,
         // depthWrite: false,
         // blending: THREE.AdditiveBlending
      })

   }

   setMesh() {
      this.darkHole.mesh = new Mesh(this.darkHole.geometry, this.darkHole.material)
      this.darkHole.mesh.frustumCulled = false // https://threejs.org/docs/#api/en/core/Object3D.frustumCulled

      this.add(this.darkHole.mesh)
   }

   add(mesh) {
      this.scene.add(mesh)

      this.initialized = true
   }

   getVideo(src) {
      // const promise = new Promise((resolve, reject) => {
         const video = document.createElement('video')
         video.src = src
         video.autoplay = true
         video.loop = true
         
         const videoTexture = new VideoTexture(video);
         videoTexture.minFilter = LinearFilter;
         videoTexture.magFilter = LinearFilter;
         videoTexture.format = RGBFormat;

         // resolve(videoTexture);
      // });

      return videoTexture
      // return promise
   }

   resize() {
      window.addEventListener('resize', () => {
         this.darkHole.material.uniforms.uAspect.value = new Vector2(Store.sizes.width, Store.sizes.height)
         this.darkHole.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update() {
      if (!this.initialized) return

   }
}

export default DarkHole