<template>
  <section id="adoptionArea" class="flex --full">
    <div class="content flex --full">
      <container>
        <h2>Cu do caralho</h2>
      </container>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_ADOPTION_REQUESTS } from '../../../graphql/queries';

export default {
  computed: {
    ...mapGetters(['user']) 
  },
  async created() {
    const { 
      data: {
        me
      }
    } = await this.$apollo.query({
      query: GET_ADOPTION_REQUESTS,
    });

    console.log('me', me);
  }
}
</script>

<style lang="scss">
#adoptionArea {
  background-color: #EAEBED;
}
</style>