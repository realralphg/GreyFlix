<template>
  <!-- <div class="wrapper vendor_onboard container">
    <div class="my_container auth">
      <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
        class="no-wrap"
        header-nav
      >
        <q-step :name="1" title="Step 1" icon="settings" :done="step > 1">
          <div class="right q-mt-md">
            <div class="bio">
              <div class="text-h6 q-mb-lg text-center text-weight-bold">
                Create Your Account
              </div>

              <div class="hold">
                <div class="inputs">
                  <div class="holdd">
                    <form
                      enctype="multipart/form-data"
                      id="form"
                      @submit.prevent="saveUser"
                    >
                      <div class="">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          v-model="data.firstname"
                          label="First Name"
                          clearable
                          name="firstname"
                        >
                          <template v-slot:append>
                            <i class="ri-folder-user-line"></i>
                          </template>
                        </q-input>
                      </div>
                      <div class="">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          v-model="data.lastname"
                          label="Last Name"
                          clearable
                          name="lastname"
                        >
                          <template v-slot:append>
                            <i class="ri-folder-user-line"></i>
                          </template>
                        </q-input>
                      </div>

                      <div class="input-wrap">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          name="phone"
                          v-model="data.phone"
                          label="Phone"
                          clearable
                        >
                          <template v-slot:append>
                            <i class="ri-folder-user-line"></i>
                          </template>
                        </q-input>
                      </div>
                      <div class="input-wrap">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          v-model="data.email"
                          label="Email"
                          name="email"
                          clearable
                        >
                          <template v-slot:append>
                            <i class="ri-mail-line"></i>
                          </template>
                        </q-input>
                      </div>
                      <div class="input-wrap">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          name="password"
                          v-model="data.password"
                          label="Create Password"
                          clearable
                        >
                          <template v-slot:append>
                            <i class="ri-lock-password-line"></i>
                          </template>
                        </q-input>
                      </div>
                      <div class="input-wrap">
                        <q-input
                          color="orange"
                          standout
                          outlined
                          bottom-slots
                          name="password_confirmation"
                          v-model="data.password_confirmation"
                          label=" Password Confirmation"
                          clearable
                        >
                          <template v-slot:append>
                            <i class="ri-lock-password-line"></i>
                          </template>
                        </q-input>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="row items-center">
                <q-checkbox color="red" v-model="valCheck" />
                <p>
                  I have read and agreed to
                  <q-btn class="terms">Terms and Conditions</q-btn>.
                </p>
              </div>

              <div class="or text-center q-mt-md">
                <h3>Or</h3>

                <div class="q-mt-md">
                  <h4>Sign Up using</h4>

                  <div
                    class="row text-center justify-center q-mt-md items-center"
                  >
                    <i style="font-size: 2.4rem" class="ri-google-fill"></i>
                    <i style="font-size: 2.4rem" class="ri-apple-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-step>

        <q-step prefix="2" :name="2" title="Step 2" icon="add_comment">
          <div class="text-center title">Let us know your interests</div>

          <div style="font-size: 2rem" class="interests">
            <q-chip
              v-model:selected="interests.Movies"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
              ><i class="ri-add-fill q-mr-sm"></i> Movies
            </q-chip>

            <q-chip
              v-model:selected="interests.Animations"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
            >
              <i class="ri-add-fill q-mr-sm"></i> Animations
            </q-chip>
            <q-chip
              v-model:selected="interests.Art"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
              ><i class="ri-add-fill q-mr-sm"></i> Art</q-chip
            >
            <q-chip
              v-model:selected="interests.Music"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
            >
              <i class="ri-add-fill q-mr-sm"></i> Music
            </q-chip>
            <q-chip
              v-model:selected="interests.NFTs"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
            >
              <i class="ri-add-fill q-mr-sm"></i> NFTs
            </q-chip>
            <q-chip
              v-model:selected="interests.VRspaces"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
            >
              <i class="ri-add-fill q-mr-sm"></i> VR Spaces
            </q-chip>
            <q-chip
              v-model:selected="interests.tour"
              class="q-pa-lg"
              size="20px"
              clickable
              outline
            >
              <i class="ri-add-fill q-mr-sm"></i> 3D Tour
            </q-chip>
          </div>
        </q-step>
        <q-step prefix="3" :name="3" title="Step 3" icon="add_comment">
          <div class="text-center title">
            Connect a Wallet <i class="ri-wallet-line"></i>
          </div>

          <div class="q-pt-lg connect">
            <q-chip
              v-model:selected="interests.VRspaces"
              class="q-pa-lg"
              size="30px"
              clickable
              outline
            >
              <img src="/images/wallets/1.png" alt="" /> Meta Mask
            </q-chip>
            <br />
            <br />
            <q-chip
              v-model:selected="interests.tour"
              class="q-pa-lg"
              size="30px"
              clickable
              outline
            >
              <img src="/images/wallets/2.png" alt="" /> Coinbase
            </q-chip>
          </div>
          <div class="q-mt-md" v-if="done">
            <div class="done text-center text-weight-bold">
              Your Account have been created successfully
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
            <q-btn
              @click="step === 3 ? finish() : $refs.stepper.next()"
              class="continue_btn"
              :loading="loading"
              :label="step === 3 ? 'Register' : 'Next'"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div> -->
  <div class="wrapper vendor_onboard container">
    <div class="my_container auth">
      <div class="right q-mt-md">
        <div class="bio">
          <div class="text-h6 q-mb-lg text-center text-weight-bold">
            Create Your Account
          </div>

          <div class="hold">
            <div class="inputs">
              <div class="holdd">
                <form
                  enctype="multipart/form-data"
                  id="form"
                  @submit.prevent="saveUser"
                >
                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      ref="nameRef"
                      :rules="nameRules"
                      outlined
                      bottom-slots
                      v-model="data.firstname"
                      label="First Name"
                      clearable
                      name="firstname"
                    >
                      <template v-slot:append>
                        <i class="ri-folder-user-line"></i>
                      </template>
                    </q-input>

                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>
                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      outlined
                      bottom-slots
                      ref="nameRef"
                      v-model="data.lastname"
                      :rules="nameRules"
                      label="Last Name"
                      clearable
                      name="lastname"
                    >
                      <template v-slot:append>
                        <i class="ri-folder-user-line"></i>
                      </template>
                    </q-input>

                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>

                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      outlined
                      bottom-slots
                      name="phone"
                      ref="nameRef"
                      v-model="data.phone"
                      :rules="nameRules"
                      label="Phone"
                      clearable
                    >
                      <template v-slot:append>
                        <i class="ri-folder-user-line"></i>
                      </template>
                    </q-input>
                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>
                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      outlined
                      ref="emailRef"
                      bottom-slots
                      v-model="data.email"
                      :rules="nameRules"
                      label="Email"
                      name="email"
                      clearable
                    >
                      <template v-slot:append>
                        <i class="ri-mail-line"></i>
                      </template>
                    </q-input>
                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>
                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      outlined
                      bottom-slots
                      name="password"
                      v-model="data.password"
                      :rules="nameRules"
                      label="Create Password"
                      clearable
                    >
                      <template v-slot:append>
                        <i class="ri-lock-password-line"></i>
                      </template>
                    </q-input>
                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>
                  <div class="input-wrap">
                    <q-input
                      color="orange"
                      standout
                      outlined
                      bottom-slots
                      name="password_confirmation"
                      v-model="data.password_confirmation"
                      :rules="nameRules"
                      label=" Password Confirmation"
                      clearable
                    >
                      <template v-slot:append>
                        <i class="ri-lock-password-line"></i>
                      </template>
                    </q-input>
                    <div class="error" v-if="errors['data.dob']">
                      {{ errors["data.dob"][1] }}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="row items-center">
            <q-checkbox color="red" v-model="valCheck" />
            <p>
              I have read and agreed to
              <q-btn class="terms">Terms and Conditions</q-btn>.
            </p>
          </div>

          <div class="or text-center q-mt-md">
            <h3>Or</h3>

            <div class="q-mt-md">
              <h4>Sign Up using</h4>

              <div class="row text-center justify-center q-mt-md items-center">
                <i style="font-size: 2.4rem" class="ri-google-fill"></i>
                <i style="font-size: 2.4rem" class="ri-apple-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-btn
        @click="finish"
        class="continue_btn"
        :loading="loading"
        :label="step === 3 ? 'Register' : 'Next'"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
export default {
  setup() {
    const interests = reactive({
      Movies: false,
      Music: true,
      Art: false,
      NFTs: false,
      Animations: false,
      VRspaces: false,
      tour: false,
    });
    const nameRef = ref(null);
    const emailRef = ref(null);
    return {
      step: ref(1),
      nameRef,
      emailRef,
      valCheck: ref(true),
      text: "",
      nameRules: [(val) => (val && val.length > 0) || "Please type something"],
      interests,
      selection: computed(() => {
        return Object.keys(interests)
          .filter((type) => interests[type] === true)
          .join(", ");
      }),
    };
  },
  data() {
    return {
      errors: [],
      done: false,
      data: {},
      loading: false,
    };
  },

  methods: {
    finish() {
      console.log(this.nameRef);
      this.nameRef.value.validate();
      this.emailRef.value.validate();
      if (this.nameRef.value.hasError || this.emailRef.value.hasError) {
      } else if (this.valCheck === false) {
        this.$q.notify({
          color: "negative",
          message: "You need to accept the license and terms first",
        });
      } else {
        this.loading = true;
        this.$api
          .post("register", this.data)
          .then((resp) => {
            console.log(resp);
            this.$store.auth.setUserDetails(resp.data);
            localStorage.setItem("token", resp.data.token);
            this.$q.notify({
              message: "Successful",
              color: "green",
              position: "top",
              timeout: 3000,
            });
            this.$router.replace({ name: "home" });
            this.loading = false;
          })
          .catch(({ response }) => {
            this.loading = false;
            this.errors = response.errors;
            setTimeout(() => {
              this.errors = [];
            }, 7000);
            console.log(response);
          });
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  padding: 3rem 0;
}
p {
  margin-bottom: 0;
}

.continue_btn {
  width: 100%;
  background: #c1272d;
  border-radius: 9.52192px;
  padding: 1rem;
  color: #fff;
}

.auth {
  background: #fff;
  padding: 2rem;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 4px;
  background: #fff;
}

.or h3 {
  position: relative;
  color: #9a9a9a;
}
.or h3::before {
  content: "";
  position: absolute;
  height: 2px;
  background: #bfbfbf;
  width: 40%;
  left: 0;
  top: 50%;
}
.or h3::after {
  content: "";
  height: 2px;
  background: #bfbfbf;
  position: absolute;
  width: 40%;
  right: 0;
  top: 50%;
}

.title {
  font-style: normal;
  font-weight: 300;
  font-size: 26.594px;
  line-height: 27px;
  text-align: center;
  color: #000000;
  margin: 0 0 2.5rem;
}
.done {
  font-style: normal;
  font-size: 26.594px;
  line-height: 27px;
  text-align: center;
  color: #000000;
  margin: 0 0 2.5rem;
}
.connect {
  display: grid;
  place-items: center;
}
.connect img {
  width: 40px;
  margin-right: 1rem;
}

.input-wrap {
  margin: 1rem 0;
}
</style>
