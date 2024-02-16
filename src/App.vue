<template>
  <div id="app">
    <Header :cartLength="cartItems" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  data() {
    return {
      cartItems: 0
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
