import { Color, DoubleSide, LinearFilter, Mesh, PlaneBufferGeometry, RGBFormat, ShaderMaterial, SphereBufferGeometry, Vector2, VideoTexture } from 'three'

import Scene from '@js/Scene'
import { Store } from '@js/Store'

import vertex from '@glsl/vertex.vert'
import fragment from '@glsl/fragment.frag'

import bouleNoire from '@static/video/laboulenoir.mp4'
import boulenoirAlpha from '@static/video/laboulenoirAlpha.mp4'

class Blueprint {
   constructor(opt) {
      this.scene = Scene.scene

      this.blueprint = {}

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

      this.initialized = true
      // this.getVideo(bouleNoire).then(( value ) => {
      //    this.videoTexture = value;

      //    this.getVideo(boulenoirAlpha).then(( value ) => {
      //       this.videoTextureAlpha = value;

      //       this.setGeometry()
      //       this.setMaterial()
      //       this.setMesh()
      
      //       this.initialized = true
      //    })
      // })
   }

   setGeometry() {
      this.blueprint.geometry = new PlaneBufferGeometry(1, 1, 1, 1)
   }

   setMaterial() {
      this.blueprint.material = new ShaderMaterial({
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
      this.blueprint.mesh = new Mesh(this.blueprint.geometry, this.blueprint.material)
      this.blueprint.mesh.frustumCulled = false // https://threejs.org/docs/#api/en/core/Object3D.frustumCulled

      this.add(this.blueprint.mesh)
   }

   add(mesh) {
      console.log(mesh);
      this.scene.add(mesh)
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
         this.blueprint.material.uniforms.uAspect.value = new Vector2(Store.sizes.width, Store.sizes.height)
         this.blueprint.material.uniforms.uPixelRatio.value = window.devicePixelRatio
     })
   }

   update() {
      if (!this.initialized) return

   }
}

export default Blueprint