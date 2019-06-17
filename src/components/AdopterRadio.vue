<template>
  <label class="adopter-check radio" :class="{ 'selected': shouldBeChecked }">
    <span class="content">
      <slot></slot>
    </span>
    <input type="radio" :checked="shouldBeChecked" :value="value" @change="updateInput">
    <span class="mark"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String
    },
    modelValue: {
      default: ''
    }
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value);
    }
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue === this.value;
    }
  }
}
</script>

<style lang="scss">
.adopter-check.radio {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 10px;
  filter: grayscale(100%);
  transition: filter .3s;

  &.selected {
    filter: grayscale(0);
  }

  .content {
    order: 1;
    color: #EF3176;
  }

  .mark {
    height: 1rem;
    width: 1rem;
    margin-right: 5px;
    order: 0;
    transition: all .3s;
    border-radius: 50%;
    border: 2px solid #989898;

    &:after {
      content: '';
      display: none;
      position: absolute;
    }
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked {
      & ~ .mark {
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        border-color: #EF3176;
      }
    }

    &[type=radio]:checked {
      & ~ .mark {
        &:after {
          background-color: #EF3176;
          display: flex;
          width: .5em;
          height: .5em;
          border-radius: 50%;
          align-items: center;
          justify-content:center;
        }
      }
    }
  }

  
};
</style>
