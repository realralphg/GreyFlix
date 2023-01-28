<template>
  <div class="movie__section container">
    <div style="font-size: 30px" class="text-white head q-pa-sm">
      {{ name }}
    </div>
    <div class="row-posts">
      <div v-if="skeleton" class="skeleton row items-center">
        <q-skeleton v-for="n in 5" :key="n" width="150px" height="200px" />
      </div>
      <div
        v-for="audio in audios"
        :key="audio.id"
        :class="largeRow ? 'large-poster' : 'row-poster'"
      >
        <router-link
          style="display: flex; width: 200px"
          :to="{
            name: 'audio.content',
            params: { contentid: audio.id, slug: audio.slug },
          }"
        >
          <img :src="audio.cover_url" alt="" />
          <!-- <img src="/images/recent/2.jpg" alt="" /> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// :src="audio.cover_url ? audio.cover_url : '/images/recent/2.jpg'"

export default {
  props: ["audios", "largeRow", "name", "skeleton"],
};
</script>

<style scoped></style>
