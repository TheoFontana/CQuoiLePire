<template>
  <transition appear @after-enter="transitionIn">
  <div class="about" >
      <div id="items" class="items" ref="scrollSections" >
        <div class="items-row"  data-scroll-section>
          <div class="text-item" data-scroll data-scroll-speed="1" >
            <h2>Pourquoi ce projet ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
              fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
              sequi optio natus similique. Alias at culpa amet inventore provident quia
              qui perferendis.
            </p>
          </div>
          <img class="img-item" :src="require('@/assets/about/healthy.png')"
            data-scroll data-scroll-speed="2"
            >
        </div>
        <div class="items-row" data-scroll-section >
          <div class="text-item" data-scroll data-scroll-speed="1">
            <h2>Pourquoi ce projet ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
              fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
              sequi optio natus similique. Alias at culpa amet inventore provident quia
              qui perferendis.
            </p>
          </div>
          <img class="img-item" :src="require('@/assets/about/chikens.png')" alt=""
            data-scroll data-scroll-speed="2">
        </div>
        <div class="items-row" data-scroll-section>
          <div class="text-item" data-scroll data-scroll-speed="1">
            <h2>Pourquoi ce projet ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
              fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
              sequi optio natus similique. Alias at culpa amet inventore provident quia
              qui perferendis.
            </p>
          </div>
          <img class="img-item" :src="require('@/assets/about/healthy.png')" alt=""
            data-scroll data-scroll-speed="2">
        </div>
        <div class="items-row" data-scroll-section>
          <div class="text-item" data-scroll data-scroll-speed="1">
            <h2>Pourquoi ce projet ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
              fuga dolores reiciendis, commodi possimus accusamus, impedit, consequuntur
              sequi optio natus similique. Alias at culpa amet inventore provident quia
              qui perferendis.
            </p>
          </div>
          <img class="img-item" :src="require('@/assets/about/healthy.png')" alt=""
            data-scroll data-scroll-speed="2">
        </div>
      </div>
    </div>
  </transition>

</template>

<style lang="scss" scoped>
.about{
  color:var(--dark-color);
  position: relative;
}
.items{
  height: 93vh;
  margin: 0;
  overflow: auto;
  padding: 5vw 5vw;
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
      transform-origin: bottom right;
      // transform: scaleY(1);
      // opacity: 0;
      // transition: .5s;
      padding: 2%;
      width: 30%;
      background-color: rgba(255, 255, 255,0.7);
      backdrop-filter: blur(10px);
      box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
      border-radius: 10px;
      h2{
      padding-bottom: 5%;
    }
    }
    .img-item{
      transform-origin: top right;
      // transition: .5s;
      // transform: scaleY(0);
      // opacity: 0;
      background-color: rgba(255, 255, 255,0.7);
      backdrop-filter: blur(10px);
      box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
      width: 30%;
      aspect-ratio: 1/1;
      object-fit: cover;
      padding: 2%;
      border-radius: 10px;
    }
  }
}
@media only screen and (max-width : 768px) {
  .about{
    margin-left: 0;
  }
  .items{
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
import Scrollbar from 'smooth-scrollbar'

import { gsap } from 'gsap'

export default {
  name: 'About',
  data () {
    return {
      scroll: null
    }
  },
  beforeRouteLeave (to, from, next) {
    this.transitionOut()
    setTimeout(next, 750)
  },
  methods: {
    transitionIn () {
      gsap.from('.text-item', { opacity: 0, scaleY: 0, duration: 0.75, stagger: 0.03, ease: 'power3.out' })
      gsap.from('.img-item', { opacity: 0, scaleY: 0, duration: 0.75, stagger: 0.03, ease: 'power3.out' })
    },
    transitionOut () {
      gsap.to('.text-item', { opacity: 0, scaleY: 0, duration: 0.75, stagger: 0.03, ease: 'power3.in' })
      gsap.to('.img-item', { opacity: 0, scaleY: 0, duration: 0.75, stagger: 0.03, ease: 'power3.in' })
    }
  },
  mounted () {
    Scrollbar.init(document.querySelector('#items'), { damping: 0.05 })
  }
}
</script>
