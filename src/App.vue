<template>
  <router-view />
  <offline />
</template>

<script>
import { defineComponent } from "vue";
import Offline from "components/Offline";
export default defineComponent({
  name: "App",
  components: {
    Offline,
  },
});
</script>
