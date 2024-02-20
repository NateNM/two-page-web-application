<template>
  <div class="datagrid">
    <div v-if="loading" class="loading-message">Loading...</div>
    <div v-else-if="items.length === 0" class="empty-message">No items found.</div>
    <div v-else>
      <table class="item-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <router-link :to="{ name: 'Product', params: { id: item.id }}">
              <td class="linkName">{{ item.name }}</td>
            </router-link>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch('https://raw.githubusercontent.com/GoogleChromeLabs/sample-pie-shop/master/src/data/products.json');
        const data = await response.json();
        this.items = data.products.data.items;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.datagrid {
  margin-top: 20px;
}

.loading-message,
.empty-message {
  text-align: center;
}

.item-list {
  width: 100%;
  border-collapse: collapse;
}

.item-list th,
.item-list td {
  padding: 8px;
  border: 1px solid #ddd;
}

.item-list th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #9c9999;
}

.router-link-exact-active,
.router-link-active {
  text-decoration: none;
  outline: none;
}
</style>
