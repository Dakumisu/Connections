import { Color, DoubleSide, LinearFilter, Mesh, PlaneBufferGeometry, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, VideoTexture } from 'three'
import { gsap } from 'gsap'

import Scene from '@js/Scene'
import { Store } from '@js/Store'

import vertex from '@glsl/darkHole/vertex.vert'
import fragment from '@glsl/darkHole/fragment.frag'

import bouleNoire from '@static/video/laboulenoir.mp4'
import boulenoirAlpha from '@static/video/laboulenoirAlpha.mp4'

class DarkHole {
   constructor(opt) {
      this.darkHole = {}

      this.initialized = false
   }

   start() {
      this.init()
      this.resize()
   }

   init() {
      this.videoTexture = this.getVideo(bouleNoire)
      this.videoTextureAlpha = this.getVideo(boulenoirAlpha)

      this.setGeometry()
      this.setMaterial()
      this.setMesh()

      this.initialized = true
   }

   setGeometry() {
      this.darkHole.geometry = new PlaneBufferGeometry(24, 24, 1, 1)
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
         transparent: true
      })

   }

   setMesh() {
      this.darkHole.mesh = new Mesh(this.darkHole.geometry, this.darkHole.material)
      this.darkHole.mesh.frustumCulled = false // https://threejs.org/docs/#api/en/core/Object3D.frustumCulled
      this.darkHole.mesh.position.z = 50

      this.add(this.darkHole.mesh)
   }

   add(mesh) {
      Scene.scene.add(mesh)
   }

   getVideo(src) {
      const video = document.createElement('video')
      video.src = src
      video.autoplay = true
      video.loop = true
      
      const videoTexture = new VideoTexture(video);
      videoTexture.minFilter = LinearFilter;
      videoTexture.magFilter = LinearFilter;
      videoTexture.format = RGBFormat;

      return videoTexture
   }

   fadeOut() {
      gsap.to(this.darkHole.mesh.material.uniforms.uAlpha, 2, { value: 0, ease: 'Power3.easeOut', onComplete: () => {
         this.darkHole.mesh.visible = false
      } })
   }

   fadeIn() {
      this.darkHole.mesh.visible = true
      gsap.to(this.darkHole.mesh.material.uniforms.uAlpha, 2, { value: 1, ease: 'Power3.easeOut' })
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

const out = new DarkHole()
export default out