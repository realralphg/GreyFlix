<template>
  <div class="card-banner-icon">
    <!-- {{ playing }} -->
    <q-btn class="player_btn" v-if="playing" @click="play((playing = false))">
      <i
        :class="playing === true ? 'fa-solid fa-pause' : 'fa-solid fa-play'"
      ></i>
    </q-btn>
    <q-btn v-else @click="play((playing = true))">
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
            @click="play((playing = false))"
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
  data() {
    return {
      playing: false,
      alreadyPlaying: false,
    };
  },
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
  props: ["music", "playingMusic"],
  methods: {
    play(playing) {
      console.log(playing);
      var stream = this.music;
      var player = new Howl({
        src: stream,
        html5: true,
        autoplay: false,
        loop: false,
        volume: 0.7,
        preload: false,
      });
      if (playing) {
        player.play();
        console.log("play");
        this.open("bottom");
      } else {
        // player.pause();
        this.dialog = false;
        Howler.unload();
        console.log("paused >>>");
      }
    },
    // pause(playing) {
    //   playing = false;
    //   var stream = this.music;
    //   var player = new Howl({
    //     src: stream,
    //     html5: true,
    //     autoplay: false,
    //     loop: false,
    //     volume: 0.7,
    //     preload: false,
    //   });
    //   player.stop();
    //   // Howler.unload();
    //   this.open("bottom");
    // },
  },
};
</script>

<style scoped>
.q-btn {
  padding: 0;
  color: #ffffff;
  min-height: 0;
}

.q-btn::before {
  box-shadow: none;
}

i {
  background: rgba(56, 56, 56, 0.22);
  border: 0.979656px solid #ffffff;
  backdrop-filter: blur(8.82797px);
  border-radius: 91.6247px;
  width: 25px;
  height: 25px;
  font-weight: 700;
  font-size: 12.8315px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
