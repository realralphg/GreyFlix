<template>
  <div class="style q-pa-md">
    <q-table
      title="Ticketing"
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
          @click="createCategory"
          color="red"
          label="Create Ticketing"
          padding="sm"
          class="q-ma-xs"
        />

        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

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
            <img :src="props.row.image_url" />
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
              @click="deleteTicketing(props.value)"
            >
              <q-tooltip>Delete {{ props.row.name }}</q-tooltip>
            </q-btn>

            <!-- {{ TicketingNumber }} -->

            <q-btn
              round
              dense
              glossy
              color="info"
              size="sm"
              class="q-ml-sm"
              icon="edit"
              :loading="loaders.save[props.value]"
              @click="editTicketing(props.row)"
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
          Create Category
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
          ></q-btn>
        </div>
      </q-card-section>
      <!-- <q-separator inset></q-separator> -->

      <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        header-nav
        animated
      >
        <q-step
          :name="1"
          title="Event Information"
          icon="info"
          :done="step > 1"
        >
          <q-card-section class="q-pt-none">
            <q-form
              @submit.prevent="createtitle"
              class="q-gutter-md"
              ref="fruitbayForm"
            >
              <!-- <p class="text-weight-bold">Event Information</p> -->
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Flyer</q-item-label>
                  <q-file
                    dense
                    color="teal"
                    outlined
                    model-value
                    name="image"
                    accept=".jpg,.png,.svg,.jpeg"
                    v-model="image"
                    label="Image"
                  >
                  </q-file>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Location</q-item-label>
                  <q-input
                    dense
                    color="teal"
                    outlined
                    name="image"
                    accept=".jpg,.png,.svg,.jpeg"
                    v-model="image"
                    label="Image"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Name</q-item-label>
                  <q-input
                    dense
                    outlined
                    name="title"
                    v-model="title"
                    label="Title"
                  />
                  <div class="error" v-if="errors.title">
                    {{ errors.title[0] }}
                  </div>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Category</q-item-label>
                  <select name="" v-model="type" id="">
                    <option value="movie">Movie</option>
                    <option value="animation">Animation</option>
                    <option value="nft">NFT</option>
                    <option value="art">Art</option>
                    <option value="musicstories">Music stories</option>
                  </select>
                  <div class="error" v-if="errors.type">
                    {{ errors.type[0] }}
                  </div>
                </div>
              </div>
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Starts</q-item-label>
                  <q-input
                    dense
                    outlined
                    name="title"
                    v-model="title"
                    label="Title"
                  />
                  <div class="error" v-if="errors.title">
                    {{ errors.title[0] }}
                  </div>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Ends</q-item-label>
                  <q-input
                    dense
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

              <div class="row q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Description</q-item-label>
                  <q-input
                    dense
                    outlined
                    type="textarea"
                    name="description"
                    v-model="description"
                    label="description"
                  />
                  <div class="error" v-if="errors.description">
                    {{ errors.description[0] }}
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-step>

        <q-step
          :name="2"
          title="Ticket Information"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-card-section class="q-pt-none">
            <div class="row q-gutter-sm">
              <div class="col">
                <q-item-label class="q-pb-xs">Ticket Name</q-item-label>
                <q-input
                  dense
                  color="teal"
                  outlined
                  name="image"
                  v-model="image"
                  label="Image"
                >
                </q-input>
              </div>
            </div>

            <div class="row q-my-md items-center q-gutter-sm">
              <p>Ticket Type</p>
              <q-radio
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="line"
                label="Free"
              />
              <q-radio
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="rectangle"
                label="Paid"
              />
            </div>

            <div class="row q-gutter-sm">
              <div class="col">
                <q-item-label class="q-pb-xs">Max Per Order</q-item-label>
                <q-input
                  dense
                  outlined
                  name="title"
                  v-model="title"
                  label="Title"
                />
                <div class="error" v-if="errors.title">
                  {{ errors.title[0] }}
                </div>
              </div>
              <div class="col">
                <q-item-label class="q-pb-xs">Quantity Available</q-item-label>
                <q-input
                  dense
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
            <div class="row q-mt-sm q-gutter-sm">
              <div class="col">
                <q-item-label class="q-pb-xs">Sales Begin</q-item-label>
                <q-input
                  dense
                  outlined
                  name="title"
                  v-model="title"
                  label="Title"
                />
                <div class="error" v-if="errors.title">
                  {{ errors.title[0] }}
                </div>
              </div>
              <div class="col">
                <q-item-label class="q-pb-xs">Sales Ends</q-item-label>
                <q-input
                  dense
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

            <div class="row q-mt-sm q-gutter-sm">
              <div class="col">
                <q-item-label class="q-pb-xs">Brief Description</q-item-label>
                <q-input
                  dense
                  outlined
                  type="textarea"
                  name="description"
                  v-model="description"
                  label="description"
                />
                <div class="error" v-if="errors.description">
                  {{ errors.description[0] }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 4 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<script>
import { exportFile, useMeta } from "quasar";
import { ref } from "vue";
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

  {
    name: "description",
    required: true,
    label: "description",
    align: "left",
    field: "description",
    // field: (row) => row.description.substr(0, 50),
    sortable: true,
  },

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
      title: "Create Ticketing",
    });
  },
  data() {
    return {
      columns,
      priority: 1,
      selected: [],
      category: null,
      Ticketing: [],
      step: ref(1),
      rows: [],
      errors: [],
      fruitbay: {},
      image: ref(null),
      title: "",
      titleid: "",
      chapter_id: "",
      content_id: "",
      files: null,
      editstate: false,
      createstate: null,
      description: "",
      type: "",
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      categoryid: "",
      loading: false,
      editLoad: false,
      create_title: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  computed: {
    TicketingNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPertitle);
    },
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },

  methods: {
    onRequest(props) {
      this.loading = true;
      const url = `admin/categories`;
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

    createCategory() {
      this.editstate = false;
      this.create_title = true;
      this.title = "";
      this.chapter_id = "";
      this.content_id = "";
      this.image = null;
      this.description = "";
    },
    createtitle(e) {
      e.preventDefault();

      let title = this.title;
      let priority = this.priority;
      let type = this.type;
      let description = this.description;
      let image = this.image;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("priority", priority);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("image", image);
      this.loading = true;
      this.$api
        .post(`admin/Ticketing`, formData)
        .then(({ data }) => {
          console.log("added", data);
          this.refreshtitle();
          this.loading = true;

          this.create_title = false;
          this.image = null;
          this.errors = [];
          this.$q.notify({
            message: data.message,
            color: "green",
            position: "top",
          });
        })
        .catch((e) => {
          this.loading = false;
          this.$q.notify({
            message: "Error",
            color: "red",
            position: "top",
          });
        });
    },
    editTicketing(category) {
      this.editstate = true;
      this.create_title = true;
      console.log(category);
      this.description = category.description;
      this.priority = category.priority;
      this.type = category.type;
      this.title = category.title;
      this.image = category.image;
      let categoryid = category.id;
      this.categoryid = categoryid;
    },

    editedFunction(e) {
      e.preventDefault();
      let categoryid = this.categoryid;
      let title = this.title;
      let type = this.type;
      let priority = this.priority;
      let description = this.description;
      let image = this.image;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("type", type);
      formData.append("priority", priority);
      formData.append("description", description);
      formData.append("_method", "PUT");
      formData.append("image", image);
      this.editLoad = true;
      this.$api
        .post(`admin/Ticketing/${categoryid}`, formData)
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
    deleteTicketing(id) {
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
            .delete(`admin/contents/65/chapters/22/Ticketing/${id}`)
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

    deletemultiple(id) {
      const ids =
        (id && typeof id === "string") || typeof id === "number"
          ? [id]
          : this.selected.map((e) => e.id);

      console.log(ids);
      this.$api
        .delete("admin/contents/1/chapters/1/Ticketing", {
          params: { items: ids },
        })
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
p {
  margin-bottom: 0;
}
select {
  border: 1px solid #aaa9a9;
  width: 100%;
  padding: 0.6rem 0.5rem;
}
</style>
