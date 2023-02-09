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
  setup() {
    return {};
  },

  created() {
    this.$emit("init", this);
  },
  mounted() {
    this.$emit("init", this);
    if (this.$route.query.trxref && !this.dontVerify) {
      console.log(this.$route.query.trxref);
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
          let error = this.$plugins.reader.error(e);
          this.$helper.notify(error.message || error, error.status || "error");
          this.$emit("error", error);
        });
    },
    verifyPayment(reference) {
      console.log(reference);
      let endpoint =
        typeof this.endpoint === "object"
          ? this.endpoint.verify
          : this.endpoint;

      console.log(endpoint);
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
                message: (this.successMessage.message || "").replace(
                  "{amount}",
                  amount
                ),
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
