<template>
  <div v-if="loading" class="loading">
    <q-spinner-bars size="4rem" color="purple" />
  </div>
  <main v-if="!loading">
    <div class="div row items-center no-wrap q-gutter-x-md">
      <div class="left">
        <img :src="song.cover_url" alt="" />
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
          <!-- <q-btn color="teal" label="Play" /> -->
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
            <input
              type="text"
              v-model="text"
              placeholder="Search within tracks"
            />
          </div>
        </div>
      </div>

      <div class="items">
        <ul>
          <li class="title_li">
            <div class="left_side">
              <div class="serialnum">Title</div>
            </div>

            <div class="">
              <div class="artist_name">Artist</div>
            </div>
            <div class="non">
              <div class="artist_name"></div>
            </div>

            <time>Time</time>
          </li>
        </ul>
        <ul>
          <li
            v-for="(item, index) in filteredAudios"
            :class="isCurrentSong(index) ? 'active' : 'not_active'"
            v-on:click="
              changeSong(index), (isPlaylistActive = !isPlaylistActive)
            "
            :key="index"
          >
            <div class="left_side">
              <!-- <div class="serialnum">{{ index }}</div> -->
              <div class="songname">{{ item.title }}</div>
            </div>

            <div class="">
              <div class="artist_name">{{ item.artist }}</div>
            </div>
            <div class="center_place">
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

  <div class="player">
    <div class="play_area">
      <div class="left no-wrap row items-center">
        <img :src="musicPlaylist[currentSong].image" alt="" />

        <div class="details">
          <div>{{ musicPlaylist[currentSong].title }}</div>
          <div>{{ musicPlaylist[currentSong].artist }}</div>
        </div>
      </div>

      <div class="middle">
        <div class="playerButtons">
          <button
            class="button"
            :class="{ isDisabled: currentSong == 0 }"
            v-on:click="prevSong()"
            title="Previous Song"
          >
            <i class="fa-solid fa-backward"></i>
          </button>
          <button
            class="button play"
            @click="playAudio"
            title="Play/Pause Song"
          >
            <transition name="slide-fade" mode="out-in">
              <i
                class="zmdi"
                :class="[
                  currentlyStopped
                    ? 'fa-solid fa-stop'
                    : currentlyPlaying
                    ? 'fa-solid fa-circle-pause'
                    : 'fa-solid fa-play',
                ]"
                :key="1"
              ></i>
            </transition>
          </button>
          <button
            class="button"
            :class="{ isDisabled: currentSong == musicPlaylist.length - 1 }"
            v-on:click="nextSong()"
            title="Next Song"
          >
            <i class="fa-solid fa-forward"></i>
          </button>
        </div>
        <div class="currentProgressBar">
          <div
            class="currentProgress"
            :style="{ width: currentProgressBar + '%' }"
          ></div>
        </div>
      </div>

      <div class="right">
        <div class="currentTimeContainer">
          <span class="currentTime">{{ `0.${currentTime}` }}</span>
          <!-- <span class="totalTime"> {{ `0.${trackDuration}` }}</span> -->
        </div>
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
    </div>
  </div>

  <!-- <q-dialog v-model="playsong">
    <q-card class="q-mt-xl">
      <MusicPlayer />
    </q-card>
  </q-dialog> -->
</template>

<script>
import MusicPlayer from "../components/MusicPlayer.vue";
export default {
  data() {
    return {
      song: {},
      text: "",
      playsong: false,
      loading: true,
      audio: "",
      imgLoaded: false,
      currentlyPlaying: false,
      currentlyStopped: false,
      currentTime: 0,
      checkingCurrentPositionInTrack: "",
      trackDuration: 0,
      currentProgressBar: 0,
      isPlaylistActive: false,
      currentSong: 0,
      debug: false,
      musicPlaylist: [
        {
          title: "Service Bell",
          artist: "Daniel Simion",
          url: "https://greyflix-api.greysoft.com.ng/stream/music/title/2059032982_1117732407.wav?preload=true&shared&wt=0&ctx=1121356223&build=1.0.0&mode=local&pov=30288d048cd6c6618043c54991793806",
          //   url: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
          image: "https://source.unsplash.com/crs2vlkSe98/400x400",
        },
        {
          title: "Meadowlark",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
          image: "https://source.unsplash.com/35bE_njbG9E/400x400",
        },
        {
          title: "Hyena Laughing",
          artist: "Daniel Simion",
          url: "https://soundbible.com/mp3/hyena-laugh_daniel-simion.mp3",
          image: "https://source.unsplash.com/Esax9RaEl2I/400x400",
        },
        {
          title: "Creepy Background",
          artist: "Daniel Simion",
          url: "http://soundbible.com/mp3/creepy-background-daniel_simon.mp3",
          image: "https://source.unsplash.com/j0g8taxHZa0/400x400",
        },
      ],
      audioFile: "",
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

    currentTime() {
      this.currentTime = Math.round(this.currentTime);
    },
  },

  computed: {
    filteredAudios: function () {
      return this.musicPlaylist.filter((audio) => {
        return audio.title.match(this.text);
      });
    },
  },

  mounted() {
    this.changeSong();
    this.audio.loop = false;
  },
  methods: {
    getContent(slug) {
      this.loading = true;
      this.$api
        .get(`/audio/stories/${slug}`)
        .then(({ data }) => {
          this.song = data.data;
          let song = {};

          song.url = data.data.stream;
          song.image = data.data.cover_url;
          song.title = data.data.title;
          song.artist = data.data.info;
          this.musicPlaylist[0] = song;
          console.log(this.musicPlaylist);
          this.loading = false;
          console.log(data);
        })
        .catch((err) => {});
    },

    togglePlaylist() {
      this.isPlaylistActive = !this.isPlaylistActive;
    },
    nextSong() {
      if (this.currentSong < this.musicPlaylist.length - 1)
        this.changeSong(this.currentSong + 1);
    },
    prevSong() {
      if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
    },
    changeSong(index) {
      var wasPlaying = this.currentlyPlaying;
      this.imageLoaded = false;
      if (index !== undefined) {
        this.stopAudio();
        this.currentSong = index;
      }
      this.audioFile = this.musicPlaylist[this.currentSong].url;
      this.audio = new Audio(this.audioFile);
      var localThis = this;
      this.audio.addEventListener("loadedmetadata", function () {
        localThis.trackDuration = Math.round(this.duration);
      });
      this.audio.addEventListener("ended", this.handleEnded);
      if (wasPlaying) {
        this.playAudio();
      }
    },
    isCurrentSong(index) {
      if (this.currentSong === index) {
        // console.log(this.currentSong, index);
        return true;
      }
      return false;
    },
    getCurrentSong(currentSong) {
      return this.musicPlaylist[currentSong].url;
    },
    playAudio() {
      console.log("first");
      if (
        this.currentlyStopped == true &&
        this.currentSong + 1 == this.musicPlaylist.length
      ) {
        this.currentSong = 0;
        this.changeSong();
      }
      if (!this.currentlyPlaying) {
        this.getCurrentTimeEverySecond(true);
        this.currentlyPlaying = true;
        this.audio.play();
      } else {
        this.stopAudio();
      }
      this.currentlyStopped = false;
    },
    stopAudio() {
      this.audio.pause();
      this.currentlyPlaying = false;
      this.pausedMusic();
    },
    handleEnded() {
      if (this.currentSong + 1 == this.musicPlaylist.length) {
        this.stopAudio();
        this.currentlyPlaying = false;
        this.currentlyStopped = true;
      } else {
        this.currentlyPlaying = false;
        this.currentSong++;
        this.changeSong();
        this.playAudio();
      }
    },
    onImageLoaded() {
      this.imgLoaded = true;
    },
    getCurrentTimeEverySecond(startStop) {
      var localThis = this;
      this.checkingCurrentPositionInTrack = setTimeout(
        function () {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.currentProgressBar =
            (localThis.audio.currentTime / localThis.trackDuration) * 100;
          localThis.getCurrentTimeEverySecond(true);
        }.bind(this),
        1000
      );
    },
    pausedMusic: function () {
      clearTimeout(this.checkingCurrentPositionInTrack);
    },
    toggleDebug() {
      this.debug = !this.debug;
      document.body.classList.toggle("debug");
    },
  },

  beforeDestroy() {
    this.audio.removeEventListener("ended", this.handleEnded);
    this.audio.removeEventListener("loadedmetadata", this.handleEnded);

    clearTimeout(this.checkingCurrentPositionInTrack);
  },
};
</script>

<style lang="scss" scoped>
$primary_color: #fff;

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
}
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

.div {
  width: 90%;
}

.list {
  width: 80%;
  margin: 0 auto;
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

.isActive span:nth-child(1) {
  top: 5px;
  transform: rotate(135deg);
}

.isActive span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.isActive span:nth-child(3) {
  top: 5px;
  transform: rotate(-135deg);
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
  color: white;
}
.input_wrap input:focus {
  outline: none;
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

.div .right p {
  font-size: 16px;
}

.items li {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}
.active {
  background: #161515;
  backdrop-filter: blur(5px);
  padding: 0.6rem;
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

/* player */

.player {
  position: fixed;
  bottom: 2%;
  background: #161515;
  backdrop-filter: blur(5px);
  width: 100%;
}

.player .details {
  white-space: nowrap;
}

.player img {
  width: 70px;
  object-fit: cover;
  height: 70px;
  margin-right: 0.5rem;
}

.player .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.player p {
  margin-bottom: 0;
}

.play_area {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  color: #fff;
  height: 70px;
}

.play_area button {
  background: transparent;
  border: none;
  margin: 0 0.5rem;
}
.play_area button i {
  font-size: 20px;
}

.playerButtons {
  text-align: center;
}

.playerButtons i {
  font-size: 20px;
}

.currentTimeContainer {
  display: flex;
  gap: 1rem;
}

.currentProgressBar {
  width: 90%;
  background-color: #fff;
  margin: 0.75rem auto;
  // padding: 0 1rem;
  .currentProgress {
    background-color: red;
    width: 0px;
    height: 1px;
    transition: 100ms;
  }
}

@media (max-width: 700px) {
  .center_place,
  .actions,
  .non {
    display: none;
  }

  .player img {
    width: 70px;
    height: 70px;
  }

  .items li {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .list {
    width: 90%;
  }

  .input {
    margin-top: 1rem;
  }

  .div {
    flex-wrap: wrap;
    width: 100%;
  }

  .details {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .details > div:nth-child(2) {
    font-size: 10px;
  }

  .div .right p {
    margin-right: 1rem;
  }

  .player {
    bottom: 0;
  }

  .play_area {
    grid-template-columns: 2fr 4fr 1fr;
  }
}
</style>
