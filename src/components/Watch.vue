<template>
  <div class="movie__section container">
    <div
      style="font-size: 25px"
      class="text-white text-weight-bold head q-pa-sm"
    >
      {{ name }}
    </div>

    <div v-if="type === 'audio'" class="rowItem">
      <div v-for="audio in audios" :key="audio.id" class="audio_hold">
        <div class="audio_top">
          <div>
            <Audio :audio="audio" />
          </div>
        </div>
      </div>
    </div>
    <!-- {{ type }} -->
    <div v-if="type === 'event'" class="rowItem">
      <div v-for="data in datas" :key="data.id" class="audio_hold">
        <div class="audio_top">
          <div>
            <Event :eventdata="data" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from "./Audio.vue";
import Event from "./Event.vue";
export default {
  props: ["audios", "name", "type", "datas"],

  components: {
    Audio,
    Event,
  },
};
</script>

<style scoped>
.movie__section {
  position: relative;
}
p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 15.8315px;
  line-height: 24px;
  color: #ffffff;
}

.rowItem {
  display: flex;
  gap: 5rem;
  align-items: center;
  overflow-x: scroll;
  height: 250px;
  padding: 3rem 0 10rem;
}
.rowItem::-webkit-scrollbar {
  display: none;
}

.head {
  position: absolute;
}

@media (max-width: 500px) {
  .rowItem {
    gap: 2rem;
  }
}
</style>
