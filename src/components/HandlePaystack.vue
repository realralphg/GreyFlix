<template>
  <q-btn
    @click="initializeNewPayment()"
    :label="!noLabel ? label : null"
    v-if="!hidden"
  >
    <q-tooltip v-if="tooltip">
      <q-icon v-if="tooltipIcon" :name="tooltipIcon" /> {{ tooltip }}
    </q-tooltip>
  </q-btn>

  <div v-if="showVerifiedmessage" class="sho">
    <div class="ticket-wrap">
      <p class="text-center text-weight-bold text-green">
        {{ verifiedMsg }}
      </p>
      <div class="detailwrap">
        <div class="left bg-white q-pa-sm">
          <img :src="verifiedData.qr_code" alt="" />
        </div>
        <div class="right">
          <p>
            User: {{ verifiedData.user.firstname }}
            {{ verifiedData.user.lastname }}
          </p>
          <p>Name: {{ verifiedData.ticket.event.name }}</p>
          <p>Location: {{ verifiedData.ticket.event.location }}</p>
          <!-- <p class="fee">Fee: ₦{{ this.$store.auth.loggedPay }}</p> -->
          <p>Description: {{ verifiedData.ticket.description }}</p>

          <p>Category: {{ verifiedData.ticket.event.category.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSpinnerPuff } from "quasar";
export default {
  name: "TPaystack",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    confirmation: {
      type: [String, Object],
    },
    successMessage: {
      type: [String, Object, Boolean],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    dontVerify: {
      type: Boolean,
      default: false,
    },
    endpoint: {
      type: [String, Object],
      validator: (e) => {
        if (typeof e === "string") {
          return e.length > 0;
        } else if (typeof e === "object") {
          // Check if the object has the required properties
          return e.hasOwnProperty("init") || e.hasOwnProperty("verify");
        }
        return false;
      },
      initEndpoint: {
        type: String,
        default: "/payment/initialize",
      },
    },
    label: {
      type: String,
      default: "Pay Now",
    },
    tooltip: {
      type: String,
      default: null,
    },
    tooltipIcon: {
      type: String,
      default: null,
    },
    noLabel: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "success",
    "error",
    "verified",
    "initialized",
    "closed",
    "init",
    "destroyed",
  ],
  watch: {
    data: {
      handler(data) {},
    },
  },
  data() {
    return {
      showVerifiedmessage: false,
      verifiedData: {},
      verifiedMsg: "",
    };
  },
  created() {
    this.$emit("init", this);
  },
  mounted() {
    this.$emit("init", this);
    console.log(this.$store.auth.loggedPay);
    // console.log("first");
    if (this.$route.query.trxref && !this.dontVerify) {
      this.verifyPayment(this.$route.query.trxref);
    }
  },
  beforeUnmount() {
    this.$emit("destroyed", this);
  },
  methods: {
    initializeNewPayment() {
      if (this.confirmation) {
        this.$helper
          .notify({
            status: this.confirmation.color || "info",
            message:
              typeof this.confirmation === "object"
                ? this.confirmation.message
                : this.confirmation,
            alert: true,
            ok: this.confirmation.ok || "Continue",
            cancel: this.confirmation.cancel || "Cancel",
            title: this.confirmation.title || "Confirm",
          })
          .onOk(() => {
            this.initialize();
          });
      } else {
        this.initialize();
      }
    },
    showLoading(show = true) {
      show &&
        this.$q.loading.show({
          message: "Your request is proccessing. Hold on an minute...",
          spinner: QSpinnerPuff,
        });
    },
    initialize() {
      this.$q.loading.show();
      let endpoint =
        typeof this.endpoint === "object" ? this.endpoint.init : this.endpoint;
      this.$api
        .post(endpoint || this.initEndpoint, {
          ...this.data,
          inline: this.$q.platform.is.mobile,
        })
        .then(({ data }) => {
          this.$emit("initialized", data, this.data);
          console.log(data);
          const payload = data.data.payload || data.payload || {};
          if (this.$q.platform.is.mobile) {
            console.log("mobile");
            this.$q.loading.hide();
            return this.paystack(
              data.data.amount,
              payload.data.reference
            ).openIframe();
          } else {
            setTimeout((e) => {
              this.$q.loading.hide();
              this.showLoading();
              window.location.href = payload.data.authorization_url;
            }, 10000);
          }
        })
        .catch((e) => {
          this.$q.loading.hide();
          this.$q.notify({
            message: "Hey, Please fill in all fields",
            color: "red",
            position: "top",
          });
          // let error = this.$plugins.reader.error(e);
          // this.$helper.notify(error.message || error, error.status || "error");
          // this.$emit("error", error);
        });
    },
    verifyPayment(reference) {
      console.log("first");
      let endpoint =
        typeof this.endpoint === "object"
          ? this.endpoint.verify
          : this.endpoint;
      if (!endpoint) {
        return;
      }
      this.$q.loading.show();
      this.$api
        .get(endpoint, {
          params: {
            trxref: this.$route.query.trxref,
            reference: reference,
          },
        })
        .then(({ data }) => {
          console.log(data.data);
          this.verifiedData = data.data[0];
          this.showVerifiedmessage = true;
          this.verifiedMsg = data.message;

          this.$q.loading.hide();
          this.$emit("verified", data);

          const amount = this.$helper.money(
            data.amount || data.data.amount || 0
          );
          const routeTo = {
            query: {
              ...this.$route.query,
              trxref: undefined,
              reference: undefined,
            },
          };
          if (this.successMessage && typeof this.successMessage === "object") {
            this.$helper
              .notify({
                status: this.successMessage.color || "info",
                message: data.message,
                alert: true,
                ok: this.successMessage.ok,
                cancel: this.successMessage.cancel,
                title: this.successMessage.title,
              })
              .onOk(() => {
                if (
                  this.successMessage.onOk &&
                  typeof this.successMessage.onOk === "function"
                ) {
                  this.successMessage.onOk(data, () =>
                    this.$router.replace(routeTo)
                  );
                }
              });
          } else if (
            this.successMessage &&
            typeof this.successMessage === "boolean"
          ) {
            this.$helper
              .notify({
                status: data.status || "success",
                message: (data.message || "").replace("{amount}", amount),
                alert: true,
                ok: "Continue",
                cancel: false,
                title: "Payment Complete",
              })
              .onOk(() => {
                this.$router.replace(routeTo);
              });
          } else if (this.successMessage) {
            this.$helper.notify(
              (this.successMessage.message || "").replace("{amount}", amount)
            );
          } else {
            this.$router.replace(routeTo);
          }
        })
        .catch((e) => {
          this.$q.loading.hide();
          let error = this.$plugins.reader.error(e);
          this.$helper.notify(error.message || error, error.status || "error");
          this.$emit("error", error);
        });
    },
    paystack(amount = 0, ref = null) {
      return PaystackPop.setup({
        key: "pk_test_9787e124516f80ee1b6c0567545289fa1e528f76", // Replace with your public key
        // key: this.$boot.settings.paystack_public_key, // Replace with your public key
        email: this.$store.auth.userDetails.data.email,
        amount: amount * 100,
        ref: ref,
        label:
          this.$store.auth.userDetails.data.firstname +
          this.$store.auth.userDetails.data.lastname,
        onClose: () => {
          this.$helper.notify("Transaction cancelled.", "error");
          this.$api.delete("/payment/terminate", {
            data: { reference: ref },
          });
          this.$emit("closed", { reference: ref });
        },
        callback: (response) => {
          this.$emit("success", response);
          this.$router.push({
            name: "user.payment.verify.ref",
            params: {
              ref: response.reference,
              reference: response.reference,
            },
          });
        },
      });
    },
  },
};
</script>

<style scoped>
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
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
