<template>
  <header>
    <h2>BookList</h2>
    <Navbar />
  </header>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Header",
  components: {
    Navbar,
  },
};
</script>

<style scoped>
h2 {
  font-size: 2em;
  color: #6aabe7;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  flex-wrap: wrap;
}
</style>