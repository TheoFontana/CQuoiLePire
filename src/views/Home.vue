<template>
  <transition name="fade" class="home">
      <InfoLanding v-if="show"/>
      <InfoGame v-else/>
    </transition>
</template>

<script>
// import shallowRef from 'vue';
import InfoLanding from '@/components/InfoLanding.vue'
import InfoGame from '@/components/InfoGame.vue'

export default {
  name: 'Home',
  data () {
    return {
      // active: InfoLanding,
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
}
.fade-enter-active{
  opacity: 0;
  animation: fade .5s;
  animation-delay: .5s;
  animation-direction: reverse;
}
.fade-leave-active{
  animation: fade .5s;
  animation-delay: 0s;
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
