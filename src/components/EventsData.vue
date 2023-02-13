<template>
  <div class="nft__section container">
    <div style="font-size: 30px" class="text-white head q-mb-xl q-pa-sm">
      Upcoming Events
    </div>
    <div class="row_Nfts">
      <div v-for="data in datas" :key="data.id" class="music_hold">
        <div class="music_top">
          <img class="" :src="data.category.image_url" alt="" />

          <div
            class="row text-white q-px-md top fee items-center justify-between"
          >
            <p>{{ data.name }}</p>
            <p>
              <i class="fa-solid q-mr-sm fa-location-dot"></i
              >{{ data.location }}
            </p>
          </div>
        </div>
        <div class="artists">
          <div class="">
            <div class="row items-center justify-between">
              <p>Start Date: {{ data.start_date }}</p>
              <p>End Date: {{ data.end_date }}</p>
            </div>

            <p>
              {{ data.description }}
            </p>
          </div>

          <q-btn
            :to="{ name: 'EventTicketsPage', params: { slug: data.id } }"
            class="view text-white q-mt-md"
          >
            View Event
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datas"],
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
  width: 90%;
  margin: 4rem auto;
}
.music_hold {
  background: #000;
  position: relative;
  border-radius: 7.24324px;
  height: 400px;
  width: 100%;
  margin: 1rem auto;
}

.music_hold img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 7.24324px;
  border-top-right-radius: 7.24324px;
}

.music_top {
  position: relative;
  color: #ffffff;
}
.music_top::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}

.music_top .top {
  position: absolute;
  bottom: 10px;
  width: 100%;
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
  /* margin-top: 1rem; */
  padding: 0.2rem 0.7rem;
  font-size: 14px;
  font-weight: 700;
}

.row_Nfts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  gap: 2rem;
}

.badge {
  width: 35px !important;
}
@media (min-width: 1200px) {
  .row_Nfts {
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    max-width: 90%;
  }
}
@media (max-width: 500px) {
  .nft__section {
    padding: 3rem 1rem 5rem;
  }

  .row_Nfts {
    gap: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
