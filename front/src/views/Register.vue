<template>
  <div class="home">
    <h2>LoveBooks</h2>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
export default {
  name: "Register",
  components: {
    RegisterForm,
  },
};
</script>

<style>
.home {
  margin-top: 100px;
}

.home h2 {
  font-size: 2em;
  color: #6aabe7;
}
</style>