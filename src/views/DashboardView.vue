<template>
  <div class="home">
    <h1>Product Dashboard</h1>
    <DataGrid/>
  </div>
</template>

<script lang="ts">
import DataGrid from "../components/DataGrid.vue"

export default {
  components: {
    DataGrid
  }
}
</script>

<style scoped>
/* Add your component styles here */
</style>
