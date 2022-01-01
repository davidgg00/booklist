<template>
  <div class="wrapper">
    <form action="">
      <input
        type="search"
        name=""
        id=""
        @input="searchBooks"
        v-model="searchValue"
        placeholder="Type autor, book name....."
        @submit.prevent=""
      />
      <button type="submit" class="search-button">
        <img src="../assets/search.png" alt="" />
      </button>
    </form>
    <img :src="waitingSearch" alt="" v-if="!searchValue" />
  </div>
</template>

<script>
import { ref } from "vue";
import googleBooksApi from "../../api/googleBooksApiConnection";
import waitingSearch from "@/assets/waitingSearch.svg";
export default {
  emits: ["booksResult"],
  setup(_, { emit }) {
    const searchValue = ref("");
    const searchBooks = async () => {
      try {
        if (searchValue.value.trim()) {
          await googleBooksApi
            .get("/volumes", {
              params: {
                q: searchValue.value,
                maxResults: 6,
              },
            })
            .then((response) => {
              emit("booksResult", response.data.items);
            });
        } else {
          emit("booksResult", null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      waitingSearch,
      searchBooks,
      searchValue,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: row;
  width: 50%;
  max-width: 500px;
}

input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 100px;
  outline: none;
}

img {
  margin-top: 50px;
  max-width: 250px;
}

.search-button {
  background: transparent;
  border: none;
  outline: none;
  margin-left: -33px;
}

.search-button img {
  width: 20px;
  height: 20px;
  object-fit: cover;
  margin: 0 auto;
}
</style>