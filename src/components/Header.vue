<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="navigation in navigations" 
        :key="navigation.name" 
        class="nav-item">
        <RouterLink 
          :to="navigation.href" 
          active-class="active"
          :class="{ active: isMatch(navigation.path)}"
          class="nav-link">
          {{ navigation.name }}
        </RouterLink>
      </div>
    </div>
    <RouterLink
      to="/about"
      class="user">
      <img 
        :src="image" 
        :alt="name" />
    </RouterLink>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from './Logo.vue';

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/:id',
          path: /^\/movie/ // movie
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      return path.test(this.$route.fullPath)
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
    // ...mapState('movie', [
    //   'movie',
    //   'loading',
    //   'message',
    //   'theMovie'
    // ])
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  }
}
</script>

<style lang="scss" scoped> 
@import '../scss/main.scss';

  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav {
        display: none;
      }
    }
  }
</style>