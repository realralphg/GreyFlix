<template>
  <div class="row page justify-between items-center re-column">
    <div class="werap col-md-8 col-sm-12 col-xs-12">
      <div class="container">
        <div class="logo q-mt-lg q-mb-xl mobile-only">
          <img style="width: 200px" src="images/simplelogo.png" alt="" />
        </div>
        <form @submit.prevent="checkVerificationCode" v-if="verifycode">
          <p class="text-weight-medium text-white">
            Enter the code you received to continue.
          </p>
          <div class="input-wrap">
            <label class="text-primary text-weight-bold" for=""
              >Enter Reset Code</label
            >
            <br />

            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
              "
              class="otp"
            >
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input Signika"
                separator="-"
                :num-inputs="6"
                :should-auto-focus="true"
                :is-input-num="true"
                :conditionalClass="[
                  'one',
                  'two',
                  'three',
                  'four',
                  'five',
                  'six',
                ]"
                :placeholder="[
                  placeholder,
                  placeholder,
                  placeholder,
                  placeholder,
                  placeholder,
                  placeholder,
                ]"
                @on-complete="handleOtpInputComplete"
              />
            </div>
            <div class="error" v-if="errors.code">
              {{ errors.code }}
            </div>
          </div>

          <div class="button q-pt-xl text-center">
            <q-btn :loading="loading" type="submit" class="btn q-py-sm q-px-xl"
              >Verify</q-btn
            >
          </div>
        </form>
        <form @submit.prevent="updatePassword" v-if="iscodeverified">
          <p class="text-weight-medium text-grey-7">Change your password.</p>
          <div class="input-wrap">
            <label class="text-primary" for="">Password</label> <br />

            <div class="input">
              <i class="ri-lock-password-line q-mr-md text-primary"></i>

              <input
                v-model="form.password"
                :type="is_password ? 'password' : 'text'"
                name="password"
                placeholder="Password"
                autocomplete="off"
              />
              <q-btn
                class="q-ml-md"
                type="button"
                style="font-size: 18px"
                @click="is_password = !is_password"
                ><i
                  :class="`${
                    is_password ? 'ri-eye-line' : 'ri-eye-off-line'
                  } text-primary`"
                ></i
              ></q-btn>
            </div>
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="input-wrap">
            <label class="text-primary" for="">Repeat Password</label> <br />

            <div class="input">
              <i class="ri-lock-password-line q-mr-md text-primary"></i>

              <input
                v-model="form.password_confirmation"
                :type="is_passwordConfirmation ? 'password' : 'text'"
                ref="password2"
                name="password_confirmation"
                placeholder="Repeat Password"
                autocomplete="off"
              />
              <q-btn
                class="q-ml-md"
                type="button"
                style="font-size: 18px"
                @click="is_passwordConfirmation = !is_passwordConfirmation"
                ><i
                  :class="`${
                    is_passwordConfirmation ? 'ri-eye-line' : 'ri-eye-off-line'
                  } text-primary`"
                ></i
              ></q-btn>
            </div>
            <div class="error" v-if="errors.password_confirmation">
              {{ errors.password_confirmation }}
            </div>
          </div>

          <div class="button q-pt-xl text-center">
            <q-btn :loading="loading" type="submit" class="btn q-py-sm q-px-xl"
              >Verify</q-btn
            >
          </div>
        </form>

        <p class="text-dark q-mt-md q-pb-sm text-center">
          <q-btn
            flat
            type="a"
            :to="{ name: 'forgot.password' }"
            class="text-primary"
          >
            Request a new code</q-btn
          >
        </p>
      </div>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <div
        class="img mobile-hideable banner"
        style="background-image: url('images/nar.jpg')"
      ></div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "quasar";
export default {
  setup() {
    useMeta(() => {
      return {
        title: "Reset Password",
      };
    });
  },
  data() {
    return {
      placeholder: "•",
      loading: false,
      iscodeverified: false,
      verifycode: true,
      is_password: true,
      is_passwordConfirmation: true,
      errors: [],
      form: {
        code: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  created() {
    this.$watch(
      (e) => this.errors,
      (e) =>
        e.length !== 0 &&
        this.$helper.notify("Please recheck your input!", "error")
    );
  },
  methods: {
    handleOtpInputComplete(code) {
      this.form.code = code;
      this.checkVerificationCode();
    },
    checkVerificationCode() {
      const code = this.form.code;
      if (!code) {
        this.errors = { code: "Please enter the reset code we sent you." };
        return;
      }
      this.loading = true;
      this.$api
        .post("reset-password/check-code", { code })
        .then(({ data }) => {
          this.loading = false;
          this.iscodeverified = true;
          this.verifycode = false;
          this.errors = [];
        })
        .catch(({ response }) => {
          this.loading = false;
          console.log(response);
          this.errors = response.data.errors;
          this.$helper.notify(response.data.errors, "error", false);
        });
    },
    updatePassword() {
      if (!this.form.password) {
        this.errors = { password: "Please enter password." };
        return;
      }
      if (!this.form.password_confirmation) {
        this.errors = { password_confirmation: "Please repeat password." };
        return;
      }
      this.loading = true;
      this.$api
        .post("reset-password", this.form)
        .then(({ data }) => {
          this.loading = false;
          this.errors = [];
          this.$q.loading.hide();
          this.$helper
            .notify(data.message, "success", true, "Go to login")
            .onOk(() => {
              this.$router.replace({ name: "login" });
            });
        })
        .catch(({ response }) => {
          this.loading = false;
          this.$helper.notify(response.data.message, "error", false);
          setTimeout(() => {
            this.errors = [];
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
.page {
  background: url("/images/authbg.png") center center/cover no-repeat;
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.page::before {
  content: "";
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(0deg, transparent, rgba(37, 37, 37, 0.61), #111);
}
.page::after {
  content: "";
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
}
p {
  margin-bottom: 4px;
  font-size: 1.3rem;
}

.werap {
  position: relative;
  z-index: 100;
}
.banner {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.input-wrap {
  margin: 1.2rem 0;
}

.input-wrap,
select {
  width: 100%;
  margin-bottom: 2px;
}
.error {
  font-size: 1.1rem;
  color: #ff0000;
  text-align: center;
}
.input-wrap .input {
  padding: 0.75rem;
  margin: 0.35rem 0;
  margin-bottom: 2px;
  background: rgba(236, 236, 236, 0.67);
  border: 1px solid rgba(229, 229, 229, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.input-wrap .input input,
select {
  border: none;
  padding: 0.45rem;
  background: transparent;
  color: #959292;
  width: 100%;
  cursor: pointer;
}
.input-wrap .input input:focus,
select:focus {
  outline: none;
}
.input-wrap .input .input:hover {
  border: 1px solid #2b945b;
  transition: all 0.5s ease-in-out;
}

label {
  font-size: 1.5rem;
}

.btn {
  border: none;
  background: linear-gradient(
    121.81deg,
    #d31e1e 20.1%,
    #813232 131.87%
  ) !important;
  box-shadow: rgba(211, 30, 30, 0.96) 0px 25px 20px -20px;

  margin: 1rem;
  border-radius: 60px;
  border: 1px solid #d31e1e;
  font-size: 1.1rem !important;
  color: #fff;
  margin: 0.55rem 0;
  padding: 1rem;
  width: 60%;
}
@media (max-width: 500px) {
  .btn {
    width: 90%;
  }
}
@media (max-width: 400px) {
  .input-wrap .input input:placeholder-shown,
  select {
    font-size: 14px;
  }
  .btn {
    padding: 0.6rem;
    width: 90%;
    font-size: 10px;
  }
  p {
    font-size: 0.8rem;
  }
  label {
    font-size: 1rem;
  }
}
@media (max-width: 1024px) {
  .mobile-hideable {
    display: none;
  }

  /* .re-column {
    padding-top: 7em;
  } */
  .logo {
    height: 100px;
    margin-bottom: 1rem;
  }
  .logo img {
    height: 100px;
    object-fit: contain;
  }
}
</style>
