<template>
  <form class="form home__form flex align-center justify-center">
    <div class="form__body">
      <div class="form__element flex">
        <select class="flex --full" label="Estado">
          <option value="RS" selected>RS</option>
          <option value="SC">SC</option>
        </select>
      </div>
      <div class="form__element flex">
        <select class="flex --full" label="Cidade">
          <option value="Pelotas">Pelotas</option>
        </select>
      </div>
      <div class="form__element flex">
        <input type="radio" name="DOG" value="DOG">
        <label for="DOG">Cachorro</label>
        <input type="radio" name="CAT" value="CAT">
        <label for="CAT">Gato</label>
      </div>
      <div class="form__element flex">
        <select name="" v-model="size">
          <option value="SMALL">Pequeno</option>
          <option value="MEDIUM">Médio</option>
          <option value="LARGE">Grande</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .home__form {
    padding: 0 25px;

    .form {
      &__body {
        width: 100%;

        & > * {
          margin: 8px 0;
        }

        select {
          height: 40px;
        }
      }
    }
  }
</style>
