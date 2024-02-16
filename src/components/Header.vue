<template>
  <nav class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <router-link to="/" class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
          </router-link>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Home</router-link>
            <router-link to="/product/1" class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">Product</router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <router-link to="/cart" type="button" class="w-8 h-18 relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <div class="a flex align-center justify-center absolute -right-1 -top-1 bg-black text-white rounded-full w-5 h-5 text-[12px]">{{ cartLength }}</div>
            <svg viewBox="0 0 15.45 13.71" stroke-width="0.6"><g fill="none" stroke="currentColor"><path d="M.56 1.42H2.7l2.35 7.67h7.52l1.84-5.95H2.92"></path><circle cx="11.32" cy="11.77" r="1.01"></circle><circle cx="6.38" cy="11.77" r="1.01"></circle></g></svg>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import axios from 'axios'
  import { eventBus } from '../eventBus';

  export default {
    name: 'Header',
    data() {
      return {
        cartLength: 0,
        data: ''
      }
    },
    created() {
      eventBus.on("handleCart", () => {
        this.fetchCartLegth()
      });
    },
    methods: {
      fetchCartLegth() {
        axios
        .get(`http://localhost:3001/cart`)
        .then(response => {
          this.cartLength = response.data.length
        })
      }
    },
    mounted() {
      this.fetchCartLegth()
    },
  };
</script>
