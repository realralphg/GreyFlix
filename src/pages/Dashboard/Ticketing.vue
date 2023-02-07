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
          <q-tab name="events" label="Events" />
          <!-- <q-tab name="eventsTickets" label="Events Tickets" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="events">
            <Events />
          </q-tab-panel>
          <!-- <q-tab-panel name="eventsTickets">
            <EventTicket />
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import Events from "src/components/dashboard/Events.vue";
import EventTicket from "src/components/dashboard/EventTicket.vue";

export default {
  setup() {
    return {
      tab: ref("events"),
    };
  },
  components: { Events, EventTicket },
};
</script>
