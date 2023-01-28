<template>
  <div class="wrapper">
    <div class="kl">
      <h1 class="text-white text-h4">
        {{
          this.$store.auth.userDetails !== []
            ? this.$store.auth.userDetails.data.firstname +
              " " +
              this.$store.auth.userDetails.data.lastname
            : "Hi, there"
        }}
      </h1>

      <div class="hold q-mt-md">
        <div class="grid q-my-sm">
          <div class="hold">
            <q-input
              outlined
              class="bg-black"
              name="info"
              v-model="data.info"
              label="Info"
            />
            <div class="error" v-if="errors.info">
              {{ errors.info[0] }}
            </div>
          </div>

          <div class="hold">
            <q-input
              class="bg-black"
              outlined
              name="title"
              v-model="data.title"
              label="Title"
            />
            <div class="error" v-if="errors.title">
              {{ errors.title[0] }}
            </div>
          </div>
        </div>
      </div>
      <!-- {{ errors }} -->
      <!-- {{ this.$store.auth.userDetails }} -->
      <div class="grid q-pt-md q-my-sm">
        <div class="hold">
          <q-input
            class="bg-black"
            outlined
            name="status"
            v-model="data.status"
            label="Status"
          />
          <div class="error" v-if="errors.status">
            {{ errors.status[0] }}
          </div>
        </div>

        <div class="hold">
          <q-file
            color="teal"
            name="cover"
            filled
            class="bg-black"
            v-model="data.cover"
            label="Cover File"
          >
          </q-file>
          <div class="error" v-if="errors.cover">
            {{ errors.cover[0] }}
          </div>
        </div>

        <div class="hold">
          <!-- <q-input
            outlined
            type="number"
            name="series_id"
            class="bg-black"
            v-model="series_id"
            label="Series ID"
          /> -->
          <select name="" v-model="data.series_id" id="">
            <option v-for="serie in series" :key="serie.id" :value="serie.id">
              {{ serie.title }}
            </option>
          </select>
          <div class="error" v-if="errors.series_id">
            {{ errors.series_id[0] }}
          </div>
        </div>
      </div>
      <div class="row q-my-sm q-gutter-md items-center">
        <q-input
          type="textarea"
          outlined
          class="bg-black"
          name="meta"
          v-model="data.meta"
          label="Meta"
        />
        <div class="error" v-if="errors.meta">
          {{ errors.meta[0] }}
        </div>
      </div>
      <div class="file q-mt-lg">
        <q-file
          color="teal"
          name="File"
          filled
          class="bg-black"
          v-model="data.model"
          label="Audio File"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <div class="error" v-if="errors.file">
          {{ errors.file[0] }}
        </div>
      </div>

      <q-btn
        :loading="loading"
        @click="createAudioStory"
        class="q-my-lg"
        color="blue"
      >
        Upload
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  data() {
    return {
      errors: [],
      series: [],
      data: {
        cover: ref(null),
        model: ref(null),
      },
      loading: false,
    };
  },

  mounted() {
    this.getSeries();
  },

  methods: {
    getSeries() {
      this.$api
        .get(`/admin/series`)
        .then((response) => {
          this.series = response.data.data;
          //   console.log(response);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    createAudioStory() {
      const formData = new FormData();
      formData.append("file", this.data.model);
      formData.append("info", this.data.info);
      formData.append("cover", this.data.cover);
      formData.append("meta", this.data.meta);
      formData.append("status", this.data.status);
      formData.append("title", this.data.title);
      formData.append("series_id", this.data.series_id);
      this.loading = true;
      this.$api
        .post("/admin/audio/stories", formData)
        .then((resp) => {
          this.loading = false;
          //   console.log(resp);
          // console.log(JSON.parse(resp));
          this.$q.notify({
            message: "Upload Successful",
            color: "green",
            position: "top",
          });
          // formData = {};
          this.model = null;
          this.data = {};
        })
        .catch(({ response }) => {
          this.loading = false;
          console.log(response);
          this.$q.notify({
            message: "There was an error.",
            color: "red",
            position: "top",
          });
          setTimeout(() => {
            this.errors = [];
          }, 7000);
          // console.log(response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: #212121;
  height: 100%;
  padding: 1rem;
}

.kl {
  background: #3c3c3c;
  padding: 2rem;
  box-shadow: 0px 4px 36px rgba(0, 0, 0, 0.25);
  border-radius: 22px;
}

.file .q-field {
  height: 60vh;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 0 0;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: center;
  gap: 1rem;
}

select {
  width: 100%;
  padding: 0 0.5rem;
  min-height: 55px;
  background: #000;
  color: #fff;
  border: none;
}

select:focus {
  outline: none;
}

.kl .q-field {
  width: 100%;
}

.row {
  flex-wrap: nowrap;
}

.q-field__label {
  color: #9b9696 !important;
}

.error {
  color: red;
  font-size: 11px;
}
@media (max-width: 768px) {
  .row {
    flex-wrap: wrap;
  }
}
</style>
