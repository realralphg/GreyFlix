<template>
  <div class="movie__section container">
    <div style="font-size: 30px" class="text-white head q-pa-sm">
      {{ name }}
    </div>
    <div class="row-posts">
      <div v-if="skeleton" class="skeleton no-wrap row items-center">
        <q-skeleton v-for="n in 5" :key="n" width="150px" height="200px" />
      </div>
      <div
        v-for="audio in audios"
        :key="audio.id"
        :class="
          largeRow ? 'large-poster poster_wrap' : 'row-poster poster_wrap'
        "
      >
        <router-link
          style="display: flex; width: 100%"
          class="poster"
          :to="{
            name: 'audio.content',
            params: { contentid: audio.id, slug: audio.slug },
          }"
        >
          <img :src="audio.cover_url" alt="" />

          <div class="drop_wrap">
            <img :src="audio.cover_url" alt="" />
            <div class="btn_wraps">
              <div class="left">
                <q-btn round color="primary" icon="shopping_cart" />
                <q-btn round color="secondary" icon="navigation" />
                <q-btn
                  round
                  color="amber"
                  glossy
                  text-color="black"
                  icon="layers_clear"
                />
              </div>

              <div class="right">
                <q-btn round color="black" icon="my_location" />
              </div>
            </div>
            <p>97% Match <span class="square">18+</span> 2 Seasons</p>
          </div>

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

<style scoped>
.poster_wrap {
  position: relative;
}

.poster {
  /* display: inline-block; */
  height: auto;
  padding: 2px;
  cursor: pointer;
}
.drop_wrap {
  visibility: hidden;
  transition: all 0.5s ease-in-out;
  position: absolute;
  display: block;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: auto;
  padding: 10px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.6);
  opacity: 0;
  background: brown;
}

.drop_wrap .btn_wraps {
  display: flex;
  justify-content: space-between;
}

.poster:hover .drop_wrap {
  visibility: visible;
  transform: scale(1.3);
}
</style>
