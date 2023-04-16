<template>
  <div class="user">
    <div class="user-info">
      <!-- <img v-if="user.avatar" :src="user.avatar" alt="" /> -->
      <img
        src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png"
        alt=""
      />
      <div class="user-info-text">
        <h3 v-if="user">{{ user.name }}</h3>
        <p v-if="user">{{ user.email }}</p>
      </div>
    </div>
    <div class="user-books-list">
      <BookList />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import backendApi from "../../api/backendApiConnection";
import BookList from "@/components/BookList.vue";
export default {
  components: {
    BookList,
  },
  setup() {
    const route = useRoute();
    const user = ref(null);
    const userBooks = ref([]);
    onBeforeMount(() => getDataUser());
    async function getDataUser() {
      const { data } = await backendApi.get(
        "/user/getDataUser/" + route.params.id
      );
      user.value = data;
    }

    return {
      getDataUser,
      user,
      userBooks,
    };
  },
};
</script>

<style scoped>
.user {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.user-info {
  background: #f5cfef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  border: 1px solid black;
  border-radius: 10px;
  word-wrap: break-word;
}

.user-books-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 78%;
  height: 100%;
  background-color: rgba(255,255,255,0.13);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  backdrop-filter: blur(10px);
  padding-bottom: 10px;
}

img {
  margin-top: 5px;
  width: 150px;
  height: 150px;
}

@media (max-width: 1250px) {
  .user-books-list {
    width: 80%;
  }

  .user-info {
    width: 40%;
  }

  .user-info p {
    font-size: 0.8em;
  }
}

@media (max-width: 600px) {
  .user-info {
    width: 60%;
  }
}

@media (max-width: 400px) {
  .user-info {
    width: 70%;
  }
}
</style>