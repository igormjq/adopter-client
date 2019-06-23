<template>
  <div id="adopterFileUploader" :class="{ 'no-button': !showButton }">
    <div class="avatar-wrapper flex align-center justify-center">
      <div v-if="imageData" class="avatar" :style="{ 'background-image': 'url(' + imageData + ')'}" />
      <font-awesome-icon icon="paw" size="5x" :style="{ 'color': '#8a8a8a' }" v-else />
    </div>
    <input 
      type="file" 
      accept="image/png, image/jpeg"
      :multiple="multiple"
      @input="filesUploaded"
      ref="fileUploadInput"
    >
    <button v-if="showButton" class="btn btn-block pink" @click="openFilePicker">Selecione uma foto</button>
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
    filesUploaded({ target: { files }}) {
      if(!this.multiple) {
        const [file] = files;
        this.reader.readAsDataURL(file);
      }
    },
    openFilePicker() {
      this.$refs.fileUploadInput.click();
    }
  },
  created() {
    this.reader.onload = () => {
      this.imageData = this.reader.result;
      this.$emit('imageUploaded', this.imageData);
    };
    this.reader.onprogress = () => this.$store.dispatch('loadPage');
    this.reader.onloadend = () => this.$store.dispatch('loadPage', false);
  }
}
</script>

<style lang="scss">
  #adopterFileUploader {
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