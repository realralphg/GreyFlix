<template>
  <q-page class="page">
    <Hero />
    <Watch
      :audios="this.$store.myauth.favourites"
      :skeleton="skeleton"
      :largeRow="largeRow"
      name="Your Favourites"
      type="audio"
    />
    <Watch
      :audios="audios"
      :skeleton="skeleton"
      :largeRow="largeRow"
      name="Latest Audio Stories"
      type="audio"
    />
    <Watch
      :audios="audios"
      :skeleton="skeleton"
      :largeRow="largeRow"
      name="Audio Stories"
      type="audio"
    />

    <Music :musics="audios" />
    <!-- <EventsData :datas="data" /> -->

    <Watch :datas="data" name="Events" type="event" />

    <Footer />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Hero from "../components/Hero.vue";
import Watch from "../components/Watch.vue";
import Music from "../components/Music.vue";
import NFTs from "../components/NFTs.vue";
import Animations from "../components/Animations.vue";
import Vr from "../components/Vr.vue";
import Footer from "../components/Footer.vue";
import EventsData from "../components/EventsData.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    Hero,
    Watch,
    Music,
    NFTs,
    Animations,
    Vr,
    Footer,
    EventsData,
  },
  data() {
    return {
      hover: false,
      movies: [],
      trendingMovies: [],
      largeRow: true,
      big_skeleton: null,
      skeleton: true,
      audios: [],
      ourMangas: false,
      data: [],
      musics: [],
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
      animations: [
        {
          id: 1,
          image: "/images/animations/1.jpg",
        },
        {
          id: 2,
          image: "/images/animations/2.jpg",
        },
        {
          id: 3,
          image: "/images/animations/3.jpg",
        },
        {
          id: 4,
          image: "/images/animations/4.jpg",
        },
        {
          id: 5,
          image: "/images/animations/5.jpg",
        },
        {
          id: 6,
          image: "/images/animations/6.jpg",
        },
        {
          id: 7,
          image: "/images/animations/7.jpg",
        },
        {
          id: 8,
          image: "/images/animations/8.jpg",
        },
        {
          id: 9,
          image: "/images/animations/9.jpg",
        },
      ],
      Nfts: [
        {
          id: 1,
          image: "/images/artworks/1.jpg",
          cover: "/images/artworks/artist/1.png",
          type: "LoopArt",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 2,
          image: "/images/artworks/2.jpg",
          cover: "/images/artworks/artist/2.png",
          type: "Roboarm",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 3,
          image: "/images/artworks/3.jpg",
          cover: "/images/artworks/artist/3.png",
          type: "Drool",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 4,
          image: "/images/artworks/4.jpg",
          cover: "/images/artworks/artist/4.png",
          type: "Theodore",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 5,
          image: "/images/artworks/5.jpg",
          cover: "/images/artworks/artist/5.png",
          type: "Gaze",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 6,
          image: "/images/artworks/6.jpg",
          cover: "/images/artworks/artist/6.png",
          type: "Gaze",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 7,
          image: "/images/artworks/7.jpg",
          cover: "/images/artworks/artist/7.png",
          type: "Gaze",
          desc: "Listen to carefully selected sounds",
        },
        {
          id: 8,
          image: "/images/artworks/8.jpg",
          cover: "/images/artworks/artist/8.png",
          type: "Gaze",
          desc: "Listen to carefully selected sounds",
        },
      ],
      virtualR: [
        {
          id: 1,
          image: "/images/vr/1.jpg",
          desc: "Senegal's Museum of Black Civilizations Museum in Dakar, Senegal",
        },
        {
          id: 2,
          image: "/images/vr/2.jpg",
          desc: "Zeitz Museum of Contemporary Art Africa Cape Town, South Africa",
        },
        {
          id: 3,
          image: "/images/vr/3.jpg",
          desc: "House of Slaves Museum in Dakar, Senegal",
        },
        {
          id: 4,
          image: "/images/vr/4.jpg",
          desc: "Iziko South African Museum in Cape Town, South Africa",
        },
        {
          id: 5,
          image: "/images/vr/5.jpg",
          desc: "Iziko South African Museum in Cape Town, South Africa",
        },
        {
          id: 6,
          image: "/images/vr/6.jpg",
          desc: "Iziko South African Museum in Cape Town, South Africa",
        },
      ],
    };
  },

  created() {
    this.getmusicstories();
    this.getEvents();
  },
  methods: {
    getmusicstories() {
      this.skeleton = true;
      this.$api.get(`/audio/stories`).then((resp) => {
        // console.log(resp);
        this.audios = resp.data.data;
        this.musics = resp.data.data;
        this.skeleton = false;
      });
    },

    getEvents() {
      this.loading = true;
      this.$api
        .get(`events`)
        .then(({ data }) => {
          // console.log("added", data);
          this.data = data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
</script>
<style scoped></style>
