<template>
  <div class="book" v-if="book.show">
    <div class="wrapperDescriptions">
      <div class="book-image">
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
      </div>
      <div class="book-info">
        <div class="book-info-title">
          <h2 v-if="book.volumeInfo.title.length < 25">
            {{ book.volumeInfo.title }}
          </h2>
          <h2 v-else>{{ book.volumeInfo.title.substring(0, 25) }}...</h2>
        </div>
        <div class="book-info-author">
          <h3
            v-if="
              book.volumeInfo.authors && book.volumeInfo.authors[0].length > 25
            "
          >
            {{ book.volumeInfo.authors[0].substring(0, 25) }}...
          </h3>
          <h3 v-else-if="book.volumeInfo.authors">
            {{ book.volumeInfo.authors[0] }}
          </h3>
          <h3 v-else>No author</h3>
        </div>
      </div>
    </div>
    <div class="book-categories">
      <ul>
        <li
          v-for="category in book.volumeInfo.categories.slice(0, 1)"
          :key="category"
        >
          <p v-if="category.length > 25">{{ category.substring(0, 25) }}</p>
          <p v-else>{{ category }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({
        volumeInfo: {
          title: "",
          authors: "",
          categories: ["test"],
          imageLinks: {
            thumbnail: "",
          },
        },
      }),
    },
  },
};
</script>

<style scoped>
.book {
  display: flex;
  flex-wrap: wrap;
  background: #f5cfef;
  position: relative;
  max-width: 300px;
  border: 1px solid black;
  border-radius: 20px;
  height: 225px;
  cursor: pointer;
}

.book:nth-child(2n) {
  background: #e1d3d8;
}

.book:nth-child(3n) {
  background: #efe5dd;
}

.book:nth-child(4n) {
  background: #daffd7;
}

.book:nth-child(5n) {
  background: #f5d7f4;
}

.book:nth-child(6n) {
  background: #f0fbd5;
}

.wrapperDescriptions {
  display: flex;
  width: 100%;
  height: 70%;
}

.book-info {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.book-info-title h2 {
  margin: 10px 0px 0px 5px;
}

.book-info h3 {
  color: #8c8c8c;
  font-weight: 300;
}

.book-info-description {
  display: flex;
}

.book-image {
  display: flex;
  width: 120px;
}

.book-image img {
  width: 90px;
  height: 140px;
}

.book img {
  position: absolute;
  top: -30px;
  left: 20px;

  width: 90px;
}

ul {
  list-style: none;
}

li {
  background: #c6bbeb;
  padding: 10px;
  border-radius: 25px;
}

li p {
  padding: 0;
  margin: 0;
}

.book-categories {
  display: flex;
  flex-direction: column;
}

.book-categories li {
  word-break: break-all;
}
</style>