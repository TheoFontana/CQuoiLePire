<template>
  <transition name="fade" class="home" mode="out-in">
      <InfoLanding v-if="show"/>
      <InfoGame v-else/>
    </transition>
</template>
<script>
import InfoLanding from '@/components/InfoLanding.vue'
import InfoGame from '@/components/InfoGame.vue'

export default {
  name: 'Home',
  data () {
    return {
      show: true
    }
  },
  components: {
    InfoLanding,
    InfoGame
  },
  methods: {
    test () {
      this.show = !this.show
    }
  }
}
</script>

<style>
.home{
  margin-left: 12vw;
  margin-top: 15vh;
  z-index: 2;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out
}

.fade-enter-from, .fade-leave-to {
  opacity: 0
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
@media (max-device-width: 768px) {
  .home{
    position: absolute;
    margin:0;
    top:55vh;
    left: 50vw;
    transform: translate(-50%,-50%);
  }
}
</style>
