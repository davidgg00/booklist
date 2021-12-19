<template>
  <div class="home">
    <h2>LoveBooks - Home</h2>
    <button @click="logout">LogOut</button>
  </div>
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
.home {
  margin-top: 100px;
}

.home h2 {
  font-size: 2em;
  color: #6aabe7;
}
</style>