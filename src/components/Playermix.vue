<template>
  <div class="card-banner-icon">
    <q-btn v-if="playing" @click="playAudio((currentlyPlaying = false))">
      <i
        :class="playing === true ? 'fa-solid fa-pause' : 'fa-solid fa-play'"
      ></i>
    </q-btn>
    <q-btn v-else @click="playAudio((currentlyPlaying = true))">
      <i
        :class="playing === true ? 'fa-solid fa-pause' : 'fa-solid fa-play'"
      ></i>
    </q-btn>

    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">{{ playingMusic.title }}</div>
            <div class="text-grey">{{ playingMusic.info }}</div>
          </div>
          <q-space />
          <q-btn flat round icon="fast_rewind" />
          <q-btn
            @click="playAudio"
            flat
            round
            :icon="playing === true ? 'fa-solid fa-pause' : 'fa-solid fa-play'"
          />
          <q-btn flat round icon="fast_forward" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["music", "playingMusic"],
  setup() {
    const dialog = ref(false);
    const position = ref("bottom");

    return {
      dialog,
      position,
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
    };
  },
  data() {
    return {
      song: {},
      playing: false,
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
          url: this.music,
          image: "https://source.unsplash.com/crs2vlkSe98/400x400",
        },
      ],
      audioFile: "",
    };
  },

  watch: {
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
    // this.musicPlaylist[0] = th/is.music;
    this.changeSong();
    this.audio.loop = false;
  },
  methods: {
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
    playAudio(currentlyPlaying) {
      console.log("first");
      if (currentlyPlaying) {
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

<style scoped>
.q-btn::before {
  box-shadow: none;
}

i {
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
