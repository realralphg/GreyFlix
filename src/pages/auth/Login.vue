<template>
  <div class="wrapper vendor_onboard container">
    <div class="my_container auth q-pt-xl">
      <div class="text-h6 q-mb-lg text-center text-weight-bold">
        Login Your Account
      </div>
      <form enctype="multipart/form-data" id="form" @submit.prevent="saveUser">
        <div class="input-wrap">
          <q-input
            color="orange"
            standout
            outlined
            required
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
            label=" Password"
            clearable
          >
            <template v-slot:append>
              <i class="ri-lock-password-line"></i>
            </template>
          </q-input>
        </div>

        <q-btn class="login" :loading="loading" type="submit"> Login </q-btn>
      </form>
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
    return {
      step: ref(1),
      valCheck: ref(true),
      text: "",
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
    saveUser() {
      this.loading = true;
      this.$api
        .post("login", this.data)
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
          // this.$router.replace("/home");
          this.loading = false;
        })
        .catch(({ response }) => {
          this.loading = false;
          this.errors = response.errors;
          this.$q.notify({
            message: "Invalid user details",
            color: "red",
            position: "top",
            timeout: 3000,
          });
          setTimeout(() => {
            this.errors = [];
          }, 7000);
          console.log(response);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
p {
  margin-bottom: 0;
}

.auth {
  background: #fff;
  padding: 2rem;
  margin-top: 3rem;
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

.login {
  width: 100%;
  background: #c1272d;
  border-radius: 9.52192px;
  padding: 1rem;
  color: #fff;
}
</style>
