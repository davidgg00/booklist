<template>
  <div id="wrapperLogin">

    <form id="login" @submit.prevent="login">
      <h3>BooksList</h3>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <button>Login</button>
      <router-link to="/register">Register</router-link>
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
form{
    height: 520px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    line-height: 42px;
    text-align: center;
    color: #6aabe7;
}
label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}

input:focus {
  outline: none;
  border: thin solid #015b7e;
}

button{
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
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

@media (max-width: 500px) {
  #login {
    width: 80%;
  }
}
</style>
