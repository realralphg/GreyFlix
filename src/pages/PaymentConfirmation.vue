<template>
  <main class="main">
    <div class="row q-mr-none q-mx-md-lg q-my-md q-py-xl">
      <div class="col-12 col-md-12 q-pl-md-md">
        <q-card flat class="tf-rounded-5 q-pa-xl" v-if="!loading">
          <q-banner
            dense
            rounded
            class="text-white"
            :class="classes2[paymentStatus]"
            v-if="paymentMessage && !loading"
          >
            <template v-slot:avatar>
              <q-icon name="info" color="white" />
            </template>

            {{ paymentMessage }}
          </q-banner>
          <div class="items-center text-center column" v-if="status_info">
            <div
              class="flex items-center justify-center tf-w-100 tf-h-100 tf-rounded-full q-mb-md"
              :class="classes[paymentStatus]"
            >
              <q-icon
                :name="`fa-solid ${icon[paymentStatus] || icon.error}`"
                color="white"
                size="4rem"
              />
            </div>
            <h4 class="text-h4 tf-max-w-600 q-my-lg text-grey-9 tf-font-anton">
              {{ status_info.message }}
            </h4>
            <h6 class="text-h6 tf-max-w-600 text-grey-7 q-mb-sm tf-font-hero">
              {{ status_info.info }}
            </h6>

            <q-btn
              to="/greyacademy"
              class="q-mt-md"
              color="green"
              icon-right="fa-solid fa-arrow-right"
              no-caps
              label="Go Home"
            />
            <!-- <q-btn
              :to="successRoute.route"
              class="q-mt-md"
              color="green"
              icon-right="fa-solid fa-arrow-right"
              no-caps
              :label="successRoute.label"
            /> -->
          </div>
        </q-card>
      </div>
    </div>
  </main>
</template>

<script>
import { QSpinnerPuff, useMeta } from "quasar";
export default {
  name: "PaymentConfirmation",
  setup() {
    useMeta({
      title: "Payment Confirmation",
    });
  },
  data() {
    return {
      successRoute: {
        route: { name: "user.transactions" },
        label: "View Transactions",
      },
      loading: false,
      value: 0,
      paymentMessage: "Request Failed",
      status_info: null,
      paymentStatus: "info",
      icon: {
        success: "fa-check",
        error: "fa-times",
        info: "fa-info",
      },
      classes: {
        success: "tf-green-10",
        error: "tf-red-10",
        info: "tf-blue-10",
      },
      classes2: {
        success: "bg-positive",
        error: "bg-negative",
        info: "bg-info",
      },
    };
  },
  created() {
    this.$q.loading.show({ spinner: QSpinnerPuff });
    this.loading = true;
    const ref = this.$route.query.reference || this.$route.params.ref;
    console.log(this.$route);
    const query = `?trxref=${ref}&reference=${ref}`;
    this.$api
      .get(`/payment/paystack/verify${query}`)
      .then(({ data }) => {
        this.loading = false;
        this.$q.loading.hide();
        this.paymentMessage = !data.status_info ? data.message : null;
        this.paymentStatus = data.status;
        this.status_info = data.status_info || null;
        if (data.data.type === "company") {
          this.successRoute = {
            route: {
              name: "account.companies",
              params: { id: data.data.company.id },
            },
            label: "Goto my companies",
          };
        } else if (
          data.data.type === "service" ||
          data.data.type === "inventory"
        ) {
          this.$store.user.emptyCart(true);
          this.successRoute = {
            route: { name: "user.transactions" },
            label: "Goto my transactions",
          };
        }
      })
      .catch((e) => {
        this.loading = false;
        this.$q.loading.hide();
        let error = this.$plugins.reader.error(e);
        this.paymentMessage = error.message || error;
        this.$helper.notify(error.message || error, error.status || "error");
      });
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
