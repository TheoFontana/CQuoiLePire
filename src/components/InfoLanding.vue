<template>
  <div class="info-container">
  <div class="info">
    <h2> <span><span>Bienvenue!</span></span> </h2>
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
    border-radius: 10px;
    background-color: rgba(255, 255, 255,0.7);
    backdrop-filter: blur(10px);
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
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
      line-height: 1;
      > span{
        overflow: hidden;
        display: block;
        > span {
          display: block;
          animation: apearBaseLine .5s ease-out;
        }
      }
    }
    .main-info{
      margin-bottom:-5%;
    }
    p.main-info{
      font-size: 1.2em;
      padding-bottom: 5%;
    }

  }
  @keyframes apearBaseLine {
    from{
       transform: translateY(100%);
    }
    to {
       transform: translateY(0);
    }
  }
  .cta-info{
    display:flex;
    flex:0;
    align-items: center;
    flex-wrap:wrap;
  }
  .cta-main{
    position:relative;
    z-index:1;
    color:var(--dark-color);
    background: #fff;
    // box-shadow: 5px 5px 10px rgba(255, 255, 255, .8);
    // background: var(--light-color);
    display: flex;
    align-items: center;
    gap: 10px;
    width:fit-content;
    border-radius: 10px;
    border: solid 2px;
    padding: 2% 5%;
    font-size: 1.5em;
    font-weight: 500;
    white-space: nowrap;
    // &:hover{
    //   color:var(--light-color)
    // }
    &:before {
      content: " ";
      transform: scale(0,0);
      transform-origin: top right;
      display: block;
      border-radius: 8px;
      border: solid 2px #f44174;
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      inset: 0 0 0 0;
      background-color: #f44174;
      z-index: -1;
      transition: transform .3s ease;
    }
    &:hover::before {
      transform: scale(1,1);
      transform-origin: bottom left;
    }
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
  .info{
    .cta-main{
      margin-top: 5%;
    }
    .cta-sec{
      margin-top: 5%;
      margin-left: 5%;
    }
  }
  @media only screen and (max-width : 768px){
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
  @media only screen and (max-width: 430px) {
    .info-container{
      width: 80vw;
      font-size: .8em;
    }
  }

</style>
