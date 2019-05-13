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
      <div class="form__element multiple">
        <div class="form__element__radio">
          <input type="radio" name="DOG" value="DOG">
          <label for="DOG">Cachorro</label>
        </div>
        <div class="form__element__radio">
          <input type="radio" name="DOG" value="DOG">
          <label for="DOG">Cachorro</label>
        </div>
      </div>
      <div class="form__element multiple">
        <select name="" v-model="size">
          <option value="SMALL">Pequeno</option>
          <option value="MEDIUM">Médio</option>
          <option value="LARGE">Grande</option>
        </select>
        <select name="" v-model="size">
          <option value="SMALL">Macho</option>
          <option value="MEDIUM">Fêmea</option>
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
        }
      &__element {
        width: 100%;

        &.multiple {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 5px;
          color: #EF3176;
        }

        select {
          height: 40px;
        }
      }


    }
  }
</style>
