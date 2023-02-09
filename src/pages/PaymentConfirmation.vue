<template>
  <main class="main">
    <HandlePaystack
      hidden
      :endpoint="`events/${this.$store.auth.ticket.event.id}/tickets/${this.$store.auth.ticket.id}/verify`"
      :data="{
        method: 'card',
      }"
      @verified="(e) => {}"
      @error="(e) => {}"
    />
  </main>
</template>

<script>
import { QSpinnerPuff, useMeta } from "quasar";
import HandlePaystack from "../components/HandlePaystack.vue";
export default {
  name: "PaymentConfirmation",
  setup() {
    useMeta({
      title: "Payment Confirmation",
    });
  },
  components: {
    HandlePaystack,
  },
};
</script>
<style scoped>
.main {
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

@media (max-width: 800px) {
  .main {
    width: 90%;
  }
}
</style>
