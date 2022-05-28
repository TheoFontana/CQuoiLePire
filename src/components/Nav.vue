<template>
  <div id="nav" class="nav">
    <transition name="slide-left" mode="out-in" class="clickable">
        <img
          v-if="showClose"
          @click="updateMenu(false)"
          class="clickable"
          :src="require('@/assets/icons/close.svg')"
          alt="fermer"
        >
        <router-link
          v-else to="/"
          class="title">
          <span><span class="clickable">CQuoiLePire</span></span>
        </router-link>
    </transition>
    <transition name="slide-right" class="pages" mode="out-in">
        <div v-if="showNav" class="links">
          <router-link id="data" to="/data">
            <span><span class="clickable">Donnée</span></span>
          </router-link>
          <router-link id="game" to="/game">
            <span><span class="clickable">Jeux</span></span>
          </router-link>
          <router-link id="about" to="/about">
            <span><span class="clickable"> A propos</span></span>
          </router-link>
        </div>
        <div @click="updateMenu(true)" v-else class="hamburger links clickable">
          <img
            class="clickable"
            :src="require('@/assets/icons/ham.svg')"
            alt="menu"
          >
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showNav: true,
      showClose: false
    }
  },
  created () {
    window.addEventListener('resize', this.updateNav)
    this.updateNav()
  },
  unmounted () {
    window.removeEventListener('resize', this.updateNav)
  },
  methods: {
    updateNav () {
      if (window.innerWidth <= 768) {
        this.showNav = false
        this.showClose = false
      } else {
        this.showNav = true
        this.showClose = false
      }
    },
    updateMenu (openMenu) {
      if (openMenu) {
        this.showNav = true
        this.showClose = true
      } else {
        this.showNav = false
        this.showClose = false
      }
    }
  }
}
</script>

<style lang="scss">
  .nav{
    z-index: 2;
    position: sticky;
    top: 0px;
    left: 0px;
    height: 7vh;
    width: 100vw;
    // border-bottom: solid 5px ;
    // border-left: solid 5px ;
    // margin-left: 7vw;
    padding: 0 5vw ;
    // padding-top: 2vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:var(--dark-color);
    .title{
      font-size: 2em;
      font-weight: 800;
    }
    img{
      height: 3vh;
    }
    a{
      color: var(--dark-color);
      text-decoration: none;
      > span{
        overflow: hidden;
        display: block;
        > span {
          display: block;
          animation: apearBaseLine .5s ease-out;
        }
      }
    }
    .pages{
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
      a {
        margin-left: 5%;
      }
      .links{
        width: fit-content;
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
.slide-left-enter-active,
.slide-left-leave-active {
  transition: .5s ease
}
.slide-left-enter-from, .slide-left-leave-to {
  opacity: 0;
  transform:translate(-100%,0)
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: .5s ease
}
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform:translate(100%,0)
}

</style>
