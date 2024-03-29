<template>
  <div class="homeWrapper">
    <div class="home">
      <FormSearchBook @booksResult="requestResult" />

    <div class="booksList">
      <Book
        v-for="book in books"
        :book="book"
        :key="book.id"
        @click="
          showModal = true;
          bookSelected = book;
        "
      ></Book>
    </div>

    <transition name="modal">
      <ModalBook
        :book="bookSelected"
        v-if="showModal"
        @close="
          showModal = false;
          bookSelected = false;
        "
        @addBookUser="addBookUser"
      />
    </transition>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FormSearchBook from "@/components/FormSearchBook.vue";
import Book from "@/components/Book.vue";
import ModalBook from "@/components/ModalBook.vue";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import backendApi from "../../api/backendApiConnection";
export default {
  components: {
    FormSearchBook,
    Book,
    ModalBook,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const books = ref([]);
    const bookSelected = ref(null);
    const showModal = ref(false);

    return {
      async addBookUser() {
        try {
          await Swal.fire({
            title: "Are you sure?",
            text: "You will add this book to your booklist",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!",
          }).then(async (result) => {
            if (result.value) {
              const { data } = await backendApi.post(
                "userBooks/add",
                {
                  userEmail: store.getters.getUser.email,
                  bookId: bookSelected.value.id,
                  status: "want to read",
                },
                {
                  headers: {
                    "x-token": localStorage.getItem("idToken"),
                  },
                }
              );
              if (data.message === "User book added") {
                Swal.fire(
                  "Added!",
                  "Book added to your booklist",
                  "success"
                ).then(() => {
                  showModal.value = false;
                  bookSelected.value = false;
                });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
      async logout() {
        localStorage.removeItem("idToken");
        router.push({ name: "Login" });
      },
      requestResult(request) {
        books.value = request;
        for (const book of books.value) {
          book.show = true;
        }
      },
      booksResult: [],
      books,
      showModal,
      bookSelected,
    };
  },
};
</script>

<style scoped>
.home {
  justify-content: space-between;
  background-color: rgba(255,255,255,0.13);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  backdrop-filter: blur(10px);
  width: 95%;
  margin: 100px auto;
}

.booksList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 70px;
  justify-items: center;
  grid-row-gap: 70px;
}

@media only screen and (max-width: 1100px) {
  .booksList {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 700px) {
  .booksList {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>