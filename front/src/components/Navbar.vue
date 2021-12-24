<template>
  <ul>
    <router-link to="/">Home</router-link>
    <router-link to="/">BookList</router-link>
    <router-link to="/about">Community</router-link>
    <a href="#" @click="logout">Logout</a>
    <!--     <li>Home</li>
    <li>BookList</li>
    <li>Community</li>
    <li>Logout</li> -->
  </ul>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      async logout() {
        localStorage.removeItem("idToken");
        router.push({ name: "Login" });
      },
    };
  },
};
</script>

<style scoped>
a {
  list-style: none;
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
  cursor: pointer;
  color: white;
  background-color: #6aabe7;
  text-decoration: none;
}
</style>