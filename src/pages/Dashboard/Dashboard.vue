<template>
  <q-page class="q-pa-lg table_page">
    <div class="route_name">
      <div class="text-h6">Hey There!</div>
    </div>
    <div class="q-gutter-y-md full-width q-mt-md">
      <q-card style="border-radius: 15px" flat class="q-px-sm q-py-md">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          no-caps
        >
          <q-tab name="category" label="Category" />
          <q-tab name="series" label="Series" />
          <q-tab name="musicstories" label="Music stories" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="category">
            <Categories />
          </q-tab-panel>
          <q-tab-panel name="series">
            <Series />
          </q-tab-panel>
          <q-tab-panel name="musicstories">
            <Musicstories />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import Categories from "src/components/dashboard/Categories.vue";
import Musicstories from "src/components/dashboard/Musicstories.vue";
import Series from "src/components/dashboard/Series.vue";

export default {
  setup() {
    return {
      tab: ref("category"),
    };
  },
  components: { Categories, Musicstories, Series },
};
</script>
