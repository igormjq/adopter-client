<template>
  <form class="form home__form flex align-center justify-center">
    <div class="form__body">
      <div class="form__element flex">
        <select class="flex --full" placeholder="lorem">
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
        <select name="">
          <option value="SMALL">Pequeno</option>
          <option value="MEDIUM">Médio</option>
          <option value="LARGE">Grande</option>
        </select>
        <select name="">
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
  }
</style>
