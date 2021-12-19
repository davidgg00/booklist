<template>
  <div id="wrapperRegister">
    <div id="register">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button @click="registerUser">Register</button>
      <a href="#">Login</a>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      name: "",
      email: "",
      password: "",
      async registerUser() {
        const { ok, message } = await store.dispatch("registerUser", {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        if (!ok) {
          Swal.fire("Error", message, "error");
        } else {
          Swal.fire("Success", "User registered.", "success").then(() => {
            router.push({ name: "Login" });
          });
        }
      },
    };
  },
};
</script>

<style scoped>
#wrapperRegister {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#register {
  width: 200px;
  height: 200px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-radius: 10px;
}
label {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}
input {
  width: 100%;
  height: 2em;
  font-size: 1em;
  margin-bottom: 1em;
}
button {
  width: 100%;
  height: 2em;
  font-size: 1em;
  border-radius: 5px;
  background: #e8feff;
  margin-bottom: 10px;
}
</style>
