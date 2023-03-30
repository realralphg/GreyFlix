<template>
  <div class="wrapper">
    <header
      :style="` background:url(${featured?.cover_url})`"
      className="banner"
    >
      <div className="banner-items">
        <h1 className="banner-title">
          {{ featured?.title || featured?.name || featured?.original_name }}
        </h1>

        <div className="banner-btns">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">My List</button>
        </div>

        <p className="banner-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          commodi perspiciatis corporis nihil doloribus ea atque placeat quo,
          asperiores iusto voluptatibus modi repellat dicta sapiente.
        </p>
        <!-- <p className="banner-desc">{{ featured.info }}</p> -->
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      group: ref([]),
      options: [
        { label: "Add to Favourites", value: "favourites", color: "green" },
        { label: "Add to Recommended", value: "recommended", color: "green" },
      ],
    };
  },
  data() {
    return {
      netflixOriginals: [],
      featureds: [],
      featured: {},
      ratingg: 1,
      dialog: false,
      skeleton: true,
      featuredData: false,
    };
  },

  created() {
    this.featuredStories();
    // this.getNetflixOriginalMovies();
  },
  methods: {
    featuredStories() {
      this.skeleton = true;
      this.$api.get(`/audio/stories`).then((resp) => {
        console.log(resp);
        this.featured =
          resp.data.data[Math.floor(Math.random() * resp.data.data.length)];
        console.log(this.featured);
        this.skeleton = false;
        this.featuredsong = true;
      });
    },
  },
};
</script>

<style scoped>
.banner {
  object-fit: contain;
  color: #fff;
  height: 25rem;
  margin-bottom: 4rem;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}

.banner-items {
  padding-top: 9rem;
  margin-left: 3.5rem;
  height: 10rem;
  /* height: 30rem; */
}

.banner-title {
  font-size: 3rem;
  font-weight: 700;
  padding-bottom: 0.25rem;
}

.banner-desc {
  width: 45rem;
  line-height: 1.2;
  padding-top: 1rem;
  font-size: 1rem;
  max-width: 360px;
  font-size: 1rem;
  height: 7rem;
  font-weight: 700;
}

.banner-btn {
  cursor: pointer;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 0.2vw;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1rem;
  margin-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
}
.banner-btn:hover {
  color: rgb(7, 6, 6);
  background-color: #e6e6e6;
  transition: all 0.2s;
}
.banner--fadeBottom {
  margin-top: 8rem;
  height: 7.4rem;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
}

@media (max-width: 760px) {
  .banner-items {
    padding-top: 9rem;
    margin-left: 1.5rem;
    height: 10rem;
  }

  .banner-title {
    font-size: 1.5rem;
    font-weight: 500;
    padding-bottom: 0.25rem;
  }

  .banner-desc {
    width: 45rem;
    line-height: 1.2;
    padding-top: 1rem;
    font-size: 0.75rem;
    max-width: 200px;
    height: 7rem;
  }

  .banner-btn {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: 0.7rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
  }
}
</style>
