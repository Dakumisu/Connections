import { Store } from '@js/Store'

import { map } from '@utils/maths'

class Score {
   constructor() {
      this.score = {}

      this.initialized = false
   }

   start() {
      this.setScore()
      this.setThemesChildsRating()
   }

   setThemesChildsRating() {
      for (const user in Store.users) {    
         Store.list.themes.forEach(theme => {
            this.splitData(Store.users[user].datas[theme]).forEach( themeChild => {
               if (Store.themes[theme].childs[themeChild] == undefined) Store.themes[theme].childs[themeChild] = 1
               else Store.themes[theme].childs[themeChild] += 1
            })
         })
      }

      for (const theme in Store.themes) {
         const themeChildsCount = Object.keys(Store.themes[theme].childs).length

         for (const cat in Store.themes[theme].childs) {
            Store.themes[theme].childs[cat] = this.getPourcent(Store.themes[theme].childs[cat], Object.keys(Store.users).length)
         }
      }
   }

   setScore() {
      const score = {}
      for (const user1 in Store.users) {
         const pseudo1 = Store.users[user1].datas.pseudo
         score[pseudo1] = {}
         for (const user2 in Store.users) {
            if (user1 != user2) {
               const pseudo2 = Store.users[user2].datas.pseudo
               score[pseudo1][pseudo2] = {}
               score[pseudo1][pseudo2].name = pseudo2

               const user2Datas = Store.users[user2].datas
               const user1Datas = Store.users[user1].datas
               
               let usersScore = 0
               for (const label in Store.list.themesChilds) {

                  const test1 = this.splitData(user1Datas[label])
                  const test2 = this.splitData(user2Datas[label])

                  // const tmpUser1Choices = []
                  // test1.forEach(e => {
                  //    tmpUser1Choices.push(Store.list.checkThemesChilds[label][e])
                  // })

                  // const tmpUser2Choices = []
                  // test2.forEach(e => {
                  //    tmpUser2Choices.push(Store.list.checkThemesChilds[label][e])
                  // })

                  let count = 0
                  test1.forEach(e1 => {
                     test2.forEach(e2 => {
                        if (e1 == e2) count++
                     })
                  })

                  
                  let tmpScore = count / Math.max(test1.length, test2.length)
                  
                  usersScore += tmpScore
               }
               
               score[pseudo1][pseudo2].score = usersScore
            }
         }
      }
      
      this.score = score
      
      for (const user in this.score) {
         Store.users[user].highScore = this.getHighScore(user).pourcent
         Store.users[user].highScores = this.getHighScore(user).scores
         Store.users[user].worstScore = this.getWorstScore(user).pourcent
         Store.users[user].worstScores = this.getWorstScore(user).scores
      }

      this.initialized = true
   }

   getThemeChildsRating(theme) {
      return Store.themes[theme]
   }

   getHighScore(name1) {
      const highScore = {}
      highScore.score = 0
      highScore.scores = []
      const top3 = []
      let diff = 0

      for (const user in this.score[name1]) {
         if ( highScore.score < this.score[name1][user].score ) {
            highScore.score = this.score[name1][user].score
            highScore.name = this.score[name1][user].name
         }
      }
      
      for (const user in this.score[name1]) {
         if ( highScore.score == this.score[name1][user].score )
         highScore.scores[this.score[name1][user].name] = this.getPourcent(this.score[name1][user].score, this.getMaxScore(name1) / 2)
      }
      
      highScore.pourcent = this.getPourcent(highScore.score, this.getMaxScore(name1) / 2)
      highScore.norm = this.getNorm(highScore.pourcent)

      return highScore;
   }
   
   getWorstScore(name1) {
      const worstScore = {}
      worstScore.score = Infinity
      worstScore.scores = []
      let diff = 0

      for (const user in this.score[name1]) {
         if (worstScore.score > this.score[name1][user].score) {
            worstScore.score = this.score[name1][user].score
            worstScore.name = this.score[name1][user].name
         }
      }

      for (const user in this.score[name1]) {
         if ( worstScore.score == this.score[name1][user].score )
            worstScore.scores[this.score[name1][user].name] = this.getPourcent(this.score[name1][user].score, this.getMaxScore(name1) / 2)
      }

      worstScore.pourcent = this.getPourcent(worstScore.score, this.getMaxScore(name1) / 2)
      worstScore.norm = this.getNorm(worstScore.pourcent)

      return worstScore
   }

   getScore(name1, name2) {
      const tmpScore = this.score[name1][name2].score
      const maxScore = this.getMaxScore(name1) / 2

      const userScore = {}
      userScore.pourcent = this.getPourcent(tmpScore, maxScore)
      userScore.norm = this.getNorm(userScore.pourcent)
      
      return userScore
   }

   getPourcent(value, valueMax) {
      return map(value, 0, valueMax, 0, 100)
   }

   getNorm(value) {
      return value / 100
   }

   getMaxScore(name) {
      const count = []

      for (let i = 0; i < Store.list.themes.length; i++) {
         this.splitData(Store.users[name].datas[Store.list.themes[i]]).forEach( e => {
            count.push(e)
         })
      }

      return count.length
   }

   splitData(data) {
      const tmpData = data.split(', ')

      return tmpData
   }
}

  // {
  //   "pseudo": "GROS TEST",
  //   "profile": "Dev",
  //   "music": "Classical, Rap, Rock, Electro, Jazz, Pop",
  //   "art": "Abstract, Pop Art, Romanticism, Surrealism, Impressionism",
  //   "game": "RPG, MMO, FPS, MOBA, Strategy, Fighting game, Simulation",
  //   "movieType": "Action, Thriller, SF, Fantastique, Animation, Comedy, Horror",
  //   "bookType": "Poetry, Novel, Essay, Comics, Manga, Biography, Documentary",
  //   "sport": "Foot, Basket, Rugby, Swimming, Tennis",
  //   "socialNetwork": "Twitter, Facebook, Instagram, Snapchat, Tiktok",
  //   "animal": "Cat",
  //   "food": "Asian, Italian, French, Indian, Fast-Food",
  //   "event": "Concert, Cinema, Art exhibition, Theater",
  //   "design": "2D, 3D"
  // },
  // {
  //   "pseudo": "GROS TEST 2",
  //   "profile": "Designer",
  //   "music": "Nothing",
  //   "art": "Nothing",
  //   "game": "Nothing",
  //   "movieType": "Nothing",
  //   "bookType": "Nothing",
  //   "sport": "Nothing",
  //   "socialNetwork": "Nothing",
  //   "animal": "Nothing",
  //   "food": "Nothing",
  //   "event": "Nothing",
  //   "design": "Nothing"
  // }

const out = new Score()
export default out