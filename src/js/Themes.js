import { Color, Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three'

import Scene from '@js/Scene'
import Raycaster from '@js/Raycaster'
import Mouse from '@js/Mouse'
import SphereParticles from '@js/SphereParticles'
import { Store } from '@js/Store'

import loadGLTF from '@utils/loader/loadGLTF'

import theme from '@model/themes.glb'

class Themes {
   constructor(opt) {
      this.themes = {}
      this.sphereParticles = []

      this.initialized = false
      this.parseInitialized = false
   }

   start() {
      this.setGeometry()
      this.setMaterial()
     this.loadModel()
     this.event()
   }

   loadModel() {
      loadGLTF(theme).then( value => {
         this.themesModel = value.scenes[0]

         this.setThemeName()
         this.parseTheme().then(() => {

            this.addSphereParticles()
            this.addTheme()
            this.addThemeChild()
            this.add(this.themesModel)
            
            this.initialized = true
         })
      })
   }

   addTheme() {
      this.themesModel.children.forEach(theme => {
         this.createThemeMesh(theme)
         theme.visible = false
      })
   }

   addThemeChild() {
      for (const label in this.themes) {
         this.themes[label].themeChild = []
         for (let i = 0; i < Store.list.themes.length; i++) {
            if (Store.list.themes[i] == label) {
               for (let j = 0; j < Store.list.themesChilds[label].length; j++) {
                  this.themes[label].themeChild.push({})
                  this.themes[label].themeChild[j]
                  this.themes[label].themeChild[j].name = Store.list.themesChilds[label][j]
                  this.createThemeChildMesh(this.themes[label], this.themes[label].themeChild[j])
               }
            }
         }
      }
   }

   addSphereParticles() {
      for (const label in this.themes) {
         const pos = this.getPosition(label)

         const sphereParticles = new SphereParticles()

         sphereParticles.particles.mesh.position.copy(pos)

         this.sphereParticles.push(sphereParticles)
      }
   }

   createThemeMesh(theme) {
      const themeMesh = this.setMesh()

      themeMesh.material.color = new Color("#82A5FF")

      themeMesh.scale.set(.75, .75, .75)
      themeMesh.position.copy(theme.position)
      themeMesh.name = theme.name

      this.add(themeMesh)
   }

   createThemeChildMesh(object, child) {
      child.mesh = this.setMesh()
      
      child.mesh.material.color = new Color('#82A5FF')

      child.mesh.scale.set(.075, .075, .075)

      const pos = this.getPosition(object.theme.name)

      child.mesh.position.copy(pos)
      child.mesh.position.x += (.5 - Math.random()) * .5
      child.mesh.position.y += (.5 - Math.random()) * .5
      child.mesh.position.z += (.5 - Math.random()) * .5

      this.add(child.mesh)
   }

   setThemeName() {
      for (let i = 0; i < this.themesModel.children.length; i++) {
         this.themesModel.children[i].name = Store.list.themes[i]
      }
   }
   
   async parseTheme() {
      const promise = new Promise(resolve => {
         for (let i = 0; i < this.themesModel.children.length; i++) {
            this.themes[this.themesModel.children[i].name] = {}
            // this.themesModel.children[i].name
            this.themes[this.themesModel.children[i].name].theme = {}
            this.themes[this.themesModel.children[i].name].theme.name = this.themesModel.children[i].name
            this.themes[this.themesModel.children[i].name].theme.mesh = this.themesModel.children[i]
         }

         resolve('done')
      })
   }

   getPosition(name) {
      return this.themes[name].theme.mesh.position
   }

   getChildPosition(name, name2) {
      let result = null

      this.themes[name].themeChild.forEach((child, i) => {
         if (child.name == name2) {
            result = this.themes[name].themeChild[i].mesh.position
            return
         }
      })

      return result
   }
   
   setGeometry() {
      this.sphereGeo = new SphereBufferGeometry(.05, 32, 32)
   }
   
   setMaterial() {
      const sphereMat = new MeshBasicMaterial({
         color: new Color(0xff0000)
      })
      return sphereMat
   }
   
   setMesh() {
      const sphereMesh = new Mesh(this.sphereGeo, this.setMaterial())

      return sphereMesh
   }
   
   add(object) {
      Scene.scene.add(object)
   }

   event() {
      window.addEventListener('click', () => {
         if (this.intersects.length) {
            console.log(this.intersects[0].object.name);
         }
      })
   }

   update() {
      if (!this.initialized) return

      this.sphereParticles.forEach(particle => {
         particle.update()
      })

      Raycaster.raycaster.setFromCamera(Mouse.mouseScene, Scene.camera)

      this.intersects = Raycaster.raycaster.intersectObjects(this.themesModel.children)

      // document.body.style.cursor = 'default'
      for (let i = 0; i < this.intersects.length; i ++) {
         document.body.style.cursor = 'pointer'
         // console.log('hover ' + this.intersects[ i ].object.id)
      }
   }
}

const out = new Themes()
export default out