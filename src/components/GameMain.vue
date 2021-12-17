<template>
  <div class="game-main">
      <div class="gameCard">
        <transition name="slide" mode="out-in">
          <Card
            id='leftCard'
            :key="items[turn].entity"
            :data="items[turn]"
            @click="updateGame(true)"
          />
        </transition>
        <transition name="slide" mode="out-in">
          <p v-if="showResult" class="card-value">
            <span>{{items[turn].emissions}} </span> kCO2e/kcal
          </p>
        </transition>
      </div>

        <transition class="game-nav" name="slide" mode="out-in">
          <p v-if="!askContinue" key='indicator' class="indacator" :class="classIndicator">
            {{indicator}}
          </p>
          <div v-else class="game-cta" key='cta'>
            <div class="cta-main" @click="nextCards()">
              <p class="clickable">Suivant</p>
            </div>
            <div class="cta-sec" @click="this.$parent.$parent.finishGame(this.score, this.turn)">
              <p class="clickable">J'en ai asssez</p>
            </div>
          </div>
        </transition>

      <div class="gameCard">
        <transition name="slide" mode="out-in">
          <Card
            id='rightCard'
            :key="items[turn+1].entity"
            :data="items[turn+1]"
            @click="updateGame(false)"
          />
        </transition>
        <transition name="slide" mode="out-in">
          <p v-if="showResult" class="card-value">
            <span>{{items[turn+1].emissions}}</span> kCO2eq/kcal
          </p>
        </transition>
      </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue'
import data from '@/data/data.json'

export default {
  name: 'GameMain',
  components: {
    Card
  },
  data () {
    return {
      items: this.shuffle(data),
      turn: 0,
      score: 0,
      indicator: '?',
      showindicator: true,
      askContinue: false,
      showResult: false,
      classIndicator: {
        pointright: false,
        pointleft: false,
        hide: false
      }
    }
  },
  methods: {
    updateGame (isLeftSelected) {
      if (!this.showResult) {
        this.classIndicator.pointleft = false
        this.classIndicator.pointright = false
        this.showResult = true
        // the looser is the item with le least emmission
        let looser = null
        let winner = null
        // ratio is used to find the looser and scale it
        let ratio = this.items[this.turn].emissions / this.items[this.turn + 1].emissions
        // find looser and update the score
        if ((ratio > 1 && isLeftSelected) || (ratio < 1 && !isLeftSelected)) {
          this.score += 1
          this.indicator = '🥳'
          if (isLeftSelected) {
            looser = document.getElementById('rightCard')
            winner = document.getElementById('leftCard')
          } else {
            looser = document.getElementById('leftCard')
            winner = document.getElementById('rightCard')
          }
        } else {
          this.indicator = '😥'
          if (isLeftSelected) {
            looser = document.getElementById('leftCard')
            winner = document.getElementById('rightCard')
          } else {
            looser = document.getElementById('rightCard')
            winner = document.getElementById('leftCard')
          }
        }
        // sacle down the looser in proportion to is emmisson
        if (ratio > 1) {
          ratio = 1 / ratio
        }
        looser.style.transform += `scale(${ratio})`
        looser.style.transition = '.5s'
        looser.style.backgroundColor = 'var(--light-color)'
        winner.style.backgroundColor = 'var(--light-color)'
        setTimeout(() => {
          this.askContinue = true
          this.showindicator = false
        }, 1000)
      }
    },
    nextCards () {
      this.showindicator = true
      this.classIndicator.pointright = false
      this.classIndicator.pointleft = false
      if (this.turn > 15) {
        this.$parent.$parent.finishGame(this.score, this.turn)
      } else {
        this.turn += 2
        this.indicator = ''
        this.askContinue = false
        this.showResult = false
        const looser = document.getElementById('rightCard')
        const winner = document.getElementById('leftCard')
        looser.style.transform += 'translate3d(0, -50vh, 0)'
        winner.style.transform += 'translate3d(0, -50vh, 0)'
        setTimeout(() => {
          this.indicator = '?'
        }, 500)
      }
    },
    updateIndicator (id) {
      if (!this.showResult) {
        if (this.indicator === '?') {
          this.indicator = '<'
        }
        if (id === 'leftCard') {
          this.classIndicator.pointleft = true
          this.classIndicator.pointright = false
        } else {
          this.classIndicator.pointright = true
          this.classIndicator.pointleft = false
        }
      }
    },

    shuffle (array) {
      const arra1 = [...array]
      let ctr = arra1.length; let temp; let
        index
      while (ctr > 0) {
        index = Math.floor(Math.random() * ctr)
        ctr -= 1
        temp = arra1[ctr]
        arra1[ctr] = arra1[index]
        arra1[index] = temp
      }
      return arra1
    }
  }
}
</script>

<style lang="scss" scoped >

.game-main{
  display: flex;
  gap: 10vw;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.game-nav{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 10vw;
  transition:.5s;
}
  .indacator{
    color:var(--light-color);
    font-size: 8em;
    font-weight: 800;
    transition: .5s ease-in-out;
  }
.gameCard{
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-value{
    margin-top: 3vh;
    font-weight: 700;
    span{
      font-weight: 700;
    }
  }
}
.game-cta{
    display: flex;
    flex-direction: column;
    align-items: center;
  .cta-main{
    font-size: 2em;
    padding: 10% 20%;
    border-radius:10px;
  }
  .cta-sec{
    margin-top:3vh;
    white-space:nowrap;
    font-size: 1.3em;
    font-weight: 700;
  }
}
.pointright {
  transform: rotate(-0.5turn);
}
.pointleft {
  transform: rotate(-1turn);
}
// .hide {
//   display:none;
// }

.slide-enter-active {
  animation: slide-in .5s;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translate3d(0, 40vh, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.slide-leave-active {
  animation: slide-out .5s;
}
@keyframes slide-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media only screen and (max-width : 768px) {
  .game-main{
    font-size: .8em;
    gap:unset;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

  }
  .game-nav{
    width: 100%;
  }
  .game-cta {
    .cta-main{
      padding: 2% 5%;
    }
  }
}
@media only screen and (max-width : 430px) {
  .game-main{
    font-size: .6em;
    .game-nav{
      .indacator{
        display:none
      }
    }
  }
}
</style>
