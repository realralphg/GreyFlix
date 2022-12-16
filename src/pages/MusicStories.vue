<template>
  <q-page class="page q-pt-xl container">
    <div class="row justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <h3 class="text-white text-weight-bold">
          Listen to the <br />
          African Sound
        </h3>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/3.png" alt="" />
      </div>
    </div>
    <div class="bg q-my-lg">
      <h4 class="text-white">Top Artistes</h4>

      <div class="row-posts">
        <div
          v-for="(artist, index) in artistes"
          :key="index"
          class="music_hold"
        >
          <div class="music_top">
            <img class="" :src="artist.image" alt="" />

            <div class="text-h6">
              {{ artist.name }}
              <q-badge align="middle" color="blue">
                <i class="fa-solid text-blue fa-check-double"></i>
              </q-badge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Music :musics="musicData" />

    <Footer />
  </q-page>
</template>

<script>
import Music from "../components/Music.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer,
    Music,
  },

  data() {
    return {
      musicData: [
        {
          id: 1,
          image: "/images/recent/1.jpg",
          type: "Cool Sounds",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 2,
          image: "/images/recent/2.jpg",
          type: "Identity",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 3,
          image: "/images/recent/3.jpg",
          type: "Top 25",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 4,
          image: "/images/recent/4.jpg",
          type: "Throwback",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 5,
          image: "/images/recent/5.jpg",
          type: "Down Sounds",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 6,
          image: "/images/recent/6.jpg",
          type: "Down Sounds",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 7,
          image: "/images/recent/7.jpg",
          type: "Down Sounds",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 8,
          image: "/images/recent/8.jpg",
          type: "Down Sounds",
          desc: "Listen to carefully selected sounds",
        },
      ],

      artistes: [
        {
          id: 1,
          image: "/images/artworks/artist/1.png",
          name: "Arya",
        },
        {
          id: 2,
          image: "/images/artworks/artist/2.png",
          name: "JKL",
        },
        {
          id: 3,
          image: "/images/artworks/artist/3.png",
          name: "Calipso",
        },
        {
          id: 4,
          image: "/images/artworks/artist/4.png",
          name: "Davis",
        },
        {
          id: 5,
          image: "/images/artworks/artist/5.png",
          name: "Ziggy",
        },
        {
          id: 6,
          image: "/images/artworks/artist/6.png",
          name: "Greg Marx",
        },
        {
          id: 7,
          image: "/images/artworks/artist/7.png",
          name: "Laura",
        },
        {
          id: 8,
          image: "/images/artworks/artist/8s.png",
          name: "Greg Marx Jnr",
        },
      ],
    };
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 45px;
  letter-spacing: 0.03em;
  color: #ffffff;
}

.bg {
  background: rgba(188, 164, 164, 0.12);
  backdrop-filter: blur(5px);
  border-radius: 72px;
  padding: 2rem;
  margin: 5rem 0;
}

small {
  font-weight: 500;
  font-size: 0.75rem;
}

.music_hold {
  padding: 0.65rem;
}

.music_top {
  width: 140px;
}

.music_hold img {
  width: 100px;
}
</style>
