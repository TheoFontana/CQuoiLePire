<template>
  <transition name="fadefast" mode="out-in">
  <div :key="docState" class="info-container">
    <div class="info">
      <h2>{{rules.title}}</h2>
      <p class="main-info">{{rules.main}}</p>

      <div class="cta-info">
        <div class="cta-main" @click="navigate()">
          <p class="clickable">{{rules.cta}}</p>
          <img class="clickable" :src="require('@/assets/icons/next.svg')" alt="" >
        </div>
        <div v-if="!showRules" class="cta-sec" @click="displayInfo()">
          <p class="clickable">Qu’est-ce que ça veut dire ?</p>
        </div>
      </div>

    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        title: 'On joue ?',
        main: ' Vous allez devoir choisir le produit qui émet le plus d’équivalent CO2 pour obtenir un kilo calorie',
        cta: "C'est Parti"
      },
      showRules: false,
      docState: 'hideRules'
    }
  },
  methods: {
    displayInfo () {
      if (!this.showRules) {
        this.rules.title = 'Bonne question !'
        this.rules.main = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque sed quis penatibus augue quis sed sed magna at. Sed vel velit morbi egestas eget. Suspendisse est erat aliquet mattis. Eu eleifend aliquam pretium quis nunc lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        this.rules.cta = "j'ai compris"
        this.docState = 'showRules'
        this.showRules = !this.showRules
      } else {
        this.rules.title = 'On joue ?'
        this.rules.main = 'Vous allez devoir choisir le produit qui émet de plus d’équivalent CO2 pour obtenir 1000 calories'
        this.rules.cta = "C'est Parti"
        this.docState = 'hideRules'
        this.showRules = !this.showRules
      }
    },
    navigate () {
      if (this.showRules) {
        this.displayInfo()
      } else {
        this.$router.push('game')
      }
    }
  }
}
</script>

<style>
.fadefast-enter-from{
  transform: translateY(-50px);
  opacity: 0;
}
.fadefast-enter-to{
  transform: translateY(0px);
  opacity: 1;
}
.fadefast-enter-active,
.fadefast-leave-active{
  transition: all .5s ease-in-out;
}
.fadefast-leave-to{
  transform: translateY(200px);
  opacity: 0;
}
</style>
