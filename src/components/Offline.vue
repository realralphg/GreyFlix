<template>
  <v-offline @detected-condition="amIOnline" ping-url="https://google.com">
    <q-dialog
      v-model="offline"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white text-grey" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-center">
            {{ offline ? "Offline" : "Online" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none no-wrap text-center">
          <div class="column no-wrap flex-center">
            <i class="ri-signal-wifi-off-fill text-grey ri-3x"></i>
          </div>
          Please connect to the internet...
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              class="glossy q-px-lg"
              rounded
              color="deep-orange"
              padding="5px"
              icon="cloud_sync"
              label="Reconnect"
              @click="$router.go(0)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </v-offline>
</template>

<script>
import { ref } from "vue";
import { VOffline } from "v-offline";

export default {
  components: {
    VOffline,
  },
  methods: {
    amIOnline(e) {
      this.offline = !e;
    },
  },
  setup() {
    return {
      offline: ref(false),
    };
  },
};
</script>
