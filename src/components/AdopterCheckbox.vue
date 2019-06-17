<template>
  <label class="adopter-check checkbox" :class="{ 'selected': shouldBeChecked }">
    <span class="content">
      <slot></slot>
    </span>
    <input type="checkbox" :checked="shouldBeChecked" :value="value" @change="updateInput">
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
      type: [Boolean, Array]
    },
    trueValue: {
      default: true
    },
    falseValue: {
      defaule: false
    }
  },
  methods: {
    updateInput(e) {
      if(this.isList) {
        let newList = [...this.modelValue];

        if(e.target.checked) {
          newList.push(this.value);
        } else {
          newList.splice(newList.indexOf(this.value), 1);
        }

        return this.$emit('change', newList);
      }

      this.$emit('change', e.target.checked);
    }
  },
  computed: {
    isList() {
      return Array.isArray(this.modelValue);
    },
    shouldBeChecked() {
      if(this.isList) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    }
  },
}
</script>

<style lang="scss">
.adopter-check.checkbox {
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
    border: 2px solid #EF3176;
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
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &[type=checkbox]:checked {
      & ~ .mark {
        &:after {
          display: block;
          width: 4px; // 25 -> 5
          height: 8px; // 25 -> 10
          border: solid #EF3176;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    };
  }

  
};
</style>
