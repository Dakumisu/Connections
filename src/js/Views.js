import { gsap } from 'gsap'

import Raf from '@js/Raf'
import Control from '@js/Control'
import DarkHole from '@js/DarkHole'
import Scene from '@js/Scene'
import { Store } from '@js/Store'

class Views {
   constructor() {

      this.dom = [...document.querySelectorAll('[data-ref]')]
      this.nodes = {}

      this.currentView = null
      this.init()
      this.event()
   }

   init() {
      for (const dom in this.dom) {
         this.nodes[this.dom[dom].dataset.ref] = this.dom[dom]
      }

      this.currentView = Store.views.preloader
   }

   changeView(view) {
      this.currentView = Store.views[view]

      if (this.currentView == 'exp') Control.use()
      if (this.currentView == 'home' || this.currentView == 'about') Control.stop()
   }

   goToAbout() {
      this.changeView('about')

      gsap.to(this.nodes.home, 1, { opacity: 0, ease: 'Power3.easeInOut', onComplete: () => {
         this.nodes.home.classList.add('hide')

         this.nodes.about.classList.remove('hide')
         gsap.to(this.nodes.about, 1, { opacity: 1, ease: 'Power3.easeInOut' })
         this.nodes.hud_button.children[0].innerHTML = 'connections'
      } })

      // gsap.to(this.nodes.canvas, 1, { opacity: 0, ease: 'Power3.easeInOut' })
   }
   
   goToHome() {
      this.changeView('home')

      gsap.to(this.nodes.about, 1, { opacity: 0, ease: 'Power3.easeInOut', onComplete: () => {
         this.nodes.about.classList.add('hide')
         this.nodes.home.classList.remove('hide')

         gsap.to(this.nodes.home, 2, { opacity: 1, ease: 'Power3.easeInOut' })
         // gsap.to(this.nodes.canvas, 1, { opacity: 1, ease: 'Power3.easeInOut', delay: 1 })
         this.nodes.hud_button.children[0].innerHTML = 'about'
      } })

   }

   startExp() {
      this.nodes.localisation.classList.add('toWhite')

      // DarkHole.fadeOut()

      gsap.to(this.nodes.main_container, 2, {yPercent: 100, ease: 'Power3.easeInOut', delay: 1})
      gsap.to(this.nodes.canvas, 2, {opacity: 0, ease: 'Power3.easeOut',  onComplete: () => {
         Scene.startExp()
         this.changeView('exp')
         gsap.to(this.nodes.canvas, 1, {opacity: 1, ease: 'Power3.easeOut', delay: 1})
         gsap.to(this.nodes.exp_container, 1, {opacity: 1, ease: 'Power3.easeOut', delay: 1, onComplete: () => {
            this.nodes.hub_right_bottom.style.pointerEvents = 'all'
            this.nodes.localisation.children[1].innerHTML = "( theme : overall )"
         }})
      }})
   }

   backHome() {
      this.nodes.localisation.classList.remove('toWhite')

      
      Scene.backHome()
      gsap.to(this.nodes.exp_container, 1, {opacity: 0, ease: 'Power3.easeOut', onComplete: () => {
         this.nodes.hub_right_bottom.style.pointerEvents = 'none'
         this.nodes.localisation.children[1].innerHTML = "( theme : nowhere )"
         // DarkHole.fadeIn()
         Control.controls.reset()
         Scene.camera.updateProjectionMatrix()
         this.changeView('home')
      }})

      // gsap.to(this.nodes.canvas, 2, {opacity: 0, ease: 'Power3.easeOut', onComplete: () => {
         // gsap.to(this.nodes.canvas, 1, {opacity: 1, ease: 'Power3.easeOut', delay: 2})
         gsap.to(this.nodes.main_container, 2, {yPercent: 0, ease: 'Power3.easeInOut'})
      // }})
   }

   event() {
      this.nodes.hud_button.addEventListener('click', () => {
         this.nodes.hud_button.children[0].innerHTML == 'about' ? this.goToAbout() : this.goToHome()
      })

      this.nodes.start.addEventListener('click', () => {
         this.startExp()
      })

      this.nodes.back_home.addEventListener('click', () => {
         this.backHome()
      })
   }
}

const out = new Views()
export default out