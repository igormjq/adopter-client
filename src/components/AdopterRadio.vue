<template>
  <label class="adopter-check radio">
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
    type: {
      type: String,
      default: 'checkbox'
    },
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
.adopter-check {
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

  .content {
    order: 1;
  }

  &.radio {
    .mark {
      border-radius: 50%;
      padding: 0;
    }
  }

  .mark {
    height: 1rem;
    width: 1rem;
    background-color: #eee;
    margin-right: 5px;
    order: 0;
    transition: all .3s;
    border: 1px solid #e1e1e1;
    padding-bottom: 4px;

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
        background-color: #EF3176;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
      }
    }
    &[type=checkbox]:checked {
      & ~ .mark {
        &:after {
          display: block;
          width: 4px; // 25 -> 5
          height: 8px; // 25 -> 10
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    }

    &[type=radio]:checked {
      & ~ .mark {
        &:after {
          background-color: #FFF;
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
