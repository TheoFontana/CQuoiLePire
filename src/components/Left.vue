<template>
  <div class="left"></div>
</template>

<script>
export default {

}
</script>

<style>
.left{
  color:var(--light-color);
  height: 90vh;
  width: 7vw;
  flex-shrink: 0;
  outline: solid 5px ;
  position: fixed;
  margin-top: 10vh;
}
  @media only screen and (max-width : 768px) {
    .left{
      display: none;
    }
  }

</style>
