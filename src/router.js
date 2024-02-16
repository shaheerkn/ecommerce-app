// router.js
import { createRouter, createWebHistory } from 'vue-router'; // Import specific functions from vue-router
import Home from './components/Home.vue';
import PageNotFound from './components/404.vue';
import Product from './pages/Product.vue';
import Cart from './components/Cart.vue';

// Use createRouter and createWebHistory functions
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/product/:id', name: 'product', component: Product },
    { path: '/cart', name: 'cart', component: Cart },
    { path: '/:catch(.*)', component: PageNotFound },
  ]
});

export default router;
