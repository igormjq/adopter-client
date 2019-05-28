<template>
  <div class="container flex --full">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // card -> 235px
  // container -> max-width 1140
}
</script>

<style lang="scss">
  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    
  }
</style>
