<template>
  <div class="card flex flex-column" :style="{ width: width + 'px', height: height + 'px' }">
    <h1>Card</h1>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number
  }
}
</script>

<style lang="scss">
  .card {
    background-color: #FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
</style>
