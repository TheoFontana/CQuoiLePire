<template>
  <div class="game-end-screen">
    <div id="end-card" class="end-card">
      <h2>Félicitation ! </h2>
      <h3>Vous avez un score de {{score}}/{{Math.abs(turn/2)+1}} </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies orci lectus ut ut vel.
        Dolor orci, commodo, ut amet, urna, tortor enim, amet, id.
      </p>
      <div class="game-cta" key='cta'>
        <div class="cta-main" @click="this.$parent.$parent.replay()">
          <p class="clickable">Rejouer</p>
          <img class="clickable" :src="require('@/assets/icons/replay.svg')" alt="">

        </div>
        <div class="cta-sec" @click="share()">
          <p class="clickable">Partager</p>
          <img class="clickable" :src="require('@/assets/icons/share.svg')" alt="">
        </div>
      </div>
    </div>
    <transition  appear @enter="startAnimate">
      <svg
        id="arrow"
        class="nav-arrow"
        height="100%"
        viewBox="0 0 228 329"
        preserveAspectRatio="none"
        fill="var(--light-color)" xmlns="http://www.w3.org/2000/svg">
        <path id="right-arrow"
        d="M211.532 18.0444C274.039 157.438 13.2781
        229.919 0.00764191 321.54L6.13284 321.551C19.4033
        229.93 278.701 155.644 216.194 16.2506L224.017
        13.3618L205.875 0.545801L203.233 21.0614L211.532
        18.0444Z" fill="var(--light-color)">
        </path>
        <path id="left-arrow"
        d="M14.37739 18.0444C-48.12961 157.438
        212.63129 229.919 225.90175 321.54l-6.1252
        0.011C206.50609 229.93 -52.79161 155.644 9.71539
        16.2506l-7.823 -2.8888l18.142
        -12.816l2.642 20.5156l-8.299 -3.017z"
        fill="var(--light-color)"/>
      </svg>
    </transition>
    <div class="thumbnail-wraper">
      <transition
        id="thumbnail"
        class="thumbnail"
        name="mode-fade"
        appear
        @click="pageTransition"
        mode="out-in"
      >
        <img v-if="showData" :src="require('@/assets/thumbnail/square/data.png')" >
        <img v-else :src="require('@/assets/thumbnail/square/about.png')" >
      </transition>
    </div>
    <transition  class="notif" name="mode-fade">
      <p v-if="copied">Le message a été copié dans le presse papier ! 💾</p>
    </transition>

  </div>
</template>

<script>
import KUTE from 'kute.js'

export default {
  props: ['score', 'turn'],
  data () {
    return {
      copied: false,
      showData: false
    }
  },
  methods: {
    pageTransition () {
      const thumbnail = document.getElementById('thumbnail')
      const card = document.getElementById('end-card')
      const arrow = document.getElementById('arrow')
      const wraper = document.querySelector('.thumbnail-wraper')
      let nextPage = '/about'
      if (this.showData) {
        nextPage = '/data'
      }
      thumbnail.classList.add('page-out')
      card.style.opacity = 0
      arrow.style.opacity = 0
      setTimeout(() => {
        wraper.style.display = 'none'
        this.$router.push(nextPage)
      }, 1000)
    },
    startAnimate () {
      if (window.innerWidth > 768) {
        const morphToLeft = KUTE.to(
          '#right-arrow',
          { path: '#left-arrow' },
          {
            duration: 1000,
            repeat: 1,
            repeatDelay: 3000,
            yoyo: true
          }
        ).start()
        window.setInterval(() => {
          morphToLeft.start()
        }, 8000)
      }
      window.setInterval(() => {
        this.showData = !this.showData
      }, 4000)
    },
    share () {
      const message = `Je viens de faire un score de ${this.score} / ${Math.abs(this.turn / 2) + 1} sur CQuoiLePire.fr\nEssaies de faire mieux que moi ! 😉\nhttps://CQuoiLePire.fr`
      navigator.clipboard.writeText(message)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
#left-arrow{
  display:none
}
.game-end-screen{
  position: relative;
  left: 50%;
  top: 50%;
  width:100%;
  height: 100%;
  transform: translate(-50%,-50%);
}
.end-card{
  background: var(--light-color);
  color:var(--dark-color);
  width: 40vw;
  margin-left:5vw;
  margin-top: 10vh;
  padding: 2%;
  border:solid 5px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  transition: opacity .5s ease
  h2{
    font-size: 3.5vw;
    font-weight: 800;
    white-space: nowrap;
  }
  h3{
    font-size:2em;
    font-weight: 500;
  }
  p{
    font-weight: 300;
    padding: 5% 0
  }
  .game-cta{
    display:flex;
    flex:0;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    .cta-main {
      p{
        padding: 0;
        font-size: 1em;
        font-weight:500;
      }
    }
    .cta-sec{
      font-style: normal;
      margin-left: 10%;
      font-size: 1em;
    }
  }
}
.thumbnail{
    position: absolute;
    bottom: 5vh;
    right: 5vw;
    width: 35vw;
    max-height: 60vh;
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 10px;
    border:solid 5px var(--dark-color);
  }

.nav-arrow{
  z-index: -1;
  position: absolute;
  top:-3.5vh;
  right: 5vw;
  height: calc(90vh - 35vw);
  width: 20vw;
  transition: opacity .5s ease

}
.notif{
  color:var(--dark-color);
  border-radius: 5px;
  border: solid 2px;
  padding:1%;
  background-color: var(--light-color);
  font-size: 1.2em;
  position: absolute;
  left:50%;
  bottom:5%;
  transform: translate3d(-50%,0,0);
  white-space: nowrap;
}

@media only screen and (max-width : 768px) {
  .end-card{
    font-size: .8em;
    width:  60vw;
    margin-left:10vw;
    padding: 5%;
    h2 {
      font-size: 5vw;
    }
    .game-cta{
      .cta-main{
        p{
          font-size: .8em;
        }
      }
    }
  }
  .thumbnail{
    img{
      right: 10vw;
      width: 50vw;
      max-height: 60vh;
      bottom: 10vh;

    }
  }
  .nav-arrow{
    top: -4vh;
    right: 10vw;
    width: 30vw;
    height: calc(90vh - 50vw);
  }
}
@media only screen and (max-width : 429px) {
  .end-card{
    margin-top:5vh;
    width: 80vw;
    max-height: 40vh;
  }
  .thumbnail{
    width: 80vw;
    bottom: 5vh;
    right:5vw;
    max-height: 40vh;

  }
}

.mode-fade-enter-active, .mode-fade-leave-active {
  transition: .5s ease
}
.mode-fade-enter-from, .mode-fade-leave-to {
  opacity: 0;
  bottom:0;
}

.page-out{
  animation: 1s ease pageOut;
}
@keyframes pageOut {
  50%{
    transform: scale(2) translate3d(-10vw,-10vh,0) ;
  }
  100%{
    transform: scale(3) translate3d(-50vw,-50vh,0) ;
  }
}

</style>
