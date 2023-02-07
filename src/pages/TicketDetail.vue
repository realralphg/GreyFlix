<template>
  <div v-if="loading" class="loading">
    <q-spinner-bars size="4rem" color="purple" />
  </div>
  <div v-if="!loading" class="ticket-wrap">
    <div class="detailwrap">
      <div class="left">
        <img src="/images/artworks/7.jpg" alt="" />
      </div>

      <!-- <p>{{ $route.params }}</p> -->

      <div v-if="loaded" class="right">
        <p>Event: {{ data.event.name }}</p>
        <p>Location: {{ data.event.location }}</p>
        <p class="fee">Fee: ₦{{ data.price }}</p>
        <p>Description: {{ data.description }}</p>
        <p>
          Start Date: {{ data.sales_start_date }}, at
          {{ data.sales_start_time }}
        </p>
        <p>
          Start Date: {{ data.sales_end_date }}, at {{ data.sales_end_time }}
        </p>
        <p>Category: Sports</p>
        <q-btn :to="{ name: 'Purchase' }" color="primary"
          >Purchase Ticket</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },

  "$route.params": {
    handler() {
      console.log();
      this.getTicket();
    },
    immediate: false,
  },

  data() {
    return {
      data: {},
      ticket: {},
      loaded: false,
      loading: true,
    };
  },

  created() {
    this.getTicket();
  },

  methods: {
    getTicket() {
      this.loading = true;
      let params = this.$router.currentRoute.value.params;
      this.$api
        .get(`events/${params.eventID}/tickets/${params.ticketid}`)
        .then(({ data }) => {
          console.log("added", data);
          this.data = data.data;
          this.$store.auth.ticket = data.data;
          this.loaded = true;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
}
p {
  color: white;
  font-size: 16px;
}

p.fee {
  font-weight: 700;
  font-size: 20px;
}
.ticket-wrap {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;
}
.detailwrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(7.86584px);
  border-radius: 44.4188px;
  padding: 2rem;
}

@media (max-width: 500px) {
  .ticket-wrap {
    height: 100%;
    padding: 2rem 0;
  }

  .detailwrap {
    padding: 1rem;
  }
}
</style>
