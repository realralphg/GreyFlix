<template>
  <div class="movie__section container">
    <div style="font-size: 30px" class="text-white head q-pa-sm">
      {{ name }}
    </div>
    <div class="row-posts">
      <img
        v-for="movie in movies"
        :key="movie.id"
        :class="largeRow ? 'large-poster' : 'row-poster'"
        :src="movie.image"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["movies", "largeRow", "name"],
};
</script>

<style scoped></style>
