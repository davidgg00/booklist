<template>
  <div class="user">
    <div class="wrapperDescriptions">
      <div class="user-image">
        <img v-if="user.picture" :src="user.picture" alt="" />
        <img
          v-else
          src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/user-male-icon.png"
          alt=""
        />
      </div>
      <div class="user-info">
        <div class="user-info-name">
          <h2 v-if="user.name.length < 25">
            {{ user.name }}
          </h2>
          <h2 v-else>{{ user.name.substring(0, 25) }}...</h2>
        </div>
        <div class="user-info-email">
          <h3 v-if="user.email.length < 25">
            {{ user.email }}
          </h3>
          <h3 v-else>{{ user.email.substring(0, 25) }}...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        email: "",
        name: "",
      }),
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  flex-wrap: wrap;
  background: #f5cfef;
  position: relative;
  max-width: 300px;
  min-width: 300px;
  border: 1px solid black;
  border-radius: 20px;
  height: 200px;
  cursor: pointer;
}

.user:nth-child(2n) {
  background: #e1d3d8;
}

.user:nth-child(3n) {
  background: #efe5dd;
}

.user:nth-child(4n) {
  background: #daffd7;
}

.user:nth-child(5n) {
  background: #f5d7f4;
}

.user:nth-child(6n) {
  background: #f0fbd5;
}

.wrapperDescriptions {
  padding-top: 10px;
  display: flex;
  width: 100%;
  height: 70%;
}

.user-info {
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.user-info-name h2 {
  margin: 10px 0px 0px 5px;
}

.user-info-email {
  word-wrap: break-word;
}

.user-info h3 {
  color: #8c8c8c;
  font-weight: 300;
}

.user-image {
  display: flex;
  width: 120px;
}

.user-image img {
  width: 90px;
  height: 90px;
}

.user img {
  position: absolute;
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
</style>