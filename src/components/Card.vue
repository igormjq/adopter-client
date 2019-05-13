<template>
  <div class="card flex flex-column" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="card__header flex flex-column justify-center align-center" v-if="$slots.title">
      <div class="card__header__title">
        <slot name="title" />
      </div>
      <div class="card__header__subtitle" v-if="$slots.subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="card__thumbnail" v-if="$slots.thumbnail">
      <slot name="thumbnail"></slot>
    </div>
    <div class="card__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number,
    imgUrl: String
  }
}
</script>

<style lang="scss">
  .card {
    background-color:#FFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    &__header {
      padding: 45px 15px 20px 15px;
      font-weight: 200;
      color: #908D8D;

      &__title {
        font-size: 24px;
        margin-bottom: 10px;
      }
      &__subtitle {
        font-size: 12px;
      }
    }
    &__thumbnail {
      height: 185px;
      div, img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      div {
        background-position: center;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
