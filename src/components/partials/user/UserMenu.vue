<template>
  <ul>
    <li>menu</li>
    <li>menu</li>
    <li>menu</li>
    <button class="btn" @click="logout">Sair</button>
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

<style>

</style>
