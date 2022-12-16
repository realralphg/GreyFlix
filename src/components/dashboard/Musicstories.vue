<template>
  <div class="wrapper">
    <div class="kl">
      <h1 class="text-white text-h4">Hi Rebecca!</h1>

      <div class="hold q-mt-md">
        <div class="row q-my-sm q-gutter-md items-center">
          <div class="hold">
            <q-input
              outlined
              class="bg-black"
              name="info"
              v-model="info"
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
              v-model="title"
              label="Title"
            />
            <div class="error" v-if="errors.title">
              {{ errors.title[0] }}
            </div>
          </div>
        </div>
      </div>
      <!-- {{ errors }} -->
      <div class="row q-my-sm q-gutter-md items-center">
        <div class="hold">
          <q-input
            class="bg-black"
            outlined
            name="status"
            v-model="status"
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
            v-model="cover"
            label="Cover File"
          >
          </q-file>
          <div class="error" v-if="errors.cover">
            {{ errors.cover[0] }}
          </div>
        </div>

        <div class="hold">
          <q-input
            outlined
            type="number"
            name="series_id"
            class="bg-black"
            v-model="series_id"
            label="Series ID"
          />
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
          v-model="meta"
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
          v-model="model"
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
      model: ref(null),
      errors: [],
      status: "",
      loading: false,
      cover: ref(null),
      series_id: "",
      title: "",
      meta: "",
      info: "",
    };
  },

  methods: {
    createAudioStory() {
      const formData = new FormData();
      formData.append("file", this.model);
      formData.append("info", this.info);
      formData.append("cover", this.cover);
      formData.append("meta", this.meta);
      formData.append("status", this.status);
      formData.append("title", this.title);
      formData.append("series_id", this.series_id);
      this.loading = true;
      this.$api
        .post("/admin/audio/stories", formData)
        .then((resp) => {
          this.loading = false;
          console.log(resp);
          // console.log(JSON.parse(resp));
          this.$q.notify({
            message: "Student upload Successful",
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
  padding: 3rem;
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
