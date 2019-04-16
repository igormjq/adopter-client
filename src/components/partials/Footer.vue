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
      <div class="flex flex-column justify-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto veniam ipsam voluptatem quod deserunt nisi alias voluptas saepe eos, molestiae soluta eum, sed earum inventore expedita? Amet, nemo quos. Repellat?</div>
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
      mailAddress: 'contato@adopter.com.br'
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

