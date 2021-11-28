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

      // console.log(this.score);
      
      for (const user in this.score) {
         // console.log(user);
         Store.users[user].highScore = this.getHighScore(user).pourcent
         Store.users[user].worstScore = this.getWorstScore(user).pourcent
         // console.log(Store.users[user]);
      }


      console.log(this.score);
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
      let diff = 0

      for (const user in this.score[name1]) {
         let testDiff = this.getDiff(name1, this.score[name1][user].name)
// console.log(name1, this.score[name1][user].name, this.score[name1][user].score + this.score[name1][user].score, testDiff, this.score[name1][user].score + this.score[name1][user].score - testDiff);
         if ( highScore.score < this.score[name1][user].score - testDiff ) {
            highScore.score = this.score[name1][user].score - testDiff
            highScore.name = this.score[name1][user].name
         }
      }

      for (const user in this.score[name1]) {
         if ( highScore.score == this.score[name1][user].score ) highScore.scores[this.score[name1][user].name] = this.score[name1][user].score
      }

      highScore.pourcent = this.getPourcent(highScore.score, this.getMaxScore(name1))
      // console.log(name1, highScore.pourcent, highScore.name)
      highScore.norm = this.getNorm(highScore.pourcent)

      // Store.users[name1].highScore = highScore.pourcent

      return highScore;
   }
   
   getWorstScore(name1) {
      const worstScore = {}
      worstScore.score = Infinity
      let diff = 0

      for (const user in this.score[name1]) {
         let testDiff = this.getDiff(name1, this.score[name1][user].name)

         if (worstScore.score > this.score[name1][user].score - testDiff) {
            worstScore.score = this.score[name1][user].score - testDiff
            worstScore.name = this.score[name1][user].name

            // console.log(name1, worstScore.score, this.score[name1][user].name)
            diff = this.getDiff(name1, this.score[name1][user].name)
         }
      }

      worstScore.pourcent = this.getPourcent(worstScore.score, this.getMaxScore(name1))
      // console.log(name1, worstScore.pourcent, worstScore.name)
      worstScore.norm = this.getNorm(worstScore.pourcent)

      // Store.users[name1].worstScore = worstScore.pourcent

      return worstScore
   }

   getScore(name1, name2) {
      let testDiff = this.getDiff(name1, name2)

      const tmpScore = this.score[name1][name2].score - testDiff
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

   getDiff(name1, name2) {
      return this.getMaxScore(name1) - this.getCommonalities(name1, name2).length
   }

   splitData(data) {
      const tmpData = data.split(', ')

      return tmpData
   }
}

const out = new Score()
export default out