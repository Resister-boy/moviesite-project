<template>
  <footer>
    <Logo />
    <a 
      href="https://www.instagram.com/resister_boy/" 
      target="_blank">
      ⓒ{{ new Date().getFullYear() }} resister_boy
    </a>
  </footer>
</template>
<script>
  import Logo from './Logo.vue'

  export default {
    components: {
      Logo
    }
  }
</script>
<style lang="scss" scoped>
  footer {
    margin-top: 50px;
    padding: 30px 0 ;
    text-align: center;
    background-color: #ccc;
    .logo {
      display: block;
      margin-bottom: 4px;
    }
  }
</style>