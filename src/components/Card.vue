<template>
    <div class="product-details">
      <h2>Product Details</h2>
      <div v-if="loading" class="loading-message">Loading...</div>
      <div v-else>
        <div v-if="product" class="product-card">
          <h3>{{ product.name }}</h3>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Price:</strong> {{ product.price }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Features:</strong></p>
          <ul>
            <li v-for="feature in processedFeatures" :key="feature">{{ feature }}</li>
          </ul>
        </div>
        <div v-else class="empty-message">Product not found.</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null,
        loading: false,
      };
    },
    mounted() {
      this.fetchProduct();
    },
    computed: {
      processedFeatures() {
        if (!this.product || !this.product.features) return [];
        // Split features by newline, filter out empty strings,
        // and remove HTML tags
        return this.product.features.split('\n')
          .filter(feature => feature.trim().length > 0)
          .map(feature => feature.replace(/<[^>]+>/g, ''));
      }
    },
    methods: {
      async fetchProduct() {
        this.loading = true;
        try {
          const productId = this.$route.params.id;
          const items = await this.fetchData();
          this.product = items.find(item => item.id === productId);
        } catch(error) {
          console.error('Error fetching data:', error);
        } finally {
          this.loading = false;
        }
      },
      async fetchData() {
        const response = await fetch('https://raw.githubusercontent.com/GoogleChromeLabs/sample-pie-shop/master/src/data/products.json');
        const data = await response.json();
        return data.products.data.items;
      },
    },
  };
  </script>
  
  <style scoped>
  .product-details {
    margin-top: 20px;
  }
  
  .loading-message,
  .empty-message {
    text-align: center;
  }
  
  .product-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .product-card h3 {
    margin-top: 0;
  }
  
  .product-card p {
    margin: 5px 0;
  }
  
  .product-card ul {
    list-style: none;
    padding: 0;
  }
  
  .product-card ul li {
    margin-bottom: 5px;
  }
  </style>
  