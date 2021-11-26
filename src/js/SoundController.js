import { gsap } from 'gsap'
import { Store } from '@js/Store'
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

import btnSoundClick from '@static/sound/button.mp3'
import atmosSound from '@static/sound/atmosphericsound.mp3'

class SoundController {
   constructor() {
      
      this.btnClickSound = new Howl({
         src: [btnSoundClick],
         volume: 0.1,
      });

      this.ambientSound = new Howl({
         src: [atmosSound],
         volume: 0.5,
         loop: true
      });

      this.ambientMusicOn = false

      this.event()
   }

   event() {
      window.addEventListener('click', () => {
         if (!this.ambientMusicOn) {
            this.ambientSound.play()
            this.ambientMusicOn = true
         }
      })


      Store.nodes.start.addEventListener('click', () => {
         this.btnClickSound.play()
      })

      Store.nodes.back_home.addEventListener('click', () => {
         this.btnClickSound.play()
      })
   }
}

const out = new SoundController()
export default out