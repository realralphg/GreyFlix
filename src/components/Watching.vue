<template>
  <div class="movie__section">
    <div v-if="name" style="font-size: 30px" class="text-white head q-px-md">
      {{ name }}
    </div>
    <div :class="count ? 'row-posts count_left' : 'row-posts'">
      <div v-if="count" class="">
        <div class="count">{{ countNumber }}</div>
      </div>

      {{ musics }}

      <div
        v-for="music in musics"
        :key="music.id"
        :class="
          largeRow
            ? 'ourbigmangas deservingg_top'
            : 'row-poster deservingg_top small_posters'
        "
      >
        <router-link
          :to="{
            name: 'audio.content',
            params: { contentid: music.id, slug: music.slug },
          }"
          clickable
        >
          <img :src="music.cover_url" alt="" />
          <div class="deservee">
            <!-- <p class="text-white">{{ music.categories.join(", ") }}</p> -->
            <p class="text-weight-bold text-white">
              {{ music.info }}
            </p>
          </div>
        </router-link>
        <div class="row toggle items-center">
          <p class="text-primary text-weight-bold">{{ music.title }}</p>
          <q-btn @click="togglemodal(music)" size="55px" class="text-white"
            >+</q-btn
          >
        </div>
      </div>

      <div v-if="skeleton">
        <div
          style="height: 100%; gap: 1rem"
          class="row no-wrap lar items-start"
        >
          <q-card
            v-for="type in skele"
            :key="type"
            flat
            style="max-width: 300px; height: 100%; width: 300px"
          >
            <q-skeleton height="150px" square />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" width="50%" class="text-subtitle1" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="dialog">
      <q-card class="modal q-py-lg q-px-sm container" id="myModal">
        <q-option-group :options="options" type="checkbox" v-model="group" />
        <q-card-actions align="right">
          <q-btn
            style="border-radius: 8px"
            class="bg-primary q-px-lg q-mt-md q-py-sm text-white"
            flat
            @click="addLibrary"
            label="Add"
            color="primary"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["largeRow", "name", "musics", "count", "countNumber", "skeleton"],

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
      dialog: false,
      mangadetails: null,
      loading: false,
      skele: [
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
        "ske",
      ],
    };
  },

  methods: {
    togglemodal(manga) {
      this.dialog = true;
      this.mangadetails = manga;
      console.log(manga);
    },
    addLibrary() {
      console.log(this.mangadetails);
      console.log(this.group);
      this.group.map((option) => {
        console.log(option);
        if (option === {}) {
          console.log("first");
          this.$helper.notify(
            "You have not selected any action",
            "error",
            true
          );
        } else if (option === "favourites") {
          console.log("favourites");
          this.loading = true;
          this.$api
            .post(`contents/${this.mangadetails.id}/favorite`)
            .then((resp) => {
              console.log(resp);
              this.$q.notify({
                message: resp.data.message,
                color: "green",
                position: "top",
                timeout: 3000,
              });
              this.loading = false;

              this.dialog = false;
            })
            .catch(({ response }) => {
              console.log(response);
              this.loading = false;

              this.$q.notify({
                message: response.data.message,
                color: "red",
                position: "top",
                timeout: 3000,
              });
            });
        } else if (option === "recommended") {
          console.log("recommended");
          this.loading = true;

          this.$api
            .post(`contents/${this.mangadetails.id}/recommend`)
            .then((resp) => {
              console.log(resp);
              this.loading = false;

              this.$q.notify({
                message: resp.data.message,
                color: "green",
                position: "top",
                timeout: 3000,
              });

              this.dialog = false;
            })
            .catch(({ response }) => {
              console.log(response);
              this.loading = false;

              this.$q.notify({
                message: response.data.message,
                color: "red",
                position: "top",
                timeout: 3000,
              });
            });
        } else {
          this.$helper.notify(
            "You have not selected any action",
            "error",
            true
          );
        }
      });
    },
  },
};
</script>

<style scoped>
.count_left {
  position: relative;
  width: 100%;
}
.deserving {
  position: relative;
  max-height: 15rem;
  transition: transform 480ms;
}
.deservingg {
  position: relative;
  max-height: 100%;
  transition: transform 480ms;
}

p {
  margin-bottom: 0;
}

.deserving img {
  width: 300px;
  position: relative;
  height: 100%;
}
.deservingg img {
  width: 400px;
  position: relative;
  height: 100%;
}
.deservingg_top img {
  width: 100%;
  position: relative;
  height: 100%;
}
.deserving::before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 50;
}
.deservingg::before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 50;
}
.deservingg_top::before {
  content: "";
  /* width: 100%; */
  height: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 50;
}

.deserve {
  position: absolute;
  z-index: 100;
  /* border: 5px solid red; */
  top: 0;
  height: 100%;
  width: 100%;
  padding: 1rem 0.75rem;
}
.deservee {
  position: absolute;
  z-index: 100;
  top: 0;
  height: 105%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 5rem 1rem;
  display: none;
}

.mang_desc {
  margin-top: 6rem;
}

.toggle {
  position: absolute;
  top: 27%;
  margin-left: 1rem;
  font-size: 1.1rem;
  z-index: 200;
  display: none;
}
.deservingg:hover {
  z-index: 50;
}
.deservingg:hover .deservee {
  display: block;
}
.deservingg:hover .toggle {
  display: flex;
}
.deservingg_top:hover .deservee {
  display: block;
}
.deservingg_top:hover .toggle {
  display: flex;
}

.count {
  color: #fff;
  font-size: 7rem;
  font-weight: 600;
  position: absolute;
  left: 3%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 0;
  box-shadow: 22px 30px 386px 148px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 22px 30px 386px 148px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 22px 30px 386px 148px rgba(0, 0, 0, 0.75);
}

.mang {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  color: #fff;
  gap: 1rem;
}

.mang img {
  width: 100%;
  object-fit: contain;
  max-height: 15rem;
  transition: transform 480ms;
}

.big_skeleton {
  height: 25rem;
}
.small_skeleton {
  height: 15rem;
}

@media (max-width: 600px) {
  .deserving,
  .deservingg {
    width: 300px;
  }
  .deserving img,
  .deservingg img {
    width: 300px;
  }
  .deserve,
  .deservee {
    font-size: 13px;
  }
  .count {
    left: 12%;
  }
}
</style>
