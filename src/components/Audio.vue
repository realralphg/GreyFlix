<template>
  <div class="container">
    <p class="text-white">
      <!-- {{ audio }} -->
    </p>
    <div class="row_items">
      <div class="items">
        <div class="items_wrap">
          <div class="img-border">
            <!-- <img
              src="https://mpics.mgronline.com/pics/Images/563000003510401.JPEG"
              alt=""
            /> -->
            <img :src="audio.cover_url" alt="" />
          </div>
          <div class="detail">
            <div class="detail-button">
              <div class="detail-button-left">
                <Player
                  :playing="playing"
                  :playingMusic="audio"
                  :music="audio.stream"
                />
                <!-- <button>
                  <i class="fa fa-play"></i>
                </button> -->
                <button @click="subscribe"><i class="fa fa-plus"></i></button>
                <i
                  v-if="audio.fav === 'yes'"
                  class="fa-solid text-red fa-heart"
                ></i>
                <!-- {{ audio.fav }} -->
                <button
                  v-if="audio.fav !== 'yes'"
                  @click="this.$store.myauth.addTofavourites(audio)"
                >
                  <i class="fa fa-thumbs-up"></i>
                </button>

                <button
                  @click="this.$store.myauth.removeFromfavourites(audio.id)"
                >
                  <i class="fa fa-thumbs-up"></i>
                </button>
              </div>
              <div class="detail-button-right">
                <button><i class="fa fa-angle-right"></i></button>
              </div>
            </div>

            <!-- <div class="detail-rating">
              <p>ตรงกัน 95%</p>
              <p>18+</p>
              <p>5 ซีซั่น</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "../components/Player.vue";
export default {
  props: ["audio", "fav"],

  data() {
    return {
      hover: false,
      playing: false,
    };
  },

  components: {
    Player,
  },

  // mounted() {
  //   console.log(this.$store.myauth.favourites);
  // },

  methods: {
    subscribe() {
      this.$store.myauth.subscribed = true;
      this.$q.notify({
        message: "You have now successfully subscribed",
        color: "green",
        position: "top",
      });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.row_wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  height: 100%;
}

.row_items {
  position: relative;
  width: 200px;
  height: 100%;
}

/* items */

.items {
  width: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  background: #333;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  border-radius: 2rem;
}
.items img {
  width: 100%;
  height: 140px;
  /* height: 100%; */
  object-fit: cover;
}
.items:hover {
  transform: scale(1.2);
  z-index: 2;
  top: -50px;
}
.items:hover .detail,
.items:hover .detail-button {
  display: flex;
  align-items: center;
}

/* detail */
.detail {
  width: 100%;
  display: none;
  flex-direction: column;
  padding: 15px 10px 10px;
  background: #333;
  margin-top: -10px;
}

/* detail-button */
.detail-button {
  width: 95%;
  display: none;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-button-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.detail-button-left button,
.detail-button-right button {
  width: 20px;
  height: 20px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 100%;
  color: #fff;
  border: 2px solid #adadad;
  cursor: pointer;
}
.detail-button-left button:first-child {
  background: #fff;
  color: #333;
  border: none;
}
.detail-button-left button:last-child {
  transform: rotate(180deg);
}
.detail-button-right button {
  transform: rotate(90deg);
}

/* hover */
.detail-button-left button:hover,
.detail-button-right button:hover {
  border: 2px solid #fff;
}
.detail-button-left button:first-child:hover {
  background: #f7f7f7;
}

/* detail-rating */
.detail-rating {
  display: flex;
  color: #fff;
  width: 95%;
}
.detail-rating p {
  text-align: center;
  margin-right: 10px;
}
.detail-rating p:first-child {
  color: #2ecc71;
  font-weight: bold;
}
.detail-rating p:nth-child(2) {
  border: 1px solid #fff;
  padding: 0 5px;
}

@media (max-width: 500px) {
  .items {
    width: 200px;
  }
}
</style>
