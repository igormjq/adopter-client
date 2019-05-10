<template>
  <button 
    class="flex align-center btn" 
    :class="{ 'btn-block': block, [type]: type }"
    :style="{ width: width + 'px', height: height + 'px' }"
    @click.prevent="onClick"
    >
    <span>
      <slot></slot>
    </span>
    <slot name="icon"></slot>
  </button>
</template>

<script>
export default {
  props: {
    block: Boolean,
    type: String,
    width: Number,
    height: Number,
    onClick: Function
  }
}
</script>

<style lang="scss">
  .btn {
    border: 0.5px solid #EF3176;
    font-weight: 600;
    font-size: 14px;
    color: #EF3176;
    height: 20px;
    justify-content: center;
    border-radius: 7px;
    outline: none;
    transition: opacity .3s;
    padding: 0 15px;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }
    &:active {
      filter: contrast(1.6)
    }
    &.btn-block {
      flex: 1;
    }

    &.pink {
      background-color: #EF3176;
      color: #FFF;
    }
    &.white {
      background-color: #FFF;
      color: #EF3176;
    }

    &.btn-see-more {
      border-radius: 0;
      width: 100%;
      font-weight: bolder;
    }
  }
  i {
    margin-left: 5px;
  }
</style>
