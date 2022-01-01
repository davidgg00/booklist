<template>
  <Header v-if="$route.name !== 'Login' && $route.name !== 'Register'"></Header>
  <!-- <transition name="fade" mode="out-in">
    <router-view />
  </transition> -->

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
body {
  background-color: #eff2f1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-enter-active,
.route-leave-active {
  transition: all 300ms ease-in-out;
}
</style>
