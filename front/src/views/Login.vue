<template>
  <div class="home">
    <h2>LoveBooks</h2>
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Home",
  components: {
    LoginForm,
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