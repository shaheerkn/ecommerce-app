<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
        <a href="#" class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        <div class="group relative" v-for="product in products" :key="product.id">
          <router-link :to="{ name: 'product', params: { id: product.id }}" class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img :src="product.image" alt="Hand stitched, orange leather long wallet." class="h-full w-full object-cover object-center">
          </router-link>
          <h3 class="mt-4 text-sm text-gray-700"><router-link to="/product">{{ product.name }}</router-link></h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.collection }}</p>
          <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }}</p>
        </div>
      </div>

      <div class="mt-8 text-sm md:hidden">
        <router-link to="/product" class="font-medium text-indigo-600 hover:text-indigo-500">
          Shop the collection
          <span aria-hidden="true"> &rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        products: null
      }
    },
    mounted() {
      axios
      .get('/.netlify/functions/getData/product')
      .then(response => {
        this.response = this.products = response.data
      })
    }
  }
</script>

