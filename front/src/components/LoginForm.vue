<template>
  <div id="wrapperLogin">
    <div id="login">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button @click="login">Login</button>
      <router-link to="/register">Register</router-link>
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
      email: "",
      password: "",

      async login() {
        const { ok, message } = await store.dispatch("loginUser", {
          email: this.email,
          password: this.password,
        });

        if (!ok) {
          Swal.fire("Error", message, "error");
        } else {
          console.log("logueado");
          router.push({ name: "Home" });
        }
      },
    };
  },
};
</script>

<style scoped>
#wrapperLogin {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login {
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
