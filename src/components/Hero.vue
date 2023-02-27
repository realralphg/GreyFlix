<template>
  <div class="wrapper">
    <div class="hero">
      <!-- {{ featured }} -->
      <q-skeleton v-if="skeleton" height="80vh" />
      <header
        v-if="featuredData"
        :style="`background:url('https://occ-0-5543-299.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXjlHHl_P1xhK0143s8rehpoBxMKL76SIs5I97ZzwDkAmSsr76IWx1JMmTzrySvuY2vd8prL6BNRFoxQCWfD93BEV0mOvmbqGTum.webp?r=3aa') no-repeat center center/cover`"
        className="banner"
      >
        <!-- <q-skeleton v-if="skeleton" height="100%" /> -->

        <div className="banner-items ">
          <div className="banner-title">
            {{ featured?.title }}
            <p v-if="featured?.info" className="banner-desc">
              {{ featured?.info }} <br />
              {{ featured?.meta[0] }}
            </p>
            <!-- <p className="banner-desc">
             
            </p> -->
          </div>

          <div class="hold">
            <div className="banner-btns">
              <div class="btns_hero">
                <q-btn
                  :to="{
                    name: 'audio.content',
                    params: { contentid: featured?.id, slug: featured?.slug },
                  }"
                  className="banner-btn bg-primary text-white"
                >
                  Listen Now
                </q-btn>
                <q-btn
                  @click="dialog = !dialog"
                  round
                  className="bg-dark hero_add_btn q-pa-sm text-white"
                  >+</q-btn
                >
              </div>
            </div>
            <div class="hero_btns">
              <q-btn round color="primary" label="18+" class="q-mb-md bt" />
              <p class="hero_chapters">
                {{ featured?.total_chapters }} Chapters
              </p>
              <div class="rating">
                <q-rating
                  :model-value="ratingg"
                  readonly
                  size="1.5em"
                  color="white"
                  icon="star_border"
                  icon-selected="star"
                />
                <!-- <q-rating
                  :model-value="rating"
                  readonly
                  size="1.5em"
                  color="white"
                  icon="star_border"
                  icon-selected="star"
                /> -->
              </div>
            </div>
          </div>
        </div>

        <q-dialog v-model="dialog">
          <q-card class="modal q-py-lg q-px-sm container" id="myModal">
            <q-option-group
              :options="options"
              type="checkbox"
              v-model="group"
            />
            <q-card-actions align="right">
              <q-btn
                style="border-radius: 8px"
                class="bg-primary q-px-lg q-mt-md q-py-sm text-white"
                flat
                @click="addLibrary(featured)"
                label="Add"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <div className="banner--fadeBottom"></div>
      </header>
    </div>
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
  // computed: {
  //   rating() {
  //     return (this.ratingg = Math.floor(parseInt(this.featured.rating)));
  //   },
  // },
  created() {
    this.featuredStories();
    // this.getNetflixOriginalMovies();
  },
  methods: {
    featuredStories() {
      this.skeleton = true;
      this.$api.get(`/audio/stories`).then((resp) => {
        console.log(resp);
        this.featuredData = true;
        this.featured =
          resp.data.data[Math.floor(Math.random() * resp.data.data.length - 1)];
        this.skeleton = false;
        this.featuredsong = true;
      });
    },

    // addLibrary(manga) {
    //   console.log(manga);
    //   console.log(this.group);
    //   this.group.map((option) => {
    //     console.log(option);
    //     if (option === "favourites") {
    //       console.log("favourites");
    //       this.$api
    //         .post(`contents/${this.featured.id}/favorite`)
    //         .then((resp) => {
    //           console.log(resp);

    //           this.$q.notify({
    //             message: resp.data.message,
    //             color: "green",
    //             position: "top",
    //             timeout: 3000,
    //           });
    //         })
    //         .catch(({ response }) => {
    //           console.log(response);
    //           this.$q.notify({
    //             message: resp.data.message,
    //             color: "red",
    //             position: "top",
    //             timeout: 3000,
    //           });
    //         });
    //       this.dialog = false;
    //     } else if (option === "recommended") {
    //       console.log("recommended");
    //       this.$api
    //         .post(`contents/${this.featured.id}/recommend`)
    //         .then((resp) => {
    //           console.log(resp, resp.data.message);

    //           this.$helper.notify(resp.data.message, "success", true);
    //         })
    //         .catch(({ response }) => {
    //           console.log(response);

    //           this.$helper.notify(response.data.message, "success", true);
    //         });
    //       this.dialog = false;
    //     } else {
    //       this.$helper.notify("Please select an option", "error", true);
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
.banner {
  object-fit: contain;
  color: #fff;
  margin-bottom: 3rem;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 80vh;
  position: relative;
}
.banner::before {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  content: "";
  background: rgb(22, 18, 18, 0.55);
  z-index: 1;
}
.hero_add_btn {
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-items {
  padding-top: 9rem;
  /* margin-left: 3.5rem; */
  height: 10rem;
  position: absolute;
  top: 30%;
  z-index: 10;
  width: 90%;
}

.banner-title {
  font-size: 2.5rem;
  font-weight: 700;
  padding-bottom: 0.25rem;
  color: #fff;
  margin-left: 3.5rem;
}

.banner-desc {
  width: 45rem;
  line-height: 1.2;
  /* padding-top: 1rem; */
  font-size: 1rem;
  max-width: 360px;
  /* height: 7rem; */
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
  position: absolute;
  bottom: 0;
  width: 100%;
}

.hold {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-left: 3.5rem;
}
.hero_btns {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.dots {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dots > div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
}

.btns_hero {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .banner-items {
    padding-top: 9rem;
    /* margin-left: 3.5rem; */
    height: 10rem;
    position: absolute;
    top: 30%;
    z-index: 10;
    width: 90%;
  }
}
@media (max-width: 1024px) {
  .banner-items {
    top: 10%;
    z-index: 10;
    width: 90%;
  }
}
@media (max-width: 760px) {
  .banner-items {
    padding-top: 9rem;
    margin-left: 1.5rem;
    height: 10rem;
  }

  .banner-title {
    font-size: 1.2rem;
    font-weight: 500;
    padding-bottom: 0.25rem;
    margin-left: 0;
  }

  .banner-desc {
    width: 45rem;
    line-height: 1.2;
    /* padding-top: 1rem; */
    font-size: 0.75rem;
    max-width: 200px;
    /* height: 7rem; */
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

  .hold {
    margin-left: 0rem;
  }
  .hero_chapters {
    text-align: center;
  }
  .banner-btn {
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.64rem;
  }
  .hero_add_btn {
    font-size: 1rem;
  }
}
</style>
