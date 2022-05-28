<template>
  <div class="card"  @mouseover="updateIndicator">
    <img
      class="clickable"
      :src="require('@/assets/food/' + data.entity + '.jpg')"
      alt="café"
    />
    <p class="clickable">{{ data.entity }}</p>
  </div>
</template>
<style lang="scss">
  .card{
    color: var(--dark-color);
    aspect-ratio: 2/3;
    width: 25vw;
    max-height: 50vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255,0.7);
    backdrop-filter: blur(10px);
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: .3s ease-out;
    &:hover {
      transform: scale(1.05);
    }
    img {
      margin: 10%;
      height: 60%;
      max-width: 80%;
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
  @media only screen and (max-width : 430px) {
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
