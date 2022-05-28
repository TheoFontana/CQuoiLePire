/*
  Inspired by Herman Wikner work
  https://github.com/hermanwikner/vue-custom-cursor
*/

<template>
  <div
    id="customCursorCircle"
    class="custom-cursor"
  > </div>
  <div
    id="customCursorPoint"
    class="cursor-point"
  > </div>
</template>

<script>
export default {
  name: 'CustomCursor',
  props: {
    targets: Array
  },
  data () {
    return {
      x: null,
      y: null,
      forbidenTags: ['path', 'svg']
    }
  },
  methods: {
    customCursor (e) {
      // cursor position
      this.x = e.clientX
      this.y = e.clientY

      const cursor = document.getElementById('customCursorCircle')
      const point = document.getElementById('customCursorPoint')
      // folow the cursor
      // cursor.style.transform = `translate3d(calc(${this.x}px - 50%), calc(${this.y}px - 50%),0)`
      // point.style.transform = `translate3d(calc(${this.x}px - 50%), calc(${this.y}px - 50%),0)`
      cursor.style.transform = `translate3d(${this.x}px, ${this.y}px,0)`
      point.style.transform = `translate3d(${this.x}px, ${this.y}px ,0)`
      // avoid problem when hover svg
      if (!this.forbidenTags.includes(e.target.tagName.toLowerCase())) {
        // change cursor color if needed
        if (
          (this.targets.length > 0 &&
            this.targets.includes(e.target.tagName.toLowerCase())) ||
          this.targets.includes(e.target.className.toLowerCase())
        ) {
          cursor.style.backgroundColor = '#0ff'
        } else {
          cursor.style.backgroundColor = '#f44174'
        }
      }
    }
  },
  mounted () {
    window.addEventListener('mousemove', this.customCursor)
  }
}
</script>

<style lang="scss" scoped>
$ease: cubic-bezier(0.23, 1, 0.32, 1);
.custom-cursor {
  z-index: 100;
  cursor: none;
  pointer-events: none;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition:transform 0.3s $ease;
  background-color: #f44174;
  mix-blend-mode: difference;
  margin: -20px -20px;
}
.cursor-point{
  z-index: 100;
  cursor: none;
  pointer-events: none;
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f44174;
  mix-blend-mode: difference;
}
@media only screen and (max-width : 768px) {
  .custom-cursor {
    display: none;
  }
}
</style>
