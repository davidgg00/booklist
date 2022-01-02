<template>
  <div id="wrapperRegister">
    <form id="register" @submit.prevent="registerUser">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button>Register</button>
      <a href="#">Login</a>
    </form>
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
          console.log(ok);
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
  min-width: 200px;
  min-height: 200px;
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
  display: inline-block;
  width: 100%;
  height: 2em;
  font-size: 1em;
  margin-bottom: 1em;
  margin: 5px auto;
  padding: 15px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
button {
  width: 100%;
  height: 2em;
  font-size: 1em;
  border-radius: 5px;
  background: #e8feff;
  margin-bottom: 10px;
}

input:focus {
  outline: none;
  border: thin solid #015b7e;
}

button {
  width: 100%;
  height: 50px;
  background: #015b7e;
  border: none;
  outline: none;
  display: block;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1em;
  transition: all 0.2s ease;
  color: #fff;
}

button:hover {
  background: #014965;
}

#login a {
  color: #015b7e;
  text-decoration: none;
}

#login a:hover {
  text-decoration: underline;
  color: black;
}
</style>
