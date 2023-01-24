<template>
  <main>
    <div class="div row items-center no-wrap q-gutter-x-md">
      <div class="left">
        <img src="/images/recent/1.jpg" alt="" />
      </div>

      <!-- {{ song.title }} -->

      <div class="right">
        <div class="text-h5 text-white text-weight-bold">{{ song.title }}</div>
        <!-- <div class="text-h5 text-white text-weight-bold">Daily Trending</div> -->
        <p class="text-white q-my-md">
          Keep up with trends! Here are some trending music on Boomplay. Listen
          to this playlist and don't forget to add to your favourites.
        </p>

        <div class="q-gutter-sm">
          <q-btn color="teal" @click="toggleAudio" label="Play" />
          <q-btn color="teal" icon="fa-solid fa-heart" />
        </div>
      </div>
    </div>

    <div class="list">
      <div class="row items-center justify-between">
        <div class="subtitle2 text text-white">
          Daily Trending <cite>(103)</cite>
        </div>

        <div class="input">
          <div class="input_wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search within tracks" />
          </div>
        </div>
      </div>

      <div class="items">
        <ul>
          <li class="title_li">
            <div class="left_side">
              <div class="serialnum">$</div>
            </div>

            <div class="">
              <div class="artist_name">Title</div>
            </div>

            <time>Time</time>
          </li>
        </ul>
        <ul>
          <li v-for="n in 10" :key="n">
            <div class="left_side">
              <div class="serialnum">1</div>
              <i class="fa-solid play fa-play"></i>
            </div>

            <div class="center_place">
              <div class="songname">He is able</div>
              <div class="artist_name">Pastor Nath</div>
              <div class="actions">
                <button class="add">
                  <i class="fa-solid fa-plus"></i>
                </button>
                <button class="share">
                  <i class="fa-solid fa-share"></i>
                </button>
                <button class="download">
                  <i class="fa-solid fa-download"></i>
                </button>
              </div>
            </div>

            <time>2.00</time>
          </li>
        </ul>
      </div>
    </div>
  </main>

  <q-dialog v-model="playsong">
    <q-card class="q-mt-xl">
      <MusicPlayer />
    </q-card>
  </q-dialog>
</template>

<script>
import MusicPlayer from "../components/MusicPlayer.vue";
export default {
  data() {
    return {
      song: {},
      playsong: false,
    };
  },

  components: {
    MusicPlayer,
  },
  watch: {
    "$route.params.slug": {
      handler(slug) {
        if (this.$route.name === "audio.content") {
          this.getContent(slug);
        }
      },
      immediate: true,
    },
  },
  methods: {
    getContent(slug) {
      this.skeleton = true;
      this.$api
        .get(`/audio/stories/${slug}`)
        .then(({ data }) => {
          this.song = data.data;
          console.log(data);
        })
        .catch((err) => {});
    },

    toggleAudio(song) {
      this.playsong = true;
      // this.playingRadio = !this.playingRadio;

      // var player = new Howl({
      //   src: song.stream,
      //   html5: true,
      //   autoplay: false,
      //   loop: false,
      //   volume: 0.9,
      //   preload: false,
      // });
      // if (this.playingRadio) {
      //   player.play();
      //   console.log("play");
      // } else {
      //   Howler.unload();
      //   console.log("paused >>>");
      // }
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
}

i {
  color: white;
}

.div,
.list {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 0 0;
}
.input_wrap {
  display: flex;
  align-items: center;
}

.list .text {
  font-size: 21px;
  line-height: 23px;
  word-break: break-word;
  word-wrap: break-word;
  font-weight: 700;
}

.text cite {
  opacity: 0.6;
}
.input_wrap {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 36px 8px 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.24);
}

.input_wrap input {
  background: transparent;
  border: none;
}
.input_wrap i {
  margin-right: 1rem;
}

.title_li .serialnum {
  opacity: 0.6;
}
.title_li .artist_name {
  opacity: 0.6;
}
.title_li time {
  opacity: 0.6;
}

.items {
  color: white;
  margin-top: 2rem;
  padding: 0rem 0 2rem;
  font-size: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.items li {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}
.items .center_place {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: flex-end;
}

.items .left_side {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.items .actions {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.items time {
  text-align: right;
}

.items .artist_name {
  text-align: center;
}

.items button {
  background: none;
  border: 1px solid white;
  margin: 0 0.5rem;
  width: 20px;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  opacity: 0.6;
}

.items .play {
  display: none;
}
</style>
