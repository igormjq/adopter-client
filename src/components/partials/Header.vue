<template>
  <header class="header">
    <wrapper-component>
      <div class="header__left flex align-center">
        <div class="logo flex align-center">
          <img src="../../assets/img/logo.png" alt="Adopter logo">
        </div>
        <div class="header__options">
          <ul class="flex">
            <li>Sobre nós</li>
            <li>Como adotar</li>
            <li>Parceiros</li>
          </ul>
        </div>
      </div>
      <div class="header__right flex align-center">
        <h1>botao1</h1>
        <h1>botao2</h1>
      </div>
    </wrapper-component>
  </header>
</template>

<script>
import Wrapper from './Wrapper';
export default {
  components: {
    'wrapper-component': Wrapper
  }
}
</script>

<style lang="scss">
  .header {
    height: 70px;
    width: 100%;
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;

    >.container {
      justify-content: space-between;
    }

    &__left {
      .logo {
        img {
          max-width: 110px;
        }
      }
      .header__options {
        ul {
          li {
            padding: 0 30px;
            color: #9D9D9D;
          }
        }
      }
    }
  }
</style>
