import { Store } from '@js/Store'

import datas from '@src/json/connections.json'

class Datas {
   constructor() {
      this.datas = datas

      this.init()
   }

   init() {
      Store.datas = this.datas

      // this.getProfile()
      // this.getPseudo()
      // this.getAnimal()
      // this.getArt()
      // this.getFood()
      // this.getDesign()
      // this.getMovieType()
      // this.getBookType()
      // this.getGame()
      // this.getMusic()
      // this.getSocialNetwork()
      // this.getSport()
      // this.getEvent()
   }

   getProfile() {
      return this.datas.filter(data => {
         console.log(data.profile);
      })
   }

   getPseudo() {
      return this.datas.filter(data => {
         console.log(data.pseudo);
      })
   }

   getAnimal() {
      return this.datas.filter(data => {
         console.log(data.animal);
      })
   }

   getArt() {
      return this.datas.filter(data => {
         console.log(data.art);
      })
   }

   getFood() {
      return this.datas.filter(data => {
         console.log(data.food);
      })
   }

   getDesign() {
      return this.datas.filter(data => {
         console.log(data.design);
      })
   }

   getMovieType() {
      return this.datas.filter(data => {
         console.log(data.movieType);
      })
   }

   getBookType() {
      return this.datas.filter(data => {
         console.log(data.bookType);
      })
   }

   getGame() {
      return this.datas.filter(data => {
         console.log(data.game);
      })
   }

   getMusic() {
      return this.datas.filter(data => {
         console.log(data.music);
      })
   }

   getSocialNetwork() {
      return this.datas.filter(data => {
         console.log(data.socialNetwork);
      })
   }

   getSport() {
      return this.datas.filter(data => {
         console.log(data.sport);
      })
   }

   getEvent() {
      return this.datas.filter(data => {
         console.log(data.event);
      })
   }
}

const out = new Datas()
export default out