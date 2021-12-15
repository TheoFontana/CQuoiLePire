<template>
  <div class="card"  @mouseover="updateIndicator">
    <img
      class="clickable"
      :src="require('@/assets/food/' + data.entity + '.jpg')"
      alt="café"
    />
    <p v-if="false" class="result">{{ data.emissions }} kCO2e</p>
    <p class="clickable">{{ data.entity }}</p>
  </div>
</template>
<style lang="scss">
  .card{
    color: var(--dark-color);
    aspect-ratio: 2/3;
    width: 25vh;
    border: solid 3px;
    border-radius: 10px;
    background: var(--light-color);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: .3s cubic-bezier(.51,-0.48,.52,1.46);
    &:hover {
      transform: scale(1.05);
    }
    img {
      margin: 10%;
      width: 80%;
      border-radius: 10px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
    p{
      padding-bottom: 10%;
      font-size: 2em;
      font-weight: 300;
    }
  }
 @media only screen and (max-width : 768px) {
    .card{
      width: 50vw;
      height: unset;
      aspect-ratio: 3/2;
      &:hover {
      transform: scale(1);
    }
      img{
        margin: 5%;
        width: 35%;
      }
    }
  }
  @media only screen and (max-width : 425px) {
    .card{
      width: 75vw;
      height: unset;
      aspect-ratio: 3/2;
      img{
        margin: 5%;
        width: 45%;
      }
    }
  }
</style>
<script>
export default {
  name: 'Card',
  components: {
  },
  props: ['data'],
  methods: {
    updateIndicator () {
      this.$parent.$parent.updateIndicator(this.$el.id)
    }
  }
}
</script>
