import { Color, DoubleSide, Group, LinearFilter, Mesh, MeshBasicMaterial, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, VideoTexture } from 'three'
import { gsap } from 'gsap'

import Scene from '@js/Scene'
import Mouse from '@js/Mouse'
import { Store } from '@js/Store'

import vertex from '@glsl/univers/vertex.vert'
import fragment from '@glsl/univers/fragment.frag'

import bouleNoire from '@static/video/laboulenoir.mp4'

class Univers {
   constructor(opt) {

      this.univers = {}
      this.univers.group = new Group()

      this.target = new Vector2()

      this.initialized = false
   }
   
   start() {
      this.init()
   }

   init() {
      this.videoTexture = this.getVideo(bouleNoire)
      this.setGeometry()
      this.setMaterial()
      this.setMesh()

      this.initialized = true
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

   setGeometry() {
      this.univers.geometry = new SphereBufferGeometry(25, 64, 32)
   }

   setMaterial() {
      this.univers.material = new ShaderMaterial({
         vertexShader: vertex,
         fragmentShader: fragment,
         uniforms: {
            uTime: { value : 0 },
            uAlpha: { value : 1 },
            uVideoTexture: { value: this.videoTexture },
            uAspect : { value : new Vector2(Store.sizes.width, Store.sizes.height) },
            uPixelRatio: { value: window.devicePixelRatio }
         },
         side: DoubleSide,
         transparent: true
      })
   }

   setMesh() {
      this.univers.mesh = new Mesh(this.univers.geometry, this.univers.material)
      this.univers.mesh.frustumCulled = false

      this.addToGroup(this.univers.mesh)
   }
   
   addToGroup(object) {
      this.univers.group.add(object)

      this.add(this.univers.group)
   }

   add(object) {
      Scene.scene.add(object)
   }

   fadeOut() {
      gsap.to(this.univers.mesh.material.uniforms.uAlpha, 3, { value: 0, ease: 'Power3.easeInOut', onComplete: () => {
         this.univers.mesh.visible = false
      } })
   }

   update() {
      if (!this.initialized) return

      this.target.x = -Mouse.mouseScene.x * 0.4;
      this.target.y = Mouse.mouseScene.y * 0.4;

      this.univers.group.rotation.y += (.02 * (this.target.x / 2 - this.univers.group.rotation.y));
      this.univers.group.rotation.x += (.02 * (this.target.y / 2 - this.univers.group.rotation.x));   }
}

const out = new Univers()
export default out