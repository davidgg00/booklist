<template>
  <div class="bookListPage">
    <BookList />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
export default {
  components: {
    BookList,
  },
};
</script>

<style scoped>
.bookListPage {
  padding-bottom: 10px;
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

@media only screen and (max-width: 500px) {
  .bookListPage {
    width: 90%;
  }
}
</style>