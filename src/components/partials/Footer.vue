<template>
  <footer class="footer">
    <container>
      <div class="flex flex-column justify-center">
        <span>{{ mailAddress }}</span>
        <social :networks="['facebook', 'instagram', 'twitter']" />
      </div>
      <div class="footer-image">
        <img src="../../assets/img/dog-and-cat-footer.png">
      </div>
      <div class="flex flex-column justify-center footer-info">
        <img class="" src="../../assets/img/logo.png" alt="Footer logo">
        <span class="footer-text">{{ footerText }}</span>
      </div>
    </container>
  </footer>
</template>

<script>
import Social from '../Social';

export default {
  components: {
    social: Social
  },
  data() {
    return {
      mailAddress: 'contato@adopter.com.br',
      footerText: 'Adopter é uma plataforma destinada à causa animal. Nosso objetivo é unir pessoas e organizações em prol dos animais'
    }
  }
}
</script>

<style lang="scss">
  footer {
    background-color: #FFF;
    color: #6F6F6F;
    padding-top: 60px;

    .container {
      display: grid;
      grid-template-columns: 1fr 330px 1fr;
      grid-column-gap: 40px;
    }
    .footer-info{
      max-width: 275px;
      margin: 0 0 0 auto;
      text-align: center;
      font-weight: 200;
      font-size: 12px;

      img {
        width: 110px;
        margin: 0 auto;
      }
      span {
        margin-top: 10px;
      }
    }
    .footer-image {
      img {
        width: 100%;
      }
    }

    .icon-social {
      width: 30px;
      height: 30px;
    }
  }
</style>

