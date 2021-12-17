<template>
  <div  class="about">
    <div id="items" class="items">
      <div class="items-row">
        <div class="text-item">
          <h2>Pourquoi ce projet ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
            sequi optio natus similique. Alias at culpa amet inventore provident quia
            qui perferendis.
          </p>
        </div>
        <img class="img-item" :src="require('@/assets/about/healthy.png')" alt="">
      </div>
      <div class="items-row">
        <div class="text-item">
          <h2>Pourquoi ce projet ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
            sequi optio natus similique. Alias at culpa amet inventore provident quia
            qui perferendis.
          </p>
        </div>
        <img class="img-item" :src="require('@/assets/about/chikens.png')" alt="">
      </div>
      <div class="items-row">
        <div class="text-item">
          <h2>Pourquoi ce projet ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
            sequi optio natus similique. Alias at culpa amet inventore provident quia
            qui perferendis.
          </p>
        </div>
        <img class="img-item" :src="require('@/assets/about/healthy.png')" alt="">
      </div>
      <div class="items-row">
        <div class="text-item">
          <h2>Pourquoi ce projet ?</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
            sequi optio natus similique. Alias at culpa amet inventore provident quia
            qui perferendis.
          </p>
        </div>
        <img class="img-item" :src="require('@/assets/about/healthy.png')" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about{
  color:var(--dark-color);
  margin-top: 10vh;
  margin-left: calc(7vw + 5px);
  position: relative;
}
.items{
  margin: 5vw 5vw;
  display: flex;
  flex-direction: column;
  .items-row{
    margin-top: 5vw;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &:first-child{
      margin-top: 0;
    }
    &:nth-child(odd){
      .img-item{
        margin-top:10vh;
        margin-right: 10vw;
      }
    }
    &:nth-child(even){
      flex-direction: row-reverse;
      .text-item{
        margin-top:10vh;
      }
      .img-item{
        margin-left: 10vw;
      }
    }
    .text-item{
      padding: 2%;
      width: 30%;
      background: var(--light-color);
      border-radius: 10px;
      border: solid 2px;
      h2{
      padding-bottom: 5%;
    }
    }
    .img-item{
      background: var(--light-color);
      width: 30%;
      aspect-ratio: 1/1;
      object-fit: cover;
      padding: 2%;
      border-radius: 10px;
      border: solid 2px;
    }
  }
}
@media only screen and (max-width : 768px) {
  .about{
    margin-left: 0;
  }
  .items{
    margin: 5vh 10vw;
    .items-row{
      .text-item{
        width: 40%;
        padding: 5%;
      }
      .img-item{
        width: 40%;
        padding: 5%;
      }
    }
  }
}
@media only screen and (max-width : 768px) {
  .items{
    .items-row{
      margin:0;
      flex-direction: column;
      align-items: unset;
      justify-content: unset;
      &:nth-child(odd){
        .img-item{
          margin-top:0;
          margin-right: 0;
          align-self: center;
        }
      }
      &:nth-child(even){
        flex-direction: column;
        .text-item{
          align-self: flex-end;
          margin-top:0;
        }
        .img-item{
          margin-left: 0;
          align-self: center
        }
      }
      .text-item{
        width: 75%;
        margin-bottom: 5vh;
      }
      .img-item{
        width: 75%;
        margin-bottom: 5vh;
      }
    }
  }
}

</style>

<script>
export default {
  name: 'About',
  data () {
    return {
      scrollBars: 0,
      pos: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    animateItems (e) {
      const texts = document.getElementsByClassName('text-item')
      const imgs = document.getElementsByClassName('img-item')

      const x = 2 * (e.clientX / window.innerWidth - 0.5)
      const y = -2 * (e.clientY / window.innerHeight - 0.5)
      texts.forEach((element, index) => {
        const el = element
        if (index % 2 === 0) {
          el.style.transform = `translate3d(${x * 20}px,${y * 15}px,0)`
        } else {
          el.style.transform = `translate3d(${-x * 25}px,${-y * 10}px,0)`
        }
      })
      imgs.forEach((element, index) => {
        const el = element
        if (index % 2 === 0) {
          el.style.transform = `translate3d(${-x * 15}px,${-y * 20}px,0)`
        } else {
          el.style.transform = `translate3d(${x * 25}px,${y * 15}px,0)`
        }
      })
    },
    scroll (e) {
      const items = document.getElementById('items')
      const maxHeight = items.offsetHeight - window.innerHeight / 2
      this.scrollBars -= e.deltaX + e.deltaY
      // the scroll is contain in [ -maxHeight , 0 ]
      this.scrollBars = Math.max(-maxHeight, Math.min(0, this.scrollBars))
      items.style.transform = `translate3d(0,${this.scrollBars}px,0)`
    },
    touchStartHandler (e) {
      this.pos.y = e.touches[0].clientY
      document.addEventListener('touchmove', this.touchMoveHandler)
      document.addEventListener('touchend', this.touchEndHandler)
    },
    touchMoveHandler (e) {
      const dy = e.touches[0].clientY - this.pos.y
      // Scroll the element
      this.scrollBy(dy)
      // resset the position of the finger
      this.pos.y = e.touches[0].clientY
    },
    touchEndHandler (e) {
      document.removeEventListener('touchmove', this.touchMoveHandler)
      document.removeEventListener('touchend', this.touchEndHandler)
    },
    scrollBy (dy) {
      this.scrollBars += dy
      const items = document.getElementById('items')
      const maxHeight = items.offsetHeight - window.innerHeight / 2
      // the scroll is contain in [ -maxHeight , 0 ]
      this.scrollBars = Math.max(-maxHeight, Math.min(0, this.scrollBars))
      items.style.transform = `translate3d(0,${this.scrollBars}px,0)`
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.animateItems)
    document.addEventListener('wheel', this.scroll)
    document.addEventListener('touchstart', this.touchStartHandler)
  },
  unmounted () {
    document.removeEventListener('mousemove', this.animateItems)
    document.removeEventListener('wheel', this.scroll)
    document.removeEventListener('touchstart', this.touchStartHandler)
  }
}
</script>
