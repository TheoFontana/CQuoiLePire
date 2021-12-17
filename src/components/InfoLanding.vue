<template>
  <div class="info-container">
  <div class="info">
    <h2>Bienvenue!</h2>
    <p class="main-info">
      CQuoiLePire est un quiz fait pour comprendre l’impact de votre alimentation sur la planète
      et vous permettre d’appréhender les différences d’émission entre différents produits.
    </p>
    <div class="cta-main" @click="UpdateView()">
      <p class="clickable">Suivant</p>
      <img class="clickable" :src="require('@/assets/icons/next.svg')" alt="" >
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'InfoLanding',
  components: {
  },
  methods: {
    UpdateView () {
      this.$parent.$parent.test()
    }
  }
}
</script>

<style lang="scss">
  .info-container{
    border: solid 5px var(--dark-color);
    border-radius: 10px;
    background-color: var(--light-color);
    width: 40vw;
    z-index:0;
  }
  .info{
    color: var(--dark-color);
    padding: 7%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2{
      font-size: 2em;
      padding-bottom: 2%;
      white-space: nowrap;
    }
    .main-info{
      margin-bottom:-5%;
    }
    p.main-info{
      font-size: 1.2em;
      padding-bottom: 5%;
    }

  }

  .cta-info{
    display:flex;
    flex:0;
    align-items: center;
    flex-wrap:wrap;
  }
  .cta-main{;
    color:var(--dark-color);
    background: var(--light-color);
    display: flex;
    align-items: center;
    gap: 10px;
    width:fit-content;
    border-radius: 10px;
    border: solid 3px;
    padding: 2% 5%;
    font-size: 1.5em;
    font-weight: 500;
    white-space: nowrap;
  }
  .cta-sec{
    display:flex;
    align-items: baseline;
    gap:10px;
    cursor: pointer;
    font-size: .8em;
    font-style: italic;
    font-weight: 300;
    // white-space: nowrap;
    p:hover{
      text-decoration: underline solid 1px;
    }
  }
  .cta-info{
    .cta-main{
      margin-top: 5%;
    }
    .cta-sec{
      margin-top: 5%;
      margin-left: 5%;
    }
  }
  @media only screen and (max-device-width: 768px) {
    .info-container{
      width: 70vw;
    }
    .info{
      align-items: center;
    }
    .cta-info{
      flex-direction: column;
      align-items: flex-start;
      .cta-sec{
        margin-left: 0;
        margin-top: 5%;
      }
    }
  }
  @media only screen and (max-device-width: 430px) {
    .info-container{
      width: 80vw;
      font-size: .8em;
    }
  }

</style>
