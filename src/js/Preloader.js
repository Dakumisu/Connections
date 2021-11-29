import { gsap } from 'gsap'
import { Store } from '@js/Store'

class Preloader {
   constructor() {

      this.initialized = false
      
      setTimeout(() => {
         
         this.beforePreload()
      }, 500);
   }

   beforePreload() {
      // Just in case
      const titleSplit = [...Store.nodes.home_title.children[0].children[0].children];
      titleSplit.forEach(e => {
         e.style.opacity = 0
      })
      Store.nodes.hud_button.style.opacity = 0
      Store.nodes.logo.style.opacity = 0
      Store.nodes.caption.style.opacity = 0
      Store.nodes.start.style.opacity = 0
      Store.nodes.localisation.style.opacity = 0

      this.preload()
   }

   preload() {
      gsap.to(Store.nodes.preload_value, 5,{ scaleX: 1, ease: "Power0.easeNone", onComplete: () => {
         gsap.to(Store.nodes.preloader, 1, { opacity: 0, ease: "Power0.easeNone", onComplete: () => {
            gsap.fromTo(Store.nodes.hud_button, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut" })
            gsap.fromTo(Store.nodes.home_title.children[0].children[0].children, 2, { opacity: 0, yPercent: -20, stagger: { each: .04, from: 'start'} }, { yPercent: 0, opacity: .75, stagger: { each: .04, from: 'start'}, ease: "Power3.easeInOut", delay: .25 })
            gsap.fromTo(Store.nodes.logo, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: 1, ease: "Power3.easeInOut", delay: .5 })
            gsap.fromTo(Store.nodes.caption, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: .75 })
            gsap.fromTo(Store.nodes.start, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: 1 })
            gsap.fromTo(Store.nodes.localisation, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: 1.25 })
            
            Store.nodes.preloader.remove()
         } })
      }})
   }
}

const out = new Preloader()
export default out

/* 
   Actually, this is a fake Preloader but hush ! It'll be our secret 👀
*/