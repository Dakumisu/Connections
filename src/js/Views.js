import { gsap } from 'gsap'

import Raf from '@js/Raf'
import Control from '@js/Control'
import Scene from '@js/Scene'
import Preloader from '@js/Preloader'
import Connections from '@js/Connections'
import User from '@js/User'
import Score from '@js/Score'
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

      Store.nodes = this.nodes

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
   }
   
   goToHome() {
      this.changeView('home')

      gsap.to(this.nodes.about, 1, { opacity: 0, ease: 'Power3.easeInOut', onComplete: () => {
         this.nodes.about.classList.add('hide')
         this.nodes.home.classList.remove('hide')

         gsap.to(this.nodes.home, 2, { opacity: 1, ease: 'Power3.easeInOut' })
         this.nodes.hud_button.children[0].innerHTML = 'about'
      } })

   }

   startExp() {
      this.nodes.localisation.classList.add('toWhite')

      gsap.to(this.nodes.main_container, 2, {yPercent: 100, ease: 'Power3.easeInOut', delay: 1})
      gsap.to(this.nodes.canvas, 2, {opacity: 0, ease: 'Power3.easeOut',  onComplete: () => {
         Scene.startExp()
         this.changeView('exp')
         gsap.to(this.nodes.canvas, 1, {opacity: 1, ease: 'Power3.easeOut', delay: 1})
         this.nodes.local_theme.innerHTML = "overall"
         gsap.to(this.nodes.exp_container, 1, {opacity: 1, ease: 'Power3.easeOut', delay: 1, onComplete: () => {
            this.nodes.hub_right_bottom.style.pointerEvents = 'all'
         }})
      }})
   }

   backHome() {
      this.nodes.localisation.classList.remove('toWhite')

      Scene.backHome()
      gsap.to(this.nodes.exp_container, 1, {opacity: 0, ease: 'Power3.easeOut', onComplete: () => {
         this.nodes.hub_right_bottom.style.pointerEvents = 'none'
         this.nodes.local_theme.innerHTML = "nowhere"
         
         Control.controls.reset()
         Scene.camera.updateProjectionMatrix()
         this.changeView('home')
      }})

      gsap.to(this.nodes.main_container, 2, {yPercent: 0, ease: 'Power3.easeInOut'})

      const titleHomeSplit = [...Store.nodes.home_title.children[0].children[0].children];
      titleHomeSplit.forEach(e => {
         e.style.opacity = 0
      })
      const titleAboutSplit = [...Store.nodes.about_title.children[0].children[0].children];
      titleAboutSplit.forEach(e => {
         e.style.opacity = 0
      })
      Store.nodes.hud_button.style.opacity = 0
      Store.nodes.logo.style.opacity = 0
      Store.nodes.caption.style.opacity = 0
      Store.nodes.start.style.opacity = 0
      Store.nodes.localisation.style.opacity = 0
      Store.nodes.about_text.style.opacity = 0
      Store.nodes.about_credit.style.opacity = 0
      Store.nodes.about_end.style.opacity = 0
      
      gsap.fromTo(Store.nodes.hud_button, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut" })

      gsap.fromTo(Store.nodes.home_title.children[0].children[0].children, 2, { opacity: 0, yPercent: -20, stagger: { each: .04, from: 'start'} }, { yPercent: 0, opacity: .75, stagger: { each: .04, from: 'start'}, ease: "Power3.easeInOut", delay: .25 })
      gsap.fromTo(Store.nodes.logo, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: 1, ease: "Power3.easeInOut", delay: .5 })
      gsap.fromTo(Store.nodes.caption, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: .75 })

      gsap.fromTo(Store.nodes.about_title.children[0].children[0].children, 2, { opacity: 0, yPercent: -20, stagger: { each: .04, from: 'start'} }, { yPercent: 0, opacity: .75, stagger: { each: .04, from: 'start'}, ease: "Power3.easeInOut", delay: .25 })
      gsap.fromTo(Store.nodes.about_text, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: .5 })
      gsap.fromTo(Store.nodes.about_credit, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: .75 })
      gsap.fromTo(Store.nodes.about_end, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: .75 })

      gsap.fromTo(Store.nodes.start, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: 1 })
      gsap.fromTo(Store.nodes.localisation, 2, { opacity: 0, yPercent: -20 }, {yPercent: 0, opacity: .75, ease: "Power3.easeInOut", delay: 1.25 })
   }

   goToUserInfo(name) {
      this.changeView('userInfos')

      gsap.fromTo(this.nodes.user_info, 2, { opacity: 0, ease: 'Power3.easeInOut' }, { opacity: 1, ease: 'Power3.easeInOut' })
      this.nodes.hub_left_bottom.children[0].classList.remove('hide')
      this.nodes.user_info.classList.remove('hide')
      this.nodes.connections_count.innerHTML = Connections.getUserConnections(name).length
      this.nodes.coordinate.innerHTML =  `[${Store.users[name].position.x.toFixed(2)}, ${Store.users[name].position.y.toFixed(2)}, ${Store.users[name].position.z.toFixed(2)}]`
      this.nodes.hub_left_bottom.children[1].classList.add('hide')

      this.nodes.canvas.children[0].classList.add('clickCanvas')
      
      this.nodes.user_pseudo.innerHTML = name

      /* Clean up match.es' display */
      let tmpCount = this.nodes.user_good_matching_score.children.length
      for (let i = 0; i < tmpCount; i++) {
         this.nodes.user_good_matching_score.children[0].remove()
      }
      tmpCount = this.nodes.user_worst_matching_score.children.length
      for (let i = 0; i < tmpCount; i++) {
         this.nodes.user_worst_matching_score.children[0].remove()
      }

      /* Best match.es */
      const highScores = Store.users[name].highScores
      
      const highScoreDocFragment = document.createDocumentFragment()

      for (const name in highScores) {
         const userContent = document.createElement('div')
         userContent.classList.add('user')

         const userName = document.createElement('span')
         userName.innerHTML = name
         const userScore = document.createElement('span')
         userScore.innerHTML = highScores[name].toFixed(2) + " %"

         userContent.append(userName)
         userContent.append(userScore)

         highScoreDocFragment.append(userContent)
      }

      this.nodes.user_good_matching_score.append(highScoreDocFragment)

      /* Worst match.es */
      const worstScores = Store.users[name].worstScores
      const worstScoreDocFragment = document.createDocumentFragment()

      for (const name in worstScores) {
         const userContent = document.createElement('div')
         userContent.classList.add('user')

         const userName = document.createElement('span')
         userName.innerHTML = name
         const userScore = document.createElement('span')
         userScore.innerHTML = worstScores[name].toFixed(2) + " %"

         userContent.append(userName)
         userContent.append(userScore)

         worstScoreDocFragment.append(userContent)
      }

      this.nodes.user_worst_matching_score.append(worstScoreDocFragment)

      this.nodes.local_place.innerHTML = name
      this.nodes.local_theme.innerHTML = 'user'
      
      gsap.to(this.nodes.canvas.children[0], 1.5, { scale: .65, xPercent: -15, yPercent: -5, ease: 'Power3.easeInOut' })
   }

   goToThemeInfo(theme) {
      this.changeView('themeInfos')

      gsap.fromTo(this.nodes.theme_info, 2, { opacity: 0, ease: 'Power3.easeInOut' }, { opacity: 1, ease: 'Power3.easeInOut' })
      this.nodes.hub_left_bottom.children[0].classList.remove('hide')
      this.nodes.theme_info.classList.remove('hide')
      this.nodes.connections_count.innerHTML = Connections.getThemeConnections(theme).length
      this.nodes.coordinate.innerHTML =  `[${Store.themes[theme].position.x.toFixed(2)}, ${Store.themes[theme].position.y.toFixed(2)}, ${Store.themes[theme].position.z.toFixed(2)}]`
      this.nodes.hub_left_bottom.children[1].classList.add('hide')

      this.nodes.canvas.children[0].classList.add('clickCanvas')
      
      this.nodes.theme_name.innerHTML = Store.list.themesName[theme]

      /* Clean up rating display */
      let tmpCount = this.nodes.theme_child_rating.children.length
      for (let i = 0; i < tmpCount; i++) {
         this.nodes.theme_child_rating.children[0].remove()
      }

      /* Theme childs rating */
      const tmpRating = Store.themes[theme].childs
      
      const rating = []
      for (const themeChild in tmpRating) {
         rating.push([themeChild, tmpRating[themeChild]])
      }
      rating.sort( (a, b) => b[1] - a[1] )

      const docFragment = document.createDocumentFragment()

      rating.forEach(themeChild => {
         const userContent = document.createElement('div')
         userContent.classList.add('theme')
         
         const themeChildName = document.createElement('span')
         themeChildName.innerHTML = themeChild[0]
         
         const themeChildRate = document.createElement('span')
         themeChildRate.innerHTML = themeChild[1].toFixed(2) + " %"
         
         if (themeChild[0] == 'Nothing') {
            themeChildName.classList.add('red')
            themeChildRate.classList.add('red')
         }
         
         userContent.append(themeChildName)
         userContent.append(themeChildRate)
         
         docFragment.append(userContent)
      })

      this.nodes.theme_child_rating.append(docFragment)

      this.nodes.local_place.innerHTML = Store.list.themesName[theme]
      this.nodes.local_theme.innerHTML = 'theme'
      
      gsap.to(this.nodes.canvas.children[0], 1.5, { scale: .65, xPercent: -15, yPercent: -5, ease: 'Power3.easeInOut' })
   }
   
   backExp() {
      if (this.currentView == 'userInfos') {
         gsap.to(this.nodes.user_info, 1, { opacity: 0, ease: 'Power3.easeInOut', onComplete: () => {
            this.nodes.user_info.classList.add('hide')
         }})
      } else if (this.currentView == 'themeInfos') {
         gsap.to(this.nodes.theme_info, 1, { opacity: 0, ease: 'Power3.easeInOut', onComplete: () => {
            this.nodes.theme_info.classList.add('hide')
         }})
      }

      this.changeView('exp')
      
      this.nodes.hub_left_bottom.children[0].classList.add('hide')
      this.nodes.hub_left_bottom.children[1].classList.remove('hide')
      this.nodes.local_place.innerHTML = 'plateau'
      this.nodes.local_theme.innerHTML = 'overall'
      this.nodes.connections_count.innerHTML = Connections.connections.themes.length + Connections.connections.users.length
      
      this.nodes.canvas.children[0].classList.remove('clickCanvas')

      gsap.to(this.nodes.canvas.children[0], 1.5, { scale: 1, xPercent: 0, yPercent: 0, ease: 'Power3.easeInOut' })
   }

   event() {
      this.nodes.hud_button.addEventListener('click', () => {
         this.nodes.hud_button.children[0].innerHTML == 'about' ? this.goToAbout() : this.goToHome()
      })

      this.nodes.start.addEventListener('click', () => {
         this.startExp()
      })

      this.nodes.back_home.addEventListener('click', () => {
         if (this.currentView == 'userInfos' || this.currentView == 'themeInfos') this.backExp()
         
         this.backHome()
      })

      this.nodes.canvas.children[0].addEventListener('click', () => {
         if (this.currentView == 'userInfos' || this.currentView == 'themeInfos') this.backExp()
      })
   }
}

const out = new Views()
export default out