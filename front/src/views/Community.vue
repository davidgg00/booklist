<template>
  <div class="communityPage">
    <h3>Search your Friends!</h3>
    <form>
      <input
        type="search"
        placeholder="Search a friend by name"
        @input="requestResult"
        v-model="searchValue"
      />
    </form>
    <div class="usersList">
      <User
        v-for="user in users"
        :user="user"
        :key="user._id"
        @click="this.$router.push('/user/' + user._id)"
      ></User>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import backendApi from "../../api/backendApiConnection";
import User from "@/components/User.vue";
export default {
  components: {
    User,
  },
  setup() {
    const users = ref([]);
    const searchValue = ref("");
    async function getUsers() {
      const response = await backendApi.get("/user/getAllUsers");
      users.value = response.data;
    }
    const requestResult = async () => {
      getUsers().then(() => {
        users.value = users.value.filter((user) =>
          user.name.toLowerCase().includes(searchValue.value.toLowerCase())
        );
      });
    };
    onBeforeMount(getUsers);
    return {
      users,
      searchValue,
      requestResult,
      getUsers,
    };
  },
};
</script>

<style scoped>
.communityPage {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 100%;
  border: 1px solid black;
  background: #e9e9e9;
}

input {
  width: 100%;
  float: left;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.usersList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 70px;
  justify-items: center;
  grid-row-gap: 70px;
  width: 100%;
}

@media (max-width: 1250px) {
  .usersList {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 850px) {
  .usersList {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 450px) {
  .communityPage {
    width: 100%;
  }
}
</style>