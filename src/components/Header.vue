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
  </header>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped> 
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    .logo {
      margin-right: 40px;
    }
  }
</style>