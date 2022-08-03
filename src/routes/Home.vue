<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from "../components/Headline.vue";
import Search from "../components/Search.vue";
import MovieList from "../components/MovieList.vue";

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  create() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>