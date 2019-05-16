<template>
  <ul class="user-menu">
    <li class="flex align-center"><span class="icon icon-paw --pink"/>Meus animais favoritos</li>
    <li class="flex align-center"><span class="icon icon-paw"/>Cadastrar um animal</li>
    <li class="flex align-center"><span class="icon icon-paw"/>Lorem Ipsum</li>
    <li @click="logout">Sair</li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style lang="scss">
  .user-menu {
    li {
      border-bottom: 1px solid #e8eaed;
      padding: 10px;
      cursor: pointer;
      transition: background .5s;

      .icon {
        width: 16px;
        height: 16px;
      }

      &:hover {
        background-color: #EF3176;
        color: #FFF;
      }

      &:last-of-type {
        border: none;
      }
    }
  }
</style>
