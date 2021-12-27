<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="card-info">
          <h2 @click="getUserBooks">{{ book.volumeInfo.title }}</h2>
          <img
            v-if="book.volumeInfo.imageLinks"
            :src="book.volumeInfo.imageLinks.thumbnail"
            alt=""
          />
          <img
            v-else
            src="https://via.placeholder.com/128x193.png?text=No+image"
            alt=""
          />
          <p v-if="book.volumeInfo.authors">
            Author: {{ book.volumeInfo.authors[0] }}
          </p>
          <p v-else>No author</p>
          <p>Publisher: {{ book.volumeInfo.publisher }}</p>
          <p>Published date: {{ book.volumeInfo.publishedDate }}</p>
          <p>Number of pages: {{ book.volumeInfo.pageCount }}</p>
        </div>

        <div class="card-description">
          <h3>Book Description</h3>
          <p v-if="book.volumeInfo.description">
            {{ book.volumeInfo.description }}
          </p>
          <p v-else>No description</p>
          <div class="wrapper-buttons">
            <a @click="$emit('addBookUser')" v-if="!bookInList"
              >Add to BookList</a
            >
            <select
              name="status"
              v-else-if="book.status"
              @change="changeStatus($event)"
            >
              <option
                value="want to read"
                :selected="book.status === 'want to read'"
              >
                Want to read
              </option>
              <option value="reading" :selected="book.status === 'reading'">
                Reading
              </option>
              <option value="read" :selected="book.status === 'read'">
                Read
              </option>
            </select>
            <a v-else>Book is added</a>
            <a :href="book.volumeInfo.previewLink" target="_blank"
              >Buy this book</a
            >
          </div>
        </div>

        <span id="close" @click="$emit('close')">x</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { ref } from "vue";
import backendApi from "../../api/backendApiConnection";
export default {
  emits: ["refreshBookList", "close"],
  props: {
    book: {
      type: Object,
      default: () => ({
        volumeInfo: {
          title: "",
          authors: "",
          categories: [""],
          imageLinks: {
            thumbnail: "",
          },
        },
      }),
    },
  },
  mounted() {
    this.getUserBooks();
  },
  setup(props, { emit }) {
    const store = useStore();
    const userBooks = ref([]);
    const bookInList = ref(false);
    return {
      async changeStatus(event) {
        const status = event.target.value;
        await backendApi
          .post(
            "userBooks/update",
            {
              userEmail: store.getters.getUser.email,
              bookId: props.book.id,
              status,
            },
            {
              headers: {
                "x-token": localStorage.getItem("idToken"),
              },
            }
          )
          .then(({ data }) => {
            if (data.userBook) {
              Swal.fire({
                title: "Success!",
                text: "Book status has been changed",
                icon: "success",
                confirmButtonText: "Ok",
              });
              emit("refreshBookList");
              this.getUserBooks(props.book);
            } else {
              Swal.fire({
                title: "Error!",
                text: "Book status has not been changed",
                icon: "error",
                confirmButtonText: "Ok",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      async getUserBooks(book = this.book) {
        const { data } = await backendApi.get(
          "userBooks/get/" + store.getters.getUser.email,
          {
            headers: {
              "x-token": localStorage.getItem("idToken"),
            },
          }
        );
        userBooks.value = data.userBooks;
        for (const userBook of userBooks.value) {
          if (userBook.bookId === book.id) {
            bookInList.value = true;
          }
        }
      },
      userBooks,
      bookInList,
    };
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

#close {
  margin-left: auto;
  font-size: 30px;
  cursor: pointer;
  margin-top: -15px;
}

.modal-container {
  height: 70%;
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 50px;
  background: #ccc;
  display: flex;
  justify-content: space-around;
}

.card-info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background: white;
  border: 1px solid black;
  width: 35%;
  height: 80%;
  margin-top: 20px;
}

.card-info img {
  width: 110px;
  height: 160px;
  object-fit: cover;
  margin: 0 auto;
}

select {
  padding: 7px 10px 7px 12px;
  text-align: center;
  border-radius: 5px;
  background: white;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
}

.card-description {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid black;
  width: 60%;
  padding: 0 20px;
  height: 80%;
  margin-top: 20px;
}

.card-description h3 {
  text-align: left;
}

.card-description p {
  height: 70%;
  max-height: 70%;
  overflow: scroll;
  overflow-x: hidden;
}

.wrapper-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  justify-content: space-around;
  align-items: center;
}

.wrapper-buttons a {
  color: white;
  background-color: #6aabe7;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>