<template>
  <div class="wrapper">
    <h1 class="text-white text-h4">Hi Rebecca!</h1>

    <div class="file q-mt-lg">
      <q-file
        color="teal"
        style="width: 80%"
        name="File"
        filled
        class="text-white"
        v-model="model"
        label="Audio File"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      model: ref(null),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: #212121;
  height: 100vh;
  padding: 3rem;
}

.q-field {
  height: 80vh;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 0 0;
}
</style>
