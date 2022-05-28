<template>
  <div class="bolbs">
      <div class="rotate">
        <svg
          class="bolb"
          id="bolb_1"
          width="534"
          height="503"
          viewBox="0 0 534 503"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="path"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M243.463 0.846417C298.93 1.56627 353.931 7.36573 402.371
            35.8928C455.632 67.2589 512.599 106.823 528.797 168.883C544.827
            230.301 517.353 296.063 484.163 349.273C456.2 394.103 404.766
            410.093 361.138 437.673C322.363 462.185 288.492 497.304 243.463
            501.435C196.145 505.777 145.391 494.06 109.919 460.723C75.7704
            428.63 78.099 374.014 60.4911 329.476C40.6213 279.217 -3.61482 237.634
            0.25156 183.328C4.47914 123.949 35.7054 66.2329 81.6896 31.7309C127.473
            -2.62073 187.293 0.117437 243.463 0.846417Z"
            fill="#00cc99"
          />
        </svg>
      </div>
      <svg
      class="bolb"
        id="bolb_2"
        width="409"
        height="446"
        viewBox="0 0 409 446"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="path"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M190.407 0.344586C239.544 3.59743 274.622 45.2732 312.958
          76.1816C349.094 105.316 396.345 129.346 406.57 174.624C416.627
          219.155 378.933 258.128 363.771 301.189C349.129 342.777 353.643
          394.623 319.352 422.338C284.716 450.331 234.567 447.059 190.407
          441.303C150.548 436.108 115.714 416.031 83.7694 391.633C52.5503
          367.79 23.7048 340.29 9.96215 303.489C-4.18854 265.596 -0.742166
          224.923 6.66375 185.158C15.1185 139.761 22.9131 91.8833 55.4707
          59.1361C90.93 23.4703 140.223 -2.97752 190.407 0.344586Z"
          fill="#648de5"
        />
      </svg>
      <svg
        class="bolb"
        id="bolb_3"
        width="539"
        height="485"
        viewBox="0 0 539 485"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="path"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M267.266 4.38211C317.857 11.295 358.61 41.8924 402.446
          68.0756C451.546 97.4025 529.503 109.596 538.086 166.14C547.038
          225.117 462.379 255.037 439.164 309.987C419.29 357.03 450.938
          421.191 415.004 457.478C378.933 493.903 318.529 483.736 267.266
          483.573C216.177 483.41 163.286 484.012 120.212 456.538C75.6318
          428.104 48.5437 380.68 28.9496 331.568C8.16383 279.47 -7.60563
          223.623 5.52807 169.09C19.2778 112 52.5869 58.3368 102.288
          27.0608C150.448 -3.24583 210.888 -3.32169 267.266 4.38211Z"
          fill="#f44174"
        />
      </svg>
  </div>
  <CustomCursor :targets="['a', 'svg', 'cta-main', 'cta-sec', 'card','clickable','thumbnail']"/>
  <Nav/>
  <router-view id="main"></router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto Mono', monospace;
  // cursor: none;
  // --dark-color: #0D1317;
  --dark-color: #0f1020;
  // --light-color: yellow;
  --light-color: #ecf8f8;
    cursor: none;
}
html{
    cursor: none;
}
body{
  color:var(--light-color);
  background: var(--light-color);
  background-attachment: fixed;
  cursor: none;
  overflow-y: hidden;

}
#app{
  // position: relative;
  width: fit-content;
  .main{
    display: flex;
    position:absolute;
  }
  animation: firstFade 500ms ease-out;
}
@keyframes firstFade {
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bolbs {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
  overflow: hidden;
  .bolb{
    transition: 0.2s ease;
  }
  svg {
    position: absolute;
    width: 40vw;
  }
  #bolb_1 {
    left: 2%;
    top: 5%;
    // animation: rotate 20s linear infinite;
  }
  #bolb_2 {
    left: 20%;
    top: 60%;
    // animation: rotate3d 20s linear infinite;
  }
  #bolb_3 {
    left: 65%;
    top: 25%;
    // animation: squeeze 5s linear infinite;
  }
}
  @keyframes rotate {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes rotate3d {
    0% {
      transform: rotate3d(0, 0, 0, 0turn);
    }
    25% {
      transform: rotate3d(2, -1, -2, 0.2turn);
    }
    50% {
      transform: rotate3d(-1, 0, 1, -0.2turn);
    }
    75% {
      transform: rotate3d(-0.5, -1, 0, 0.2turn);
    }
  }
  @keyframes squeeze {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1.2, 0.8);
    }
    50% {
      transform: scale(1, 1);
    }
    75% {
      transform: scale(0.9, 1.1);
    }
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease-out
}

.fade-enter-from, .fade-leave-to {
  opacity: 0
}
</style>

<script>

import Nav from '@/components/Nav.vue'
// import Left from '@/components/Left.vue'
import CustomCursor from '@/components/CustomCursor.vue'

export default ({
  components: {
    Nav,
    // Left,
    CustomCursor
  },
  data () {
    return {
      hover: false
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.animateBolbs)
  },
  methods: {
    animateBolbs (e) {
      const bolb1 = document.getElementById('bolb_1')
      const bolb2 = document.getElementById('bolb_2')
      const bolb3 = document.getElementById('bolb_3')
      const x = 2 * (e.clientX / window.innerWidth - 0.5)
      const y = -2 * (e.clientY / window.innerHeight - 0.5)

      bolb1.style.transform = `translate3d(${-x * 40}px,${-y * 34}px,0)`
      bolb2.style.transform = `translate3d(${x * 30}px,${-y * 15}px,0)`
      bolb3.style.transform = `translate3d(${-x * 22}px,${y * 40}px,0)`
    }
  }
})
</script>
