<template>
  <div class="data">
    <transition appear @enter="transitionIn"  @leave="transitionOut">
    <div class="graph">
      <div class="items">
        <div class="labels">
          <p v-for="item in items" :key="item.entity" class="label">{{item.entity}}</p>
          <p>kCO2eq</p>
        </div>
        <div id="bars" class="graph-bars">
          <div
            @mouseenter="displayInfo(item,$event)"
            @mouseleave="displayItemInfo = false "
            v-for="(item,index) in items"
            :id="item.entity"
            :key="item.entity" class="graph-bar"
            :style="{
              width:'calc(' + item.emissions*scaleRatio + 'vw)',
              backgroundColor: 'rgb('+ gradientColor(index/items.length).join()+')'
              }"
          >
          </div>
          <div class="scale">
            <p v-for="k in 37"
            :key="k"
            :style="{marginLeft:''+ scaleRatio+'vw' ,width:0}"
            >
              {{k}}
            </p>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="fadefast">
    <div
      v-show="displayItemInfo"
      :key="focusedItem.entity"
      class="item-info-container"
      :style="{transform:`translate3d(${infoPosition.x},${infoPosition.y},0px)`}"
    >
      <div class="item-info">
        <img
        :src="require('@/assets/food/' + focusedItem.entity + '.jpg')"
        alt="food item"
        />
        <div class="item-info-label">
        <p class="item-name"> {{focusedItem.entity}}</p>
        <p class="item-emissions"> {{focusedItem.emissions}} kCO2eq/kcal</p>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<style lang="scss">
.data{
  margin-top: 10vh;
  margin-left:7vw;
}
.items{
  display: flex;
  z-index: 3;
  .graph-bars{
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    .graph-bar{
      height: 2.6vh;
      border-radius: 100px;
      border:solid 2px var(--dark-color);
      opacity:0;
    }
    .scale{
      height: 2.5vh;
      display: flex;
      color: var(--light-color);
      p{
        border-left: solid 2px;
        padding-left: 1vw;

      }
    }
  }
  .labels{
    color:var(--light-color);
    z-index: 5;
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -o-sticky;
    position: -ms-sticky;
    position: sticky;
    left: 7vw;
    padding: 0 1vw;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    font-size: 2vh;
    .label{
      white-space: nowrap;
      opacity:0;
    }
  }
}
.item-info-container{
  position:absolute;
  top:0;
  left:0;
  transition: transform .1s ease;
  .item-info{
    color:#fff;
    height: 35vh;
    width: 60vh;
    display: flex;
    flex-direction: column;
    img{
      opacity: .7;
      z-index: -1;
      border-radius: 10px;
      aspect-ratio: 3 / 2;
      object-fit: cover;
      background:rgba(0,0,0,0.6);
    };
    .item-info-label{
      position: absolute;
    }
    .item-name{
      font-size:4vw;
      font-weight: 800;
    }
    .item-emissions{
      font-size:3vw;
      font-weight: 600;
    }
  }
}
  @media only screen and (max-width : 768px) {
    .items{
      font-size: .8em;
      .labels{
        left :0;
      }
    }
  }
</style>
<script>
import KUTE from 'kute.js'
import data from '@/data/data.json'

export default {
  name: 'Data',
  components: {
  },
  data () {
    return {
      items: data,
      scaleRatio: 50,
      maxEmmission: data[0].emissions,
      focusedItem: data[0],
      infoPosition: { x: 0, y: 0 },
      displayItemInfo: false,
      scrollBars: 0
    }
  },
  mounted () {
    document.addEventListener('wheel', this.scroll)
    document.addEventListener('wheel', (e) => {
      if (e.target.className !== 'graph-bar') {
        this.displayInfo = false
      } else {
        this.displayInfo = true
      }
    })
  },
  // beforeUnmount () {
  //   this.transitionOut()
  // },
  unmounted () {
    window.removeEventListener('wheel', this.scroll)
  },
  methods: {
    transitionIn () {
      const labels = document.querySelectorAll('.label')
      const bars = document.querySelectorAll('.graph-bar')
      KUTE.allFromTo(
        labels,
        {
          translateX: window.innerWidth,
          opacity: 1
        },
        {
          translateX: 0,
          opacity: 1

        },
        { offset: 50, duration: 500, easing: 'easingCubicOut' }
      ).start()
      KUTE.allFromTo(
        bars,
        {
          translateX: window.innerWidth,
          opacity: 1
        },
        {
          translateX: 0,
          opacity: 1
        },
        { offset: 50, duration: 500, easing: 'easingCubicOut' }
      ).start()
    },
    transitionOut () {
      const labels = document.querySelectorAll('.label')
      const bars = document.querySelectorAll('.graph-bar')
      // console.log('out')
      KUTE.allFromTo(
        labels,
        {
          translateX: 0,
          opacity: 1
        },
        {
          translateX: window.innerWidth,
          opacity: 1
        },
        { offset: 50, duration: 500, easing: 'easingCubicOut' }
      ).start()
      KUTE.allFromTo(
        bars,
        {
          translateX: 0,
          opacity: 1
        },
        {
          translateX: window.innerWidth,
          opacity: 1
        },
        { offset: 50, duration: 500, easing: 'easingCubicOut' }
      ).start()
    },
    gradientColor (weight) {
      const color1 = [166, 240, 141]
      const color2 = [240, 141, 141]
      const w = weight * 2 - 1
      const w1 = (w + 1) / 2
      const w2 = 1 - w1
      const rgb = [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)
      ]
      return rgb
    },
    displayInfo (item, e) {
      const mouseX = e.clientX
      const mouseY = e.clientY
      this.focusedItem = item
      this.infoPosition.x = `calc(${mouseX}px)`
      this.infoPosition.y = `calc(${-40 * (1 - (this.items.indexOf(item) / this.items.length))}vh + ${mouseY}px)`
      this.displayItemInfo = true
    },
    scroll (e) {
      const bars = document.getElementById('bars')
      const maxWidth = document.getElementById(`${this.items[0].entity}`).offsetWidth
      this.scrollBars -= e.deltaX + e.deltaY
      // the scroll is contain in [ -maxWidth , 0 ]
      this.scrollBars = Math.min(0, Math.max(-maxWidth, this.scrollBars))
      bars.style.transform = `translate3d(${this.scrollBars}px,0,0)`
    }
  }
}
</script>
