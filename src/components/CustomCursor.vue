<template>
  <div
    id="customCursorCircle"
    class="custom-cursor"
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
      y: null
    }
  },
  methods: {
    customCursor (e) {
      // cursor pos
      this.x = e.clientX
      this.y = e.clientY

      const cursor = document.getElementById('customCursorCircle')
      if (
        (this.targets.length > 0 &&
          this.targets.includes(e.target.tagName.toLowerCase())) ||
        this.targets.includes(e.target.className.toLowerCase())
      ) {
        cursor.style.backgroundColor = '#0ff'
      } else {
        cursor.style.backgroundColor = 'var(--light-color)'
      }
      cursor.style.transform = `translate3d(${this.x - 10}px,${this.y - 10}px,0)`
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: transform 0.3s $ease;
  background-color: #000;
  mix-blend-mode: difference;
}
</style>
