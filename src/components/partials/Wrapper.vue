<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 960px;
    padding: 0 15px;
  }
</style>
