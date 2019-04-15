<template>
  <button 
    class="flex align-center btn" 
    :class="{ 'btn-block': block }"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <span>
      <slot></slot>
    </span>
    <i v-if="icon" :style="{ backgroundImage: 'url(' + icon + ')'}"></i>
  </button>
</template>

<script>
export default {
  props: {
    block: Boolean,
    icon: String,
    width: Number,
    height: Number
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
  .btn {
    border: 0.5px solid #EF3176;
    font-weight: 600;
    color: #EF3176;
    height: 20px;
    justify-content: center;
    border-radius: 7px;
    outline: none;
    cursor: pointer;

    &.btn-block {
      flex: 1;
    }
    i {
      width: 15px;
      height: 15px;
    }
  }
</style>
