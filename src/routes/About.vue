<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading" 
        absolute />
      <img 
        :src="image" 
        :alt="name" 
        width="500" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>
      {{ email }}
    </div>
    <div>
      <a :href="blog">
        Mirror 바로가기
      </a>  
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loader from '../components/Loader.vue'

  export default {
    name: 'About',
    components :{
      Loader
    },
    data() {
      return {
        imageLoading: true
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      ...mapState('about', [
        'image',
        'name',
        'email',
        'blog'
      ]),
      // image() {
      //   return this.$store.state.about.image
      // },
      // name() {
      //   return this.$store.state.about.name
      // },
      // email() {
      //   return this.$store.state.about.email
      // },
      // blog() {
      //   return this.$store.state.about.blog
      // }
    },
    methods: {
      async init() {
        await this.$loadImage(this.image)
        this.imageLoading = false
      }
    },
  }
</script>
<style lang="scss" scoped>
@import '../scss/main.scss';
  .about {
    text-align: center;
    .photo {
      width: 250px;
      height: 250px;
      margin: 40px auto 20px;
      border: 10px solid $gray-300;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200; 
      position: relative;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 40px;
      font-family: "Oswald", sans-serif;
      margin-bottom: 20px;
    }
  }
</style>