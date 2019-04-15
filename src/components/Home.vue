<template>
  <section id="header" class="flex --full">
    <div class="content flex --full">
      <container>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat culpa accusamus tenetur, esse cumque eos! Saepe expedita vero reiciendis doloribus ut tempore, porro est voluptate incidunt dolores aperiam eius possimus.</p>
      </container>
    </div>
    <div class="banner flex --full">
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  #header {
    height: 100vh;
    padding-top: 70px;

    div {
      flex: 1;
      &.content {
        padding-top: 20px;
      }
      &.banner {
        background-image: url(../assets/img/pages/home/bg-header.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position-y: 30%;
      }
    }
  }
</style>
