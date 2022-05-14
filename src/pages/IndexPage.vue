<template>
  <q-page class="page">
    <Hero />
    <Watch :movies="movies" :largeRow="largeRow" name="Watch Movies" />
    <Watch
      :movies="trendingMovies"
      :largeRow="largeRow"
      name="Animated Movies"
    />
  </q-page>
</template>

<script>
import axios from "axios";

import { defineComponent } from "vue";
import Hero from "../components/Hero.vue";
import Watch from "../components/Watch.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    Hero,
    Watch,
  },
  data() {
    return {
      movies: [],
      trendingMovies: [],
      largeRow: true,
    };
  },

  created() {
    this.getTopMovies();
    this.getTrendingMovies();
  },
  methods: {
    getTopMovies() {
      const API_KEY = "8897d6373a8d096f760008eabb6376ef";

      axios.get(`/movie/top_rated?api_key=${API_KEY}`).then((resp) => {
        console.log(resp.data.results);
        this.movies = resp.data.results;
      });
    },
    getTrendingMovies() {
      const API_KEY = "8897d6373a8d096f760008eabb6376ef";

      axios.get(`/trending/all/week?api_key=${API_KEY}`).then((resp) => {
        console.log(resp.data.results);
        this.trendingMovies = resp.data.results;
      });
    },
  },
});
</script>
