<template>
  <transition class="game" name="mode-fade" mode="out-in">
      <GameEndScreen v-if="gameFinished" :score="score" :turn="turn" />
      <GameMain v-else />
  </transition>
</template>

<script>
import GameMain from '@/components/GameMain.vue'
import GameEndScreen from '@/components/GameEndScreen.vue'

export default {
  name: 'Game',
  components: {
    GameMain,
    GameEndScreen
  },
  data () {
    return {
      score: 0,
      turn: 0,
      gameFinished: false
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   // this.transitionOut()
  // },
  methods: {
    finishGame (score, turn) {
      this.score = score
      this.turn = turn
      this.gameFinished = true
    },
    replay () {
      this.score = 0
      this.turn = 0
      this.gameFinished = false
    }
  }
}
</script>

<style lang="scss" scoped>
.game{

}
.mode-fade-enter-active, .mode-fade-leave-active {
  transition: opacity .5s ease
}

.mode-fade-enter-from, .mode-fade-leave-to {
  opacity: 0
}
@media only screen and (max-width : 768px) {
  .game{
    width: 100vw;
    left:50vw;
  }
}
</style>
