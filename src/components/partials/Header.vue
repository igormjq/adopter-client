<template>
  <header class="header">
    <wrapper-component>
      <h1>oi</h1>
    </wrapper-component>
  </header>
</template>

<script>
import Wrapper from './Wrapper';
export default {
  components: {
    'wrapper-component': Wrapper
  }
}
</script>

<style lang="scss">
  .header {
    height: 70px;
    width: 100%;
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
  }
</style>
