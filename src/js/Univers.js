import { Color, Group, Mesh, MeshBasicMaterial, SphereBufferGeometry, Vector2 } from 'three'

import Scene from '@js/Scene'
import Mouse from '@js/Mouse'
import { Store } from '@js/Store'

// import vertex from '@glsl/sphereParticles/vertex.vert'
// import fragment from '@glsl/sphereParticles/fragment.frag'

class Univers {
   constructor(opt) {

      this.univers = {}
      this.univers.group = new Group()

      this.target = new Vector2()

      this.initialized = false

      this.init()
   }

   init() {
      this.setGeometry()
      this.setMaterial()
      this.setMesh()

      this.initialized = true
   }

   setGeometry() {
      this.univers.geometry = new SphereBufferGeometry(10, 64, 32)
   }

   setMaterial() {
      // this.univers.material = new ShaderMaterial({
      //    vertexShader: vertex,
      //    fragmentShader: fragment,
      //    uniforms: {
      //       uTime: { value : 0 },
      //       uColor: { value: new Color(0xffffff) },
      //       uAlpha: { value: 1 },
      //       uRandomAxis: { value: this.randomAxis },
      //       uResolution : { value : tVec2a.set(Store.sizes.width, Store.sizes.height) },
      //       uPixelRatio: { value: window.devicePixelRatio },
      //    },
      //    side: DoubleSide,
      //    transparent: true,

      //    /* pour les particules */
      //    depthTest: true,
      //    depthWrite: false,
      //    blending: AdditiveBlending
      // })

      this.univers.material = new MeshBasicMaterial({
         color: new Color("#fff"),
         transparent: true,
         wireframe: true
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

   update(time) {
      if (!this.initialized) return

      this.target.x = -Mouse.mouseScene.x * 0.4;
      this.target.y = Mouse.mouseScene.y * 0.4;

      this.univers.group.rotation.y += (.02 * (this.target.x / 2 - this.univers.group.rotation.y));
      this.univers.group.rotation.x += (.02 * (this.target.y / 2 - this.univers.group.rotation.x));   }
}

export default Univers