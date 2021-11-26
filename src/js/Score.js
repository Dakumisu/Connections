import { Store } from '@js/Store'

import { map } from '@utils/maths'

class Score {
   constructor() {
      this.score = {}

      this.initialized = false
      
      // setTimeout(() => {
      //    this.setScore()
      // }, 1);
   }

   start() {
      this.setScore()
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

               score[pseudo1][pseudo2].commonalities = {}
               
               let usersScore = 0
               for (const label in Store.list.themesChilds) {
                  score[pseudo1][pseudo2].commonalities[label] = []

                  this.splitData(user1Datas[label]).forEach(element1 => {
                     const labelChild = Store.list.themesChilds[label]
   
                     const labelChildCheck = labelChild.find(e => e === element1)

                     this.splitData(user2Datas[label]).forEach(element2 => {
                        const labelChild = Store.list.themesChilds[label]
      
                        const labelChildCheck = labelChild.find(e => e === element2)

                        if (element1 == element2) {
                           usersScore ++
                           score[pseudo1][pseudo2].commonalities[label].push(element2)
                        }
                     })
                  })
               }
               
               score[pseudo1][pseudo2].score = usersScore
            }
         }
      }

      this.score = score

      // this.getCommonalities('Daku', 'Arles')
      // this.getScore('Daku', 'Arles')
      // console.log(this.getHighScore('Amb').scores);
      // this.getWorstScore('Daku')

      this.initialized = true
   }

   getCommonalities(name1, name2) {
      const commonalities = []
      
      for (let i = 0; i < Store.list.themes.length; i++) {
         this.score[name1][name2].commonalities[Store.list.themes[i]].forEach( e => {
            commonalities.push(e)
         })
      }
      
      return commonalities
   }

   getHighScore(name1) {
      const highScore = {}
      highScore.score = 0
      highScore.scores = []
      const top3 = []

      for (const user in this.score[name1]) {
         highScore.scores[this.score[name1][user].name] = this.score[name1][user].score
         let test1 = this.getPourcent(highScore.score, this.getMaxScore(name1))
         let test2 = this.getPourcent(this.score[name1][user].score, this.getMaxScore(name1))
         // console.log(test1, test2);
         if ( test1 < test2 ) {
            highScore.score = this.score[name1][user].score
            highScore.name = this.score[name1][user].name
         }
      }

      
      // for (const score in highScore.scores) {
         
      // }
         
         
      // for (let i = 0; i < 3; i++) {
            //    if (highScore.scores[i]) top3.push(highScore.scores[i])
      // }

      // for (let i = 0; i < top3.length; i++) {
      //    top3[i] = this.getPourcent(top3[i], this.getMaxScore(name1))
      // }

      // for (const user in this.score[name1]) {
      //    if (highScore.score == this.score[name1][user].score) {
      //       highScore.scores.push(this.score[name1][user])
      //    }
      // }

      // console.log(top3);

      highScore.pourcent = this.getPourcent(highScore.score, this.getMaxScore(name1))
      highScore.norm = this.getNorm(highScore.pourcent)

      return highScore;
   }
   
   getWorstScore(name1) {
      const worstScore = {}
      worstScore.score = 100

      for (const user in this.score[name1]) {
         if (worstScore.score > this.score[name1][user].score) {
            worstScore.score = this.score[name1][user].score
            worstScore.name = this.score[name1][user].name
         }
      }

      worstScore.pourcent = this.getPourcent(worstScore.score, this.getMaxScore(name1))
      worstScore.norm = this.getNorm(worstScore.pourcent)

      return worstScore
   }

   getScore(name1, name2) {
      const tmpScore = this.score[name1][name2].score
      const maxScore = this.getMaxScore(name1)

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

const out = new Score()
export default out