<template>
  <div class="movie__section container">
    <div style="font-size: 30px" class="text-white head q-pa-sm">
      Best Music
    </div>

    <div class="row-posts">
      <div v-for="music in musics" :key="music.id" class="music_hold">
        <div class="music_top">
          <router-link
            style="display: flex; width: 200px"
            :to="{
              name: 'audio.content',
              params: { contentid: music.id, slug: music.slug },
            }"
          >
            <img class="" :src="music.cover_url" alt="" />
          </router-link>

          <div class="row justify-between items-center top_det">
            <p>{{ music.title }}</p>
            <Player
              :playing="playing"
              :playingMusic="music"
              :music="music.stream"
            />
          </div>
        </div>
        <p class="q-pa-sm">{{ music.info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "../components/Player.vue";
export default {
  props: ["musics"],
  components: {
    Player,
  },

  data() {
    return {
      playing: false,
    };
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 15.8315px;
  line-height: 24px;
  color: #ffffff;
}

.movie__section {
  margin: 2rem auto;
}
.music_hold {
  background: #151515;
  padding: 0.65rem;
  height: 290px;
}

.music_hold img {
  width: 200px;
}

.music_top {
  position: relative;
  color: #ffffff;
}
.top_det {
  position: absolute;
  bottom: 10%;
  padding: 0.45rem;
  width: 100%;
}

.top_det i {
  background: rgba(56, 56, 56, 0.22);
  border: 0.979656px solid #ffffff;
  backdrop-filter: blur(8.82797px);
  border-radius: 91.6247px;
  width: 30px;
  height: 30px;
  font-weight: 700;
  font-size: 15.8315px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
