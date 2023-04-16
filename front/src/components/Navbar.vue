<template>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul>
    <router-link to="/">Home</router-link>
    <router-link to="/booklist">BookList</router-link>
    <router-link to="/community">Community</router-link>
    <a href="#" @click="logout">Logout</a>
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
  padding: 5px;
  margin: 30px;
  cursor: pointer;
  color: white;
  text-decoration: none;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}

ul > a:hover {
  border-bottom: 1px solid white;
}

li a {
  display: block;
  padding: 20px 20px;
  border-right: 1px solid #f4f4f4;
  text-decoration: none;
}

li a:hover,
.menu-btn:hover {
  background-color: #f4f4f4;
  border-bottom: 1px solid white;
}

ul {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
}

.menu-icon {
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.menu-icon .navicon {
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;
}

.menu-icon .navicon:before,
.menu-icon .navicon:after {
  background: #333;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.menu-icon .navicon:before {
  top: 5px;
}

.menu-icon .navicon:after {
  top: -5px;
}

.menu-btn {
  display: none;
}

.menu-btn:checked ~ ul {
  max-height: 440px;
}

.menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

@media (min-width: 769px) {
  /* li {
    float: left;
  } */
  li a {
    padding: 20px 30px;
  }
  ul {
    clear: none;
    float: right;
    max-height: none;
  }
  .menu-icon {
    display: none;
  }
}

@media (max-width: 769px) {
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color:gray;
    position: absolute;
    top: 75px;
    right: 0px;
    z-index: 8888;
  }
  .menu-icon {
    margin-left: auto;
  }
}
</style>