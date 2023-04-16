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
  background-color: rgba(255,255,255,0.13);
  border: 2px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 40px rgba(8,7,16,0.6);
  backdrop-filter: blur(10px);
}

@media only screen and (max-width: 500px) {
  .bookListPage {
    width: 90%;
  }
}
</style>