import { Store } from '@js/Store'

import { map } from '@utils/maths'

class Score {
   constructor() {
      this.score = {}

      this.initialized = false
      
      setTimeout(() => {
         this.setScore()
      }, 1);
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

      // this.getCommonalitiesCount('Daku', 'Arles')
      // this.getScore('Daku', 'Arles')
      // this.getHighScore('Daku')
      // this.getWorstScore('Daku')

      this.initialized = true
   }

   getCommonalitiesCount(name1, name2) {
      const commonalities = []
      
      for (let i = 0; i < Store.list.themes.length; i++) {
         this.score[name1][name2].commonalities[Store.list.themes[i]].forEach( e => {
            commonalities.push(e)
         })
      }
      
      return commonalities.length
   }

   getHighScore(name1) {
      const highScore = {}
      highScore.score = 0

      for (const user in this.score[name1]) {
         if (highScore.score < this.score[name1][user].score) {
            highScore.score = this.score[name1][user].score
            highScore.name = this.score[name1][user].name
         }
      }

      highScore.pourcent = this.getPourcent(highScore.score, this.getMaxScore(highScore.name))
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

      worstScore.pourcent = this.getPourcent(worstScore.score, this.getMaxScore(worstScore.name))
      worstScore.norm = this.getNorm(worstScore.pourcent)

      return worstScore
   }

   getScore(name1, name2) {
      const tmpScore = this.score[name1][name2].score
      const maxScore = this.getMaxScore(name2)

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