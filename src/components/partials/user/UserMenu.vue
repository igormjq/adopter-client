<template>
  <ul class="user-menu">
    <router-link to="/favorites" tag="li" @click.native="closeMenu">
      <font-awesome-icon icon="heart" /> 
      <span>Favoritos</span>
    </router-link>
    <router-link to="/animals/new" tag="li" @click.native="closeMenu">
      <font-awesome-icon icon="cat" />
      <span>Cadastrar um animal</span>
    </router-link>
    <router-link to="" tag="li" @click.native="closeMenu">
      <font-awesome-icon icon="info-circle" />
      <span>Ajuda</span>
    </router-link>
    <li @click="logout">
      <font-awesome-icon icon="sign-out-alt" />
      <span>Sair</span>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      color: '#EF3176'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    ...mapActions([
      'closeMenu'
    ])
  }
}
</script>

<style lang="scss">
  .user-menu {
    li {
      border-bottom: 1px solid #e8eaed;
      padding: 20px;
      cursor: pointer;
      transition: background .5s;

      .svg-inline--fa {
        color: #EF3176;
        margin-right: 10px;
      }

      &:hover {
        background-color: #EF3176;
        color: #FFF;

        .svg-inline--fa {
          color: #FFF;
        }
      }

      &:last-of-type {
        border: none;
      }
    }
  }
</style>
