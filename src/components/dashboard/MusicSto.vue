<template>
  <div class="style q-pa-md">
    <q-table
      title="Music Stories"
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      selection="multiple"
      v-model:selected="selected"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
        <q-btn
          @click="createmusicStory"
          color="red"
          label="Create Music Stories"
          padding="sm"
          class="q-ma-xs"
        />

        <!-- <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip :disable="$q.platform.is.mobile">
            {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile">{{
            mode === "grid" ? "List" : "Grid"
          }}</q-tooltip>
        </q-btn>
      </template>

      <template v-slot:body-cell-image_url="props">
        <q-td :props="props">
          <q-avatar size="50px" class="shadow-10">
            <img :src="props.row.cover_url" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              round
              dense
              color="negative"
              size="sm"
              icon="delete"
              :loading="loaders.deleteBtn[props.value]"
              @click="deleteMusicStories(props.value)"
            >
              <q-tooltip>Delete {{ props.row.name }}</q-tooltip>
            </q-btn>

            <!-- {{ CategoriesNumber }} -->

            <q-btn
              round
              dense
              glossy
              color="info"
              size="sm"
              class="q-ml-sm"
              icon="edit"
              :loading="loaders.save[props.value]"
              @click="editMusicStories(props.row)"
            >
              <q-tooltip>Edit {{ props.row.name }}</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>

      <template v-slot:bottom v-if="selected.length">
        <q-btn
          @click="deletemultiple"
          :loading="loaders.delete"
          color="negative"
          :label="`Delete ${selected.length} Selected Fruitbays`"
          padding="sm"
          class="q-mr-xs"
        />
      </template>
    </q-table>
  </div>
  <q-dialog v-model="create_title">
    <q-card style="width: 800px; max-width: 85vw">
      <q-card-section>
        <div class="text-h6">
          Music Stories
          <q-btn
            round
            flat
            dense
            icon="close"
            class="close float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
        </div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="createAudioStory" class="q-gutter-md">
          <div class="hold q-mt-md">
            <div class="grid q-my-sm">
              <div class="hold">
                <q-input
                  outlined
                  class=""
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
                  class=""
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
                class=""
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
                class=""
                v-model="data.cover"
                label="Cover File"
              >
              </q-file>
              <div class="error" v-if="errors.cover">
                {{ errors.cover[0] }}
              </div>
            </div>

            <div class="hold">
              <select name="" v-model="data.series_id" id="">
                <option
                  v-for="serie in series"
                  :key="serie.id"
                  :value="serie.id"
                >
                  {{ serie.title }}
                </option>
              </select>
              <div class="error" v-if="errors.series_id">
                {{ errors.series_id[0] }}
              </div>
            </div>
          </div>
          <div class="q-my-md">
            <q-input
              type="textarea"
              outlined
              class=""
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
              class=""
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

          <!-- <q-btn
            :loading="loading"
            @click="createAudioStory"
            class="q-my-lg"
            color="blue"
          >
            Upload
          </q-btn> -->

          <q-card-actions align="right" class="text-teal">
            <q-btn
              v-if="!editstate"
              label="Upload"
              type="submit"
              color="primary"
              v-close-popup="false"
              :loading="loading"
            />
            <q-btn
              v-if="editstate"
              label="Edit"
              type="submit"
              color="primary"
              @click="editedFunction"
              v-close-popup="false"
              :loading="editLoad"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { exportFile, useMeta } from "quasar";
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "title",
    required: true,
    label: "title",
    align: "left",
    field: "title",
    sortable: true,
  },
  {
    name: "image_url",
    required: true,
    label: "Image",
    align: "left",
    field: "image_url",
    sortable: true,
  },

  //   {
  //     name: "description",
  //     required: true,
  //     label: "description",
  //     align: "left",
  //     field: "description",
  //     // field: (row) => row.description.substr(0, 50),
  //     sortable: true,
  //   },

  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "left",
    field: (row) => row.id,
    sortable: false,
  },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
export default {
  setup() {
    useMeta({
      title: "Create Music Stories",
    });
  },
  data() {
    return {
      columns,
      priority: 1,
      selected: [],
      musicStory: null,
      categories: [],
      rows: [],
      errors: [],
      fruitbay: {},
      image: null,
      series: [],
      data: {
        cover: ref(null),
        model: ref(null),
      },
      files: null,
      editstate: false,
      createstate: null,
      description: "",
      type: "",
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      musicStoryid: "",
      loading: false,
      editLoad: false,
      create_title: false,
      loaders: {
        delete: false,
        musicStory: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  computed: {
    CategoriesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPertitle);
    },
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });

    this.getSeries();
  },

  methods: {
    onRequest(props) {
      this.loading = true;
      const url = `admin/audio/stories`;
      this.curl = url;
      this.$api
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.rows = data.data;
        })
        .catch(({ response }) => {
          console.log(response);
          this.loading = false;
          this.rows = [];
        });
    },

    createmusicStory() {
      this.editstate = false;
      this.create_title = true;
      this.data = {
        cover: ref(null),
        model: ref(null),
      };
    },
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
          this.$q.notify({
            message: "Upload Successful",
            color: "green",
            position: "top",
          });
          this.refreshtitle();
          this.create_title = false;
          this.image = null;
          this.model = null;
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
    editMusicStories(musicStory) {
      this.editstate = true;
      this.create_title = true;
      this.data.METHOD = "PUT";
      console.log(musicStory);
      //   this.data.description = musicStory.description;
      this.data.info = musicStory.info;
      this.data.status = musicStory.status;
      this.data.title = musicStory.title;
      this.data.image = musicStory.cover_url;
      this.data.series_id = musicStory.series_id;
      this.data.meta = musicStory.meta[0];
      let musicStoryid = musicStory.id;
      this.musicStoryid = musicStoryid;
    },

    editedFunction(e) {
      e.preventDefault();
      const formData = new FormData();
      for (var key in this.data) {
        console.log(key, this.data[key]);
        formData.append(key, this.data[key]);
      }
      this.editLoad = true;
      this.$api
        .post(`admin/audio/stories/${this.musicStoryid}`, formData)
        .then(({ data }) => {
          console.log("edited", data);
          this.refreshtitle();
          this.editLoad = false;
          this.create_title = false;
          this.image = null;
          this.errors = [];
        })
        .catch((e) => {
          let error = this.$plugins.reader.error(e);
          this.editLoad = false;

          this.errors = error.errors || {};
          this.$helper.notify(error.message || error, error.status || "error");
        });
    },
    deleteMusicStories(id) {
      console.log(id);
      const ids =
        (id && typeof id === "string") || typeof id === "number"
          ? [id]
          : this.selected.map((e) => e.id);
      this.$helper
        .notify(
          "Are you sure you want to delete ? ",
          "delete",
          true,
          "Yes, Delete!"
        )
        .onOk(() => {
          if (id) this.loaders.deleteBtn[id] = true;
          this.loaders.delete = true;
          this.$api
            .delete(`admin/audio/stories/${id}`)
            .then((response) => {
              this.loaders.delete = false;
              if (id) this.loaders.deleteBtn[id] = false;

              this.selected = [];
              this.refreshtitle();
            })
            .catch((response) => {
              console.log(response);
              this.loaders.delete = false;
              if (id) this.loaders.deleteBtn[id] = false;
            });
        });
    },

    refreshtitle() {
      if (this.curl !== "") {
        this.loading = true;
        this.$api
          .get(this.curl)
          .then(({ data }) => {
            this.loading = false;
            this.rows = data.data;
            console.log(data);
          })
          .catch(({ response }) => {
            console.log(response);
            this.loading = false;
            this.rows = [];
          });
      }
    },

    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");
      const status = exportFile("fruitbay-management.csv", content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

select {
  border: 1px solid #aaa9a9;
  width: 100%;
  padding: 0.6rem 0.5rem;
}

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
  height: 10vh;
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
  /* background: #000; */
  color: #000;
  border: 1px solid #00000033;
  /* border: none; */
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

  .kl {
    padding: 0.5rem;
  }

  .wrapper {
    padding: 0.5rem;
  }
}

@media (max-width: 800px) {
  .mobile_set {
    flex-direction: column;
  }
}
</style>
