<template>
  <div class="home">
    <FormSearchBook @booksResult="requestResult" />

    <div class="booksList">
      <Book v-for="book in books" :book="book" :key="book.id"></Book>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormSearchBook from "@/components/FormSearchBook.vue";
import Book from "@/components/Book.vue";
export default {
  components: {
    FormSearchBook,
    Book,
  },
  setup() {
    const router = useRouter();
    const books = ref([]);
    return {
      async logout() {
        localStorage.removeItem("idToken");
        router.push({ name: "Login" });
      },
      requestResult(request) {
        books.value = request;
      },
      booksResult: [],
      books,
    };
  },
};
</script>

<style scoped>
.home {
  margin-top: 100px;
  justify-content: space-between;
}

.booksList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 70px;
  justify-items: center;
  grid-row-gap: 70px;
}
</style>