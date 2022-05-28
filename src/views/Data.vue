<template>
  <transition appear @enter="transitionIn"  @beforeLeave="transitionOut">
    <div class="data" ref="scrollSections">
      <div class="graph" data-scroll-section>
        <div class="items" data-scroll data-scroll-speed="2">
          <div class="labels">
            <p v-for="item in items" :key="item.entity" class="label">{{item.entity}}</p>
            <p>kCO2eq</p>
          </div>
          <div id="bars" class="graph-bars" >
            <div
              @mousemove="displayInfo(item,$event)"
              @mousover="displayInfo(item,$event)"
              @mouseleave="displayItemInfo = false "
              @wheel="displayInfo(item,$event)"
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
              <p
                v-for="k in 37"
                :key="k"
                :style="{marginLeft:''+ scaleRatio+'vw' ,width:0}"
              >
                {{k}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="scroll-indicator">Scroll</p>
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
  </transition>
</template>

<style lang="scss">
  .data{
    margin-top: 5vh;
  }
  .items{
    margin-left: 4vw;
    display: flex;
    z-index: 3;
    .graph-bars{
      // width: 100vw;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      .graph-bar{
        height: 2.6vh;
        border-radius: 100px;
        border:solid 2px var(--dark-color);
        opacity:1;
      }
      .scale{
        height: 2.5vh;
        display: flex;
        color: var(--dark-color);
        p{
          border-left: solid 2px;
          padding-left: 1vw;

        }
      }
    }
    .labels{
      color:var(--dark-color);
      z-index: 5;
      left: 0;
      position: sticky;
      padding: 0 1vw;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      font-size: 2vh;
      .label{
        white-space: nowrap;
        opacity:1;
      }
    }
  }
  .item-info-container{
    position:absolute;
    top:0;
    left:0;
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
  .scroll-indicator{
    color:var(--dark-color);
    font-size: 1.5em;
    position:absolute;
    z-index:2;
    left:50vw;
    // bottom: 1%;
    transform: translateX(-50%);
  }

    @media only screen and (max-width : 768px) {
      .data {
        margin-left:1vw;
      }
      .items{
        font-size: .8em;
        .labels{
          left :0;
        }
      }
    }
</style>

<script>
import { gsap } from 'gsap'
// import Scrollbar from 'smooth-scrollbar'
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
      scrollBars: 0,
      pos: {
        x: 0,
        y: 0
      }
    }
  },
  mounted () {
    document.addEventListener('wheel', (e) => {
      // vertical scroll does horizontal scroll
      window.scrollBy(-0.5 * e.wheelDeltaY, 0)
    })
    // class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
    //   static pluginName = 'horizontalScroll'
    //   transformDelta (delta, fromEvent) {
    //     if (!/wheel/.test(fromEvent.type)) {
    //       return delta
    //     }
    //     const { x, y } = delta
    //     return {
    //       y: 0,
    //       x: Math.abs(x) > Math.abs(y) ? x : y
    //     }
    //   }
    // }
    // const scrollbar = document.querySelector('#bars')
    // Scrollbar.use(HorizontalScrollPlugin)
    // const myHorizontalScrollbar = Scrollbar.init(scrollbar)
    // myHorizontalScrollbar.setPosition(0, 0)
  },
  unmounted () {
    document.removeEventListener('wheel', (e) => {
      // vertical scroll does horizontal scroll
      window.scrollBy(-0.5 * e.wheelDeltaY, 0)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.transitionOut()
    setTimeout(next, 1500)
  },
  methods: {
    transitionIn () {
      gsap.from('.label', { opacity: 0, x: window.innerWidth, duration: 0.75, stagger: 0.03, ease: 'power3.out' })
      gsap.from('.graph-bar', { opacity: 0, x: window.innerWidth, duration: 0.75, stagger: 0.03, ease: 'power3.out' })
    },
    transitionOut () {
      gsap.to('.label', { opacity: 0, y: window.innerHeight, duration: 0.75, stagger: 0.03, ease: 'power3.in' })
      gsap.to('.graph-bar', { opacity: 0, y: window.innerHeight, duration: 0.75, stagger: 0.03, ease: 'power3.in' })
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
      const mouseX = e.offsetX
      const mouseY = e.clientY
      this.focusedItem = item
      this.infoPosition.x = `calc(${mouseX}px + 75%)`
      this.infoPosition.y = `calc(${-40 * (1 - ((this.items.indexOf(item)) / this.items.length))}vh + ${mouseY}px - 25%)`
      this.displayItemInfo = true
    }
  }
}
</script>
