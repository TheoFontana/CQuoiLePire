<template>
  <div class="game-end-screen">
    <div id="end-card" class="end-card">
      <h2>Félicitation ! </h2>
      <h3>Vous avez un score de {{score}}/{{Math.abs(turn/2)+1}} </h3>
      <p>
        N'hésitez pas à rejouer si vous pensez pouvoir faire mieux !
        Defiez vos amis
      </p>
      <div class="game-cta" key='cta'>
        <div class="cta-main" @click="this.$parent.$parent.replay()">
          <p class="clickable">Rejouer</p>
          <img class="clickable" :src="require('@/assets/icons/replay.svg')" alt="rejouer">
        </div>
        <div class="cta-sec" @click="share()">
          <p class="clickable">Partager</p>
          <img class="clickable" :src="require('@/assets/icons/share.svg')" alt="partager">
        </div>
      </div>
    </div>
    <div id="thumbnail" class="thumbnail clickable" @click="pageTransition">
      <p> {{thumbnailTitle}} </p>
      <img v-if="showData" :src="require('@/assets/thumbnail/square/data.png')" >
      <img v-else :src="require('@/assets/thumbnail/square/about.png')" >
    </div>
    <transition  class="notif" name="mode-fade">
      <p v-if="copied">Un message a été copié dans votre presse papier ! 💾</p>
    </transition>

  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: ['score', 'turn'],
  data () {
    return {
      copied: false,
      showData: true,
      thumbnailTitle: 'Explorer nos données'
    }
  },
  beforeRouteLeave (to, from, next) {
    this.transitionOut()
  },
  mounted () {
    this.animateThumbnails()
  },
  methods: {
    // Update the thumbnail every 5s
    animateThumbnails () {
      setInterval(() => {
        gsap.to('#thumbnail', { opacity: 0, scaleY: 0, duration: 0.4, ease: 'power3.in' })
        setTimeout(() => {
          this.showData = !this.showData
          gsap.to('#thumbnail', { opacity: 1, scaleY: 1, duration: 0.4, ease: 'power3.out' })
        }, 400)
      }, 5000)
    },
    // Manage the transition out of the page
    pageTransition () {
      const thumbnail = document.getElementById('thumbnail')
      const card = document.getElementById('end-card')
      let nextPage = '/about'
      if (this.showData) {
        nextPage = '/data'
      }
      thumbnail.classList.add('page-out')
      card.style.opacity = 0
      setTimeout(() => {
        this.$router.push(nextPage)
      }, 1000)
    },
    // Show user massage was copied to teir clipboard
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
.end-card{
  background-color: rgba(255, 255, 255,0.7);
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
  color:var(--dark-color);
  width: 40vw;
  margin-left:5vw;
  margin-top: 10vh;
  padding: 2%;
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
    font-size:1.2em;
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
  text-align: center;
  position: absolute;
  padding: 1% 3%;
  background-color: rgba(255, 255, 255,0.7);
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
  border-radius: 10px;
  bottom: 5vh;
  right: 5vw;
  width: 35vw;
  color: var(--dark-color);
  // transition: transform 0.3s ease-out;
  p{
    font-size: 1.2em;
    font-weight: 500;
    padding: 2%;
  }
  img{
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
  &:hover{
    transform: scale(1.05);
  }
}
.notif{
  background-color: rgba(255, 255, 255,0.7);
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, .5);
  color:var(--dark-color);
  border-radius: 5px;
  border: solid 2px;
  padding:1%;
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
        padding: 2% 5%;
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
}
@media only screen and (max-width : 429px) {
  .end-card{
    margin-top:5vh;
    width: 80vw;
    max-height: 40vh;
    .game-cta{
      .cta-main{
        padding: 2% 5%;
      }
    }
  }
  .thumbnail{
    width: 80vw;
    bottom: 5vh;
    right:5vw;
    max-height: 40vh;
  }
}

.mode-fade-enter-active, .mode-fade-leave-active {
  // transition: 0s ease;
}
.mode-fade-enter-from, .mode-fade-leave-to {
  // transition: 0s ease;
  // opacity: 0;
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
