<template>
  <div v-if="loading" class="loading">
    <q-spinner-bars size="4rem" color="purple" />
  </div>
  <q-page class="page container">
    <div class="row justify-between items-center">
      <!-- <div class="col-md-6 col-sm-12 col-xs-12">
        <h4 class="text-white text-weight-bold">
          {{ data[0].event.name }}
        </h4>
        <p class="text-white text-weight-bold">
          {{ data[0].event.description }}
        </p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img :src="data[0].event.category.image_url" alt="" />
      </div> -->
    </div>

    <EventsTickets :datas="data" />
    <Footer />
  </q-page>
</template>

<script>
import Footer from "../components/Footer.vue";
import EventsTickets from "../components/EventsTickets.vue";
export default {
  components: {
    Footer,
    EventsTickets,
  },

  //   watch: {
  //     "$route.params.slug": {
  //       handler(slug) {
  //         this.getEvents(slug);
  //       },
  //       immediate: true,
  //     },
  //   },

  data() {
    return {
      data: [],
      loading: true,
    };
  },

  created() {
    this.getEvents();
  },

  methods: {
    getEvents() {
      let params = this.$router.currentRoute.value.params;
      this.loading = true;
      this.$api
        .get(`events/${params.slug}/tickets`)
        .then(({ data }) => {
          console.log("added", data);
          this.data = data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
}
p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 40px;
  letter-spacing: 0.03em;
  color: #ffffff;
}

div {
  margin: 2rem 0;
}

small {
  font-weight: 500;
  font-size: 0.75rem;
}
</style>
