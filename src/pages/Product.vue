<template>
  <MainProduct :productId="$route.params.id" />
</template>

<script>
  import MainProduct from '../components/MainProduct.vue'
  
  export default {
    components: {
      MainProduct
    }
  }
</script>

