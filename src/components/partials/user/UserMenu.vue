<template>
  <ul class="user-menu">
    <li>menu</li>
    <li>menu</li>
    <li>menu</li>
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
      border-bottom: 1px solid #EF3176;
      padding: 10px;

      &:last-of-type {
        border: none;
      }
    }
  }
</style>
