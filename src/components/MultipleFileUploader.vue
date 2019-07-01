<template>
  <div 
    id="adopterFileUploader" 
    :class="[{ 'no-button': !showButton, 'multiple': multiple, 'flex': multiple, 'flex-column': multiple }]"
  >
    <div class="avatar-wrapper flex" :class="[{ 'align-center': isEmpty }, { 'justify-center': isEmpty }]">
      <div v-if="imageData" class="avatar" :style="{ 'background-image': 'url(' + imageData + ')'}" />
      <div class="images-preview flex flex-wrap" v-if="imagesList.length">
        <div
          v-for="(image, i) in imagesList"
          :key="i"
          class="images-preview__image"
          :style="{ 'background-image': 'url(' + image + ')' }"
        />
      </div>
      <font-awesome-icon :icon="multiple ? 'images' : 'image'" size="5x" :style="{ 'color': '#8a8a8a' }" v-if="isEmpty" />
    </div>
    <input 
      type="file" 
      accept="image/png, image/jpeg"
      :multiple="multiple"
      @input="filesUploaded"
      ref="fileUploadInput"
    >
    <button v-if="showButton" class="btn pink" :class="{ 'btn-block': !multiple }" @click="openFilePicker">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imagesList: [],
      imageData: null,
      reader: new FileReader()
    }
  },
  methods: {
    async filesUploaded({ target: { files }}) {
      if(!this.multiple) {
        const [file] = files;
        this.$emit('imageUploaded', file);
        this.readSingleFile(file);
      }

      this.readMultipleFiles(files);
    },
    readMultipleFiles(files) {
      for (let file of files) {
        this.readSingleFile(file);
      }
    },
    readSingleFile(file) {
      const reader = new FileReader();
      this.bindReaderEvents(reader);

      reader.readAsDataURL(file);
    },
    bindReaderEvents(reader) {
      reader.onload = () => {
        if(this.multiple) return this.imagesList.push(reader.result);
      
        return this.imageData = reader.result;
      };
      reader.onprogress = () => this.$store.dispatch('loadPage');
      reader.onloadend = () => this.$store.dispatch('loadPage', false);
    },
    openFilePicker() {
      this.$refs.fileUploadInput.click();
    },
    sendData() {
      return this.multiple ? this.imagesList : this.imageData;
    }
  },
  computed: {
    buttonText() {
      return this.multiple ? 'Selecionar fotos' : 'Selecione uma foto';
    },
    isEmpty() {
      return !(this.imageData || !!this.imagesList.length);
    }
  },
}
</script>

<style lang="scss">
  #adopterFileUploader {
    &.multiple {
      width: 100%;

      .avatar-wrapper {
        flex: 1;
        width: 100%;
        border-radius: 0;
        margin-bottom: 0;

        .images-preview {
          padding: 10px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          grid-column-gap: 1rem;
          grid-row-gap: .5em;
          width: 100%;

          &__image {
            background-size: cover;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
      button {
        border-radius: 0;
      }
    }
    &.no-button {
      position: absolute;

      input[type=file] {
        display: block;
        opacity: 0;
        position: absolute;
        top: 0;
      }
    }
  
    input[type=file] {
      display: none;
      width: 100%;
      height: 100%;
      
    }
    .avatar-wrapper {
      height: 185px;
      width: 185px;
      border-radius: 50%;
      background-color: #F5F5F5;
      margin-bottom: 10px;

      .avatar {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      
    }
  }
</style>