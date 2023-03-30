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
            class=""
            :to="{
              name: 'audio.content',
              params: { contentid: music.id, slug: music.slug },
            }"
          >
            <div class="overlay">
              <img class="" :src="music.cover_url" alt="" />
            </div>
          </router-link>

          <div class="row justify-between items-center top_det">
            <p>{{ music.title }}</p>
            <Player
              :playing="playing"
              :playingMusic="music"
              :music="music.stream"
            />
            <!-- <Playermix :playingMusic="music" :music="music.stream" /> -->
          </div>
        </div>
        <!-- <p class="q-pa-sm info">{{ music.info }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Player from "../components/Player.vue";
import Playermix from "../components/Playermix.vue";
export default {
  props: ["musics"],
  components: {
    Player,
    Playermix,
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60%;
  color: #ffffff;
}

.overlay {
  position: relative;
}
.overlay::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(21, 21, 21, 0.5);
}
.row-posts {
  padding: 1.5rem 0;
}
/*
.movie__section {
  margin: 2rem auto;
} */
.music_hold {
  background: #151515;
  padding: 0.65rem;
  /* height: 270px; */
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
/* p.info {
  margin-top: 1rem;
} */
</style>
