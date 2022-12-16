<template>
  <div class="style q-pa-md">
    <q-table
      title="Categories"
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
          label="Create Categories"
          padding="sm"
          class="q-mr-xs"
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

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          padding="xs"
          v-if="rows.length"
          @click="exportTable"
        />
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
              @click="deletecategories(props.value)"
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
              @click="editcategories(props.row)"
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
  <q-dialog v-model="create_Page">
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
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form
          @submit.prevent="createPage"
          class="q-gutter-md"
          ref="fruitbayForm"
        >
          <div class="row q-gutter-sm">
            <div class="col">
              <q-item-label class="q-pb-xs">Image</q-item-label>

              <q-file
                dense
                color="teal"
                outlined
                name="file"
                accept=".jpg,.png,.svg,.jpeg"
                v-model="image"
                label="Image"
                @update:model-value="setFile"
              >
              </q-file>
            </div>
          </div>

          <div class="row q-gutter-sm">
            <div class="col">
              <q-item-label class="q-pb-xs">Page</q-item-label>
              <q-input dense outlined name="page" v-model="page" label="Page" />
              <div class="error" v-if="errors.page">{{ errors.page[0] }}</div>
            </div>
            <div class="col">
              <q-item-label class="q-pb-xs">Chapter Id</q-item-label>
              <q-input
                dense
                outlined
                name="chapter_id"
                type="text"
                v-model="chapter_id"
                label="Chapter Id"
              />
              <div class="error" v-if="errors.chapter_id">
                {{ errors.chapter_id[0] }}
              </div>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-item-label class="q-pb-xs">Content id</q-item-label>
              <q-input
                dense
                outlined
                name="content_id"
                v-model="content_id"
                label="Content id"
              />
              <div class="error" v-if="errors.content_id">
                {{ errors.content_id[0] }}
              </div>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-item-label class="q-pb-xs">Meta</q-item-label>
              <q-input
                dense
                outlined
                type="textarea"
                name="meta"
                v-model="meta"
                label="Meta"
              />
              <div class="error" v-if="errors.meta">
                {{ errors.meta[0] }}
              </div>
            </div>
          </div>

          <q-card-actions align="right" class="text-teal">
            <q-btn
              v-if="!editstate"
              label="Save"
              type="submit"
              color="primary"
              @click="createPage"
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
    name: "page",
    required: true,
    label: "Page",
    align: "left",
    field: "page",
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
    name: "meta",
    required: true,
    label: "Meta",
    align: "left",
    field: "meta",
    // field: (row) => row.meta.substr(0, 50),
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
      title: "Create Categories",
    });
  },
  data() {
    return {
      columns,
      selected: [],
      category: null,
      categories: [],
      rows: [],
      errors: [],
      fruitbay: {},
      image: null,
      page: "",
      pageid: "",
      chapter_id: "",
      content_id: "",
      files: null,
      editstate: false,
      createstate: null,
      meta: "",
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      role: "fruitbay",
      new_fruitbay: false,
      loading: false,
      editLoad: false,
      create_Page: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  computed: {
    CategoriesNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
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
      const url = `admin/contents/65/chapters/22/Categories?limit=${100}`;
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
      this.create_Page = true;
      this.page = "";
      this.chapter_id = "";
      this.content_id = "";
      this.image = "";
      this.meta = "";
    },
    createPage(e) {
      e.preventDefault();

      let page = this.page;
      let chapter_id = this.chapter_id;
      let content_id = this.content_id;
      let meta = this.meta;
      let file = this.image;

      const formData = new FormData();
      formData.append("page", page);
      formData.append("chapter_id", chapter_id);
      formData.append("content_id", content_id);
      formData.append("meta", meta);
      formData.append("file", file);
      this.loading = true;
      this.$api
        .post(
          `admin/contents/${content_id}/chapters/${chapter_id}/Categories`,
          formData
        )
        .then(({ data }) => {
          console.log("added", data);
          this.refreshPage();
          this.loading = true;

          this.create_Page = false;
          this.image = null;
          this.errors = [];
          this.$q.notify({
            message: data.message,
            color: "green",
            position: "top",
          });
        })
        .catch((e) => {
          let error = this.$plugins.reader.error(e);
          this.errors = error.errors || {};
          this.loading = false;

          this.$helper.notify(error.message || error, error.status || "error");
          this.$q.notify({
            message: "Error",
            color: "red",
            position: "top",
          });
        });
    },
    editcategories(manga) {
      this.editstate = true;
      this.create_Page = true;
      console.log(manga);
      this.meta = manga.meta;
      this.chapter_id = manga.chapter_id;
      this.content_id = manga.chapter.content_id;
      this.page = manga.page;
      let pageid = manga.id;
      this.pageid = pageid;
    },

    editedFunction(e) {
      e.preventDefault();
      let pageid = this.pageid;
      let page = this.page;
      let chapter_id = this.chapter_id;
      let content_id = this.content_id;
      let meta = this.meta;
      let file = this.image;

      console.log(this.chapter_id, this.content_id, this.pageid);

      const formData = new FormData();
      formData.append("page", page);
      formData.append("chapter_id", chapter_id);
      formData.append("content_id", content_id);
      formData.append("meta", meta);
      formData.append("_method", "PUT");

      formData.append("file", file);
      this.editLoad = true;
      this.$api
        .post(
          `admin/contents/${content_id}/chapters/${chapter_id}/Categories/${pageid}`,
          formData
        )
        .then(({ data }) => {
          console.log("edited", data);
          this.refreshPage();
          this.editLoad = false;
          this.create_Page = false;
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
    deletecategories(id) {
      console.log(id);
      const ids =
        (id && typeof id === "string") || typeof id === "number"
          ? [id]
          : this.selected.map((e) => e.id);
      this.$helper
        .notify(
          "Are you sure you want to delete this fruitbay(s)? This action may be irreversible!",
          "error",
          true,
          "Yes, Delete!"
        )
        .onOk(() => {
          if (id) this.loaders.deleteBtn[id] = true;
          this.loaders.delete = true;
          this.$api
            .delete(`admin/contents/65/chapters/22/Categories/${id}`)
            .then((response) => {
              this.loaders.delete = false;
              if (id) this.loaders.deleteBtn[id] = false;

              this.selected = [];
              this.refreshPage();
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
        .delete("admin/contents/1/chapters/1/Categories", {
          params: { items: ids },
        })
        .then((response) => {
          this.loaders.delete = false;
          if (id) this.loaders.deleteBtn[id] = false;
          this.selected = [];
          this.refreshPage();
        })
        .catch((response) => {
          console.log(response);
          this.loaders.delete = false;
          if (id) this.loaders.deleteBtn[id] = false;
        });
    },

    refreshPage() {
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
</style>
