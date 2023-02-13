<template>
  <div class="style q-pa-md">
    <q-table
      title="Events"
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
          @click="createEventbtn"
          color="red"
          label="Create Events"
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
              @click="deleteEvents(props.value)"
            >
              <q-tooltip>Delete {{ props.row.name }}</q-tooltip>
            </q-btn>

            <!-- {{ EventsNumber }} -->

            <q-btn
              round
              dense
              glossy
              color="info"
              size="sm"
              class="q-ml-sm"
              icon="edit"
              :loading="loaders.save[props.value]"
              @click="editEvents(props.row)"
            >
              <q-tooltip>Edit {{ props.row.name }}</q-tooltip>
            </q-btn>
            <q-btn
              round
              dense
              glossy
              color="info"
              size="sm"
              class="q-ml-sm"
              icon="visibility"
              :loading="loaders.save[props.value]"
              :to="{
                name: 'EventTicket',
                params: { id: props.row.id },
              }"
            >
              <q-tooltip>Goto Event {{ props.row.name }}</q-tooltip>
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
          <div v-if="editstate">Edit Events</div>
          <div v-else>Create Events</div>
          <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right close"
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
          title="Ticket Information"
          icon="info"
          :done="step > 1"
        >
          <q-card-section class="q-pt-none">
            <q-form
              @submit.prevent="createEvent"
              class="q-gutter-md"
              ref="fruitbayForm"
            >
              <!-- <p class="text-weight-bold">Event Information</p> -->
              <div class="row mobile_set q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Flyer</q-item-label>
                  <q-file
                    dense
                    color="teal"
                    outlined
                    model-value
                    name="image"
                    accept=".jpg,.png,.svg,.jpeg"
                    v-model="data.image"
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
                    name="location"
                    accept=".jpg,.png,.svg,.jpeg"
                    v-model="data.location"
                    label="Location"
                  >
                  </q-input>
                </div>
              </div>

              <div class="row mobile_set q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Name</q-item-label>
                  <q-input
                    dense
                    outlined
                    name="name"
                    v-model="data.name"
                    label="Name"
                  />
                  <div class="error" v-if="errors.title">
                    {{ errors.title[0] }}
                  </div>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Category</q-item-label>
                  <select name="" v-model="data.category_id" id="">
                    <option
                      v-for="category in categorys"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.title }}
                    </option>
                  </select>
                  <div class="error" v-if="errors.type">
                    {{ errors.type[0] }}
                  </div>
                </div>
              </div>
              <div class="row mobile_set q-gutter-sm">
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Starts</q-item-label>
                  <div>
                    <div class="q-pb-sm q-gutter-sm">
                      <q-badge color="teal">
                        Model: {{ data.starts_at }}
                      </q-badge>
                      <q-badge color="purple" text-color="white">
                        Starts: YYYY-MM-DD HH:mm
                      </q-badge>
                    </div>

                    <q-date
                      name="starts_at"
                      v-model="data.starts_at"
                      mask="YYYY-MM-DD HH:mm:ss"
                    />

                    <q-time
                      v-model="data.starts_at"
                      mask="YYYY-MM-DD HH:mm:ss"
                      color="purple"
                    />
                  </div>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs">Event Ends</q-item-label>
                  <div>
                    <div class="q-pb-sm q-gutter-sm">
                      <q-badge color="teal">
                        Model: {{ data.ends_at }}
                      </q-badge>
                      <q-badge color="purple" text-color="white">
                        Ends: YYYY-MM-DD
                      </q-badge>
                    </div>

                    <q-date
                      name="starts_at"
                      v-model="data.ends_at"
                      mask="YYYY-MM-DD HH:mm:ss"
                    />

                    <q-time
                      v-model="data.ends_at"
                      mask="YYYY-MM-DD HH:mm:ss"
                      color="purple"
                    />
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-step>

        <q-step
          :name="2"
          title="More Information"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          <div class="row items-center q-gutter-sm">
            <p>Collects number</p>
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="1"
              label="True"
              v-model="data.collect_number"
            />
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="0"
              label="False"
              v-model="data.collect_number"
            />
          </div>
          <div class="row items-center q-gutter-sm">
            <p>Collects email</p>
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="1"
              label="True"
              v-model="data.collect_email"
            />
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="0"
              label="False"
              v-model="data.collect_email"
            />
          </div>
          <div class="row items-center q-gutter-sm">
            <p>Allow guests</p>
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="1"
              v-model="data.allow_guests"
              label="True"
            />
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="0"
              label="False"
              v-model="data.allow_guests"
            />
          </div>
          <div class="row items-center q-gutter-sm">
            <p>Is public</p>
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="1"
              v-model="data.is_public"
              label="True"
            />
            <q-radio
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              v-model="data.is_public"
              :val="0"
              label="False"
            />
          </div>
          <div class="row q-mt-md q-gutter-sm">
            <div class="col">
              <q-item-label class="q-pb-xs">Event Description</q-item-label>
              <q-input
                dense
                outlined
                type="textarea"
                name="description"
                v-model="data.description"
                label="description"
              />
              <div class="error" v-if="errors.description">
                {{ errors.description[0] }}
              </div>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="step === 2 ? createEvent() : $refs.stepper.next()"
              color="primary"
              :loading="loading"
              :label="step === 2 ? 'Finish' : 'Continue'"
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
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
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
      title: "Create Events",
    });
  },
  data() {
    return {
      columns,
      priority: 1,
      selected: [],
      category: null,
      categorys: [],
      Events: [],
      step: ref(1),
      rows: [],
      errors: [],
      title: "",
      titleid: "",
      editstate: false,
      createstate: null,
      description: "",
      data: {
        is_public: false,
        collect_number: false,
        collect_email: false,
        allow_guests: false,
        image: null,
        type: "any",
      },
      type: "",
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      categoryid: "",
      loading: false,
      editLoad: false,
      create_title: false,
      eventID: "",
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  computed: {
    EventsNumber() {
      return Math.ceil(this.rows.length / this.pagination.rowsPertitle);
    },
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });

    this.getCategory();
  },

  methods: {
    getCategory() {
      this.$api
        .get(`admin/categories`)
        .then(({ data }) => {
          console.log("added", data);
          this.categorys = data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onRequest(props) {
      this.loading = true;
      const url = `account/events`;
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

    createEventbtn() {
      this.editstate = false;
      this.create_title = true;

      this.data = {
        is_public: false,
        collect_number: false,
        collect_email: false,
        allow_guests: false,
        image: null,
        type: "any",
      };
    },
    createEvent() {
      //   e.preventDefault();
      const formData = new FormData();
      console.log(this.data);

      for (var key in this.data) {
        console.log(key, this.data[key]);
        formData.append(key, this.data[key]);
      }
      this.loading = true;
      this.$api
        .post(`account/events`, formData)
        .then(({ data }) => {
          console.log("added", data);
          this.create_title = false;
          this.refreshPage();
          this.loading = true;
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
    editEvents(event) {
      this.editstate = true;
      this.create_title = true;
      console.log(event);
      this.data.METHOD = "PUT";
      this.data.description = event.description;
      this.data.name = event.name;
      this.data.starts_at = event.start_date + event.start_time;
      this.data.ends_at = event.end_date + event.end_time;
      this.data.location = event.location;
      this.data.category_id = event.category.id;
      this.eventID = event.id;
      let eventID = event.id;
      this.categoryid = eventID;
    },

    editedFunction(e) {
      e.preventDefault();

      const formData = new FormData();
      console.log(this.data);

      for (var key in this.data) {
        console.log(key, this.data[key]);
        formData.append(key, this.data[key]);
      }

      this.editLoad = true;
      this.$api
        .put(`account/events/${this.eventID}`, formData)
        .then(({ data }) => {
          console.log("edited", data);

          this.editLoad = false;
          this.create_title = false;
          this.image = null;
          this.errors = [];
          this.$q.notify({
            message: data.message,
            color: "green",
            position: "top",
          });
          this.refreshPage();
        })
        .catch((e) => {
          let error = this.$plugins.reader.error(e);
          this.editLoad = false;

          this.errors = error.errors || {};
          this.$helper.notify(error.message || error, error.status || "error");
        });
    },
    deleteEvents(id) {
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
            .delete(`account/events/${id}`)
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
p {
  margin-bottom: 0;
}
select {
  border: 1px solid #aaa9a9;
  width: 100%;
  padding: 0.6rem 0.5rem;
}

@media (max-width: 800px) {
  .mobile_set {
    flex-direction: column;
  }
}
</style>
