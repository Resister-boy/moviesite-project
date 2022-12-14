import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home';
import About from './About';
import Movie from './Movie';
import NotFound from './NotFound';

export default createRouter({
  // Hash
  // History://google.com/#/search
  history: createWebHashHistory(), // pages
  scrollBehavior() {
    return { top: 0 }
  },
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
    },
    {
      path: '/:notfound(.*)',
      component: NotFound
    }
  ]
}) 