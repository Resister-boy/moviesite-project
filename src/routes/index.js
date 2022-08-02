import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home';
import About from './About';
import Movie from './Movie';

export default createRouter({
  // Hash
  // History://google.com/#/search
  history: createWebHashHistory(), // pages
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/movie/:id',
      component: Movie
    }
  ]
}) 