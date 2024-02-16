<template>
  <div>
    <Hero />
    <FeaturedProducts />
  </div>
</template>

<script>
  import Hero from './Hero.vue'
  import FeaturedProducts from './FeaturedProducts.vue'

  export default {
    name: 'About',
    components: {
      Hero,
      FeaturedProducts
    }
  };
</script>


