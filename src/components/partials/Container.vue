<template>
  <div class="container flex --full">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .container {
    padding: 0 30px;

    &-fluid {
      padding: 0;
    }
  }
</style>
