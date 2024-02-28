<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart <span v-if="!cartItems.length">Is Empty :)</span></h1>

      <form class="mt-12" >
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li class="flex py-6" v-for="cartItem in cartItems">
              <div class="flex-shrink-0">
                <img :src="cartItem.product.image" alt="Front side of mint cotton t-shirt with wavey lines pattern." class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32">
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{ cartItem.product.name }}</a>
                    </h4>
                    <p class="ml-4 text-sm font-medium text-gray-900">{{ cartItem.product.price }}</p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{{ cartItem.product.collection }}</p>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                    <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500" @click="()=> deleteData(cartItem.id)">
                      <span>Remove</span>
                    </button>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section aria-labelledby="summary-heading" class="mt-10" v-if="cartItems.length">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                <dd class="ml-4 text-base font-medium text-gray-900">
                  ${{ totalPrice }}
                </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
          </div>

          <div class="mt-10">
            <button type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout</button>
          </div>

        </section>
        <div class="mt-6 text-center text-sm">
            <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </router-link>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        cartItems: '',
        totalPrice: ''
      }
    },
    methods: {
      async deleteData(productId) {
        try {
          const response = await axios.delete(`http://localhost:3000/cart/${productId}`);
          console.log('Data deleted successfully:', response.data);
          this.fetchCartData()
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      },
      fetchCartData() {
        axios
        .get(`http://localhost:3000/cart`)
        .then(response => {
          this.cartItems = response.data;
          this.totalPrice = this.cartItems.reduce((total, item) => {
            const price = parseFloat(item.product.price.replace('$', ''));
            return total + price;
          }, 0);
        })
      }
    },
    mounted() {
      this.fetchCartData()
    }
  }
</script>
