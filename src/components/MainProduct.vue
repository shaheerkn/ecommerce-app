<template>
  <main v-if="componentLoaded">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <div class="aspect-h-1 aspect-w-1 w-full">
          <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
            <img :src="image" alt="Angled front view with bag zipped and handles upright." class="h-full w-full object-cover object-center sm:rounded-lg">
          </div>
        </div>

        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
          <p class="text-3xl tracking-tight text-gray-900 mt-3">{{ product.price }}</p>

          <div class="flex items-center mt-3">
            <svg class="h-5 w-5 flex-shrink-0 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" v-for="index in product.ratings">
              <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
            </svg>
          </div>

          <p class="space-y-6 text-base text-gray-700 mt-6">{{ product.description }}</p>

          <h3 class="text-sm text-gray-600 mt-6">Color</h3>
          <span class="flex items-center space-x-3 mt-2">
            <label :class="['relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700 ', { 'ring':  index == currentVariant }]" v-for="(varinat, index) in product.variants" @click="handleVariants(index)">
              <span aria-hidden="true" class="h-8 w-8 rounded-full border border-black border-opacity-10 1" :style="{ 'background': varinat.color }"></span>
            </label>
          </span>

          <p class="mt-4" :style="{ color: stock === 0 ? 'red' : 'green' }">{{ stock }} in stock!</p>

          <button :disabled="stock === 0 ? true : false" type="submit" @click="()=> handleCart()" :class="[ 'flex mt-10 max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full', { 'disabled:opacity-75': stock === 0 } ]">Add to bag</button>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="divide-y border-t pt-4">
              <div>
                <span class="text-gray-900 text-lg font-medium">Features:</span>
                <ul role="list" class="mt-3 list-disc	list-inside">
                  <li v-for="feature in features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  import { eventBus } from '../eventBus.js';

  export default {
    data() {
      return {
        product: null,
        currentVariant: 0,
        componentLoaded: false,
      }
    },
    props: {
      productId: {
        type: String
      }
    },
    methods: {
      async sendData() {
        try {
          const response = await axios.post('http://localhost:3000/cart/', {
            product: {
              "name": this.product.name,
              "image": this.image,
              "collection": this.product.collection,
              "price": this.product.price
            }
          });
        } catch (error) {
          console.error('Error sending data:', error);
        }
      },
      handleVariants(index) {
        this.currentVariant = index;
      },
      handleCart() {
        this.sendData()
        eventBus.emit('handleCart');
      }
    },
    computed: {
      image() {
        return this.product.variants[this.currentVariant].image;
      },
      features() {
        return this.product.variants[this.currentVariant].features;
      },
      stock() {
        return this.product.variants[this.currentVariant].stock;
      }
    },
    mounted() {
      axios
      .get(`http://localhost:3000/product/${this.productId}`)
      .then(response => {
        this.response = this.product = response.data
        this.componentLoaded = true;
      })
    }
  }
</script>



