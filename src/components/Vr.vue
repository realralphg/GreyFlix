<template>
  <div class="nft__section container">
    <div style="font-size: 30px" class="text-white head q-mb-xl q-pa-sm">
      Virtual Museum Exhibitions
    </div>
    <div class="row_Nfts">
      <div v-for="vr in vrs" :key="vr.id" class="music_hold">
        <div class="music_top">
          <img class="" :src="vr.image" alt="" />
        </div>
        <div class="artists">
          <div class="">
            <p>
              {{ vr.desc }}
            </p>
          </div>

          <q-btn class="view text-white q-mt-md"> View Exhibition </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["vrs"],
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
.nft__section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15.7317px);
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 44.4188px;
  width: 100%;
  margin: 4rem auto;
}
.music_hold {
  background: #000;
  position: relative;
  border-radius: 7.24324px;
  height: 400px;
  width: 100%;
  margin: 0 auto;
}

.music_hold img {
  width: 100%;
  height: 200px;
  border-top-left-radius: 7.24324px;
  border-top-right-radius: 7.24324px;
}

.music_top {
  position: relative;
  color: #ffffff;
}
.top_det {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 7.24324px;
}

.top_det p {
  padding: 0.45rem;
  background: #000000;
  border-top-left-radius: 7.24324px;
  border-bottom-right-radius: 7.24324px;
  font-weight: 700;
  font-size: 18px;
}

.artists {
  background: #000000;
  padding: 1rem 0.4rem;
}
.artists_hold {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: -16%;
  position: relative;
  z-index: 100;
}
.artists img {
  width: 80px;
  border: 8.70061px solid #000000;
  /* border: 6.70061px solid #000000; */
  border-radius: 317.171px;
}
.artists p {
  margin-top: 1rem;
  font-size: 20px;
  font-weight: 700;
}

.row_Nfts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  align-items: center;
  gap: 1rem;
}

.badge {
  width: 35px !important;
}
</style>
