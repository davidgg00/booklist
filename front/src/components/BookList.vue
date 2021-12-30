<template>
  <div id="status">
    <p
      :class="selectedStatus === 'want to read' ? 'active' : ''"
      @click="selectedStatus = 'want to read'"
    >
      Want to Read
    </p>
    <p
      :class="selectedStatus === 'reading' ? 'active' : ''"
      @click="selectedStatus = 'reading'"
    >
      Reading
    </p>
    <p
      :class="selectedStatus === 'read' ? 'active' : ''"
      @click="selectedStatus = 'read'"
    >
      Read
    </p>
  </div>
  <form>
    <input
      type="search"
      placeholder="Search for a book"
      @input="searchBook"
      v-model="searchValue"
    />
  </form>

  <div class="booksList" v-if="selectedStatus === 'read'">
    <div class="error" v-if="booksRead_isnull">
      <p>No books to show</p>
    </div>
    <Book
      v-for="book in booksRead"
      :book="book"
      :key="book.id"
      @click="
        showModal = true;
        bookSelected = book;
      "
    ></Book>
  </div>
  <div class="booksList" v-else-if="selectedStatus === 'reading'">
    <div class="error" v-if="booksReading_isnull">
      <p>No books to show</p>
    </div>
    <Book
      v-for="book in booksReading"
      :book="book"
      :key="book.id"
      @click="
        showModal = true;
        bookSelected = book;
      "
    ></Book>
  </div>
  <div class="booksList" v-else-if="selectedStatus === 'want to read'">
    <div class="error" v-if="booksWantToRead_isnull">
      <p>No books to show</p>
    </div>
    <Book
      v-for="book in booksWantToRead"
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
      @refreshBookList="getUserBooks()"
    />
  </transition>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import backendApi from "../../api/backendApiConnection";
import { useStore } from "vuex";
import googleBooksApi from "../../api/googleBooksApiConnection";
import Book from "@/components/Book.vue";
import ModalBook from "@/components/ModalBook.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Book,
    ModalBook,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const booksWantToRead = ref([]);
    const booksReading = ref([]);
    const booksRead = ref([]);
    const searchValue = ref("");
    const booksWantToRead_isnull = ref(false);
    const booksRead_isnull = ref(false);
    const booksReading_isnull = ref(false);

    const selectedStatus = ref("want to read");
    const showModal = ref(false);
    const bookSelected = ref(null);

    function searchBook() {
      if (selectedStatus.value === "want to read") {
        for (const book of booksWantToRead.value) {
          if (
            book.volumeInfo.title
              .toLowerCase()
              .includes(searchValue.value.toLowerCase())
          ) {
            book.show = true;
          } else {
            book.show = false;
          }
        }
      } else if (selectedStatus.value === "reading") {
        for (const book of booksReading.value) {
          if (
            book.volumeInfo.title
              .toLowerCase()
              .includes(searchValue.value.toLowerCase())
          ) {
            book.show = true;
          } else {
            book.show = false;
          }
        }
      } else if (selectedStatus.value === "read") {
        for (const book of booksRead.value) {
          if (
            book.volumeInfo.title
              .toLowerCase()
              .includes(searchValue.value.toLowerCase())
          ) {
            book.show = true;
          } else {
            book.show = false;
          }
        }
      }
    }

    async function getUserBooks() {
      let userId = route.params.id
        ? route.params.id
        : store.getters.getUser._id;
      const { data } = await backendApi.get("userBooks/get/" + userId, {
        headers: {
          "x-token": localStorage.getItem("idToken"),
        },
      });
      booksRead.value = [];
      booksReading.value = [];
      booksWantToRead.value = [];
      for (const book of data.userBooks) {
        if (book.status === "read") {
          await googleBooksApi
            .get("/volumes/" + book.bookId)
            .then((response) => {
              response.data.status = book.status;
              response.data.show = true;
              response.data.volumeInfo.description
                ? (response.data.volumeInfo.description =
                    response.data.volumeInfo.description.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    ))
                : "";
              booksRead.value.push(response.data);
            });
        } else if (book.status === "reading") {
          await googleBooksApi
            .get("/volumes/" + book.bookId)
            .then((response) => {
              response.data.status = book.status;
              response.data.show = true;
              response.data.volumeInfo.description
                ? (response.data.volumeInfo.description =
                    response.data.volumeInfo.description.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    ))
                : "";
              booksReading.value.push(response.data);
            });
        } else if (book.status === "want to read") {
          await googleBooksApi
            .get("/volumes/" + book.bookId)
            .then((response) => {
              response.data.status = book.status;
              response.data.show = true;
              response.data.volumeInfo.description
                ? (response.data.volumeInfo.description =
                    response.data.volumeInfo.description.replace(
                      /(<([^>]+)>)/gi,
                      ""
                    ))
                : "";
              booksWantToRead.value.push(response.data);
            });
        }
        console.log("terminó");
      }
      booksRead.value.length === 0 ? (booksRead_isnull.value = true) : "";
      booksReading.value.length === 0 ? (booksReading_isnull.value = true) : "";
      booksWantToRead.value.length === 0
        ? (booksWantToRead_isnull.value = true)
        : "";
    }
    onBeforeMount(getUserBooks);
    return {
      booksRead,
      booksReading,
      booksWantToRead,
      getUserBooks,
      selectedStatus,
      showModal,
      bookSelected,
      searchValue,
      searchBook,
      booksWantToRead_isnull,
      booksReading_isnull,
      booksRead_isnull,
    };
  },
};
</script>

<style scoped>
.bookListPage {
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
#status {
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 40%;
}

#status p {
  cursor: pointer;
  padding: 10px;
  color: gray;
}

.active {
  color: black !important;
  font-weight: 600;
}

form {
  width: 50%;
  margin-right: auto;
  padding: 0 40px;
}

input {
  width: 80%;
  float: left;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.booksList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 70px;
  justify-items: center;
  grid-row-gap: 70px;
  width: 100%;
}

.error {
  margin-top: -50px;
}
</style>