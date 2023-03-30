<template>
  <q-page class="page">
    <div class="wrapper">
      <div class="login">
        <div class="header">Start Listening....</div>

        <div class="short">Sign in with email</div>

        <div class="inputs">
          <form @submit.prevent="login">
            <div class="inp">
              <input
                v-model="form.email"
                class="det_inp"
                name="email"
                placeholder="Email"
                type="email"
                required
              />
              <div class="error" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div class="inp">
              <input
                v-model="form.password"
                class="det_inp"
                placeholder="Password"
                type="password"
                name="password"
                required
              />

              <div class="error" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>

            <q-btn type="submit" class="sign_in" :loading="loading"
              >Sign-In</q-btn
            >
          </form>

          <div class="forgot">
            <q-btn class="forgot" :to="{ name: 'forgot.password' }"
              >Forgot Password?</q-btn
            >
          </div>
        </div>

        <div class="want text-center">
          <p>
            Want access?
            <span class="text-weight-bold">Get unlimited manga now</span>
          </p>
          <p>
            <span>Don't have an account?</span>
            <q-btn to="/register" class="text-weight-bold text-primary"
              >Register</q-btn
            >
          </p>
        </div>

        <div class="privacy">
          <p class="text-center">
            By using MangaClub you agree to its <br />
            <span class="text-weight-bold"> Terms of Service</span> and
            <span class="text-weight-bold"> Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      val: ref(false),
    };
  },
  data() {
    return {
      errors: [],
      loading: false,
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.loading = true;
      this.$api
        .post("login", this.form)
        .then((response) => {
          console.log(response);
          this.$helper.notify(response.data.message, "success");
          localStorage.setItem("token", response.data.token);
          this.$store.auth.setUserDetails(response.data);
          this.$router.replace({ name: "home" });
          //   this.$store.auth.profileImg = response.data.data.avatar;
          // this.$router.replace("/welcome");
          this.loading = false;
        })
        .catch((e) => {
          let error = this.$plugins.reader.error(e);
          this.errors = error.errors || {};
          this.$helper.notify(error.message || error, error.status || "error");
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.page {
  background: url("/images/netflixLanding.jpeg") center center/cover no-repeat;
  position: relative;
  height: 80vh;
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

.error {
  font-size: 0.9em;
  color: #ff0000;
}
.login {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.5);
  padding: 3rem;
  width: 40%;
  z-index: 2;
}

.header {
  font-size: 25px;
  margin: 1rem 0 2rem;
  line-height: 30px;
  font-weight: 700;
}

.short {
  position: relative;
  padding: 1rem;
  margin: 0.2rem 0 1rem;
}

.short::before,
.short::after {
  content: "";
  position: absolute;
  height: 1px;
  width: 100px;
  background: white;
}

.short::before {
  right: 100%;
  top: 50%;
}

.short::after {
  left: 100%;
  top: 50%;
}

.inputs {
  width: 100%;
}
.inp {
  width: 100%;
}
.inputs form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.inputs input {
  outline: none;
  color: white;
}
.inputs input:focus {
  outline: none;
}

.inputs input.det_inp {
  background: black;
  padding: 0.75rem;
  width: 100%;
  border: none;
  margin: 0.4rem 0;
  width: 100%;
}

.sign_in {
  background: rgb(231, 44, 44);
  padding: 0.55rem;
  width: 100%;
  margin: 0.7rem 0;
  position: relative;
  z-index: 100;
}

.get_access {
  background: rgb(231, 44, 44);
  padding: 0.55rem;
  margin: 1rem;
  width: 60%;
}
.forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.check {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 15px;
}
::placeholder {
  color: #7c7a7a;
  opacity: 0.75;
  font-size: 18px;
}

@media (max-width: 800px) {
  .login {
    width: 80%;
    /* z-index: 100000; */
    padding: 1rem;
  }

  .page {
    height: 100vh;
  }
}
@media (max-width: 400px) {
  .login {
    width: 95%;
    /* z-index: 100000; */
  }
}
</style>
