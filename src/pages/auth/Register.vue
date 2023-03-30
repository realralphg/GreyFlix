<template>
  <q-page class="page">
    <div class="wrapper">
      <div class="login">
        <div class="header">Get Access to Unlimited Stories and Music....</div>

        <div class="short">Sign up with email</div>

        <div class="inputs">
          <form
            action="
            "
            @submit.prevent="register"
          >
            <div class="inp">
              <input
                v-model="data.firstname"
                class="det_inp"
                placeholder="Enter your first name"
                type="text"
                autocomplete="text"
                name="firstname"
              />

              <div class="error" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>
            <div class="inp">
              <input
                v-model="data.lastname"
                class="det_inp"
                placeholder="Enter your last name"
                type="text"
                name="lastname"
                autocomplete="text"
              />

              <div class="error" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>
            <div class="inp">
              <input
                v-model="data.phone"
                class="det_inp"
                placeholder="Enter your phone number"
                type="tel"
                name="phone"
                autocomplete="phone"
              />

              <div class="error" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>
            <div class="inp">
              <input
                v-model="data.email"
                class="det_inp"
                placeholder="Enter your email"
                type="email"
                name="email"
                autocomplete="email"
              />

              <div class="error" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>

            <div class="inp">
              <input
                v-model="data.password"
                class="det_inp"
                placeholder="Password"
                type="password"
                name="password"
                autocomplete="password"
              />

              <div class="error" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>

            <div class="inp">
              <input
                class="det_inp"
                v-model="data.password_confirmation"
                placeholder="Confirm Password"
                type="password"
                autocomplete="password"
              />

              <div class="error" v-if="errors.password_confirmation">
                {{ errors.password_confirmation[0] }}
              </div>
            </div>

            <q-btn :loading="loading" type="submit" class="sign_in"
              >Sign-Up</q-btn
            >
          </form>
        </div>

        <div class="want text-center">
          <p>
            Want access?
            <span class="text-weight-bold"
              >Get access to unlimited stories now</span
            >
          </p>
          <p>
            Already have an account?
            <q-btn to="/login" class="text-weight-bold text-primary"
              >Login</q-btn
            >
          </p>
        </div>

        <div class="privacy">
          <p class="text-center">
            By using Rabitz you agree to its <br />
            <a href="#" class="text-weight-bold text-white">
              Terms of Service</a
            >
            and
            <a href="#" class="text-weight-bold text-white"> Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      loading: false,
      data: {},
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.$api
        .post("register", this.data)
        .then((response) => {
          this.loading = false;
          // console.log(response.data);
          this.$store.auth.setUserDetails(response.data);
          localStorage.setItem("token", response.data.token);
          this.$helper.notify(response.data.message, "success");
          this.$router.replace({ name: "home" });
        })
        .catch((response) => {
          this.loading = false;
          // console.log(response);
          // let error = this.$plugins.reader.error(e);
          // this.errors = e.errors || {};
          this.$q.notify({
            message:
              "Invalid user details, your password must be up to 8 characters",
            color: "red",
            position: "top",
            timeout: 3000,
          });
          // this.$helper.notify(e.message || e, error.status || "error");
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
  overflow: hidden;
  height: 80vh;
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
  z-index: 1;
}

.header {
  font-size: 25px;
  margin: 1rem 0 2rem;
  line-height: 30px;
  font-weight: 700;
}

.inputs {
  width: 100%;
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

.inputs .inp {
  width: 100%;
}

.inputs form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.inputs input {
  outline: none;
  color: white;
}
.inputs input:focus {
  outline: none;
}

.inputs input.det_inp,
input.q-input-custom.det_inp {
  background: black;
  padding: 0.75rem;
  width: 100%;
  border: none;
  margin: 0.4rem 0;
  /* width: 350px; */
}

.sign_in {
  background: rgb(231, 44, 44);
  padding: 0.55rem;
  width: 100%;
  margin: 0.7rem 0;
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
  font-size: 10px;
  width: 100%;
  margin-bottom: 1rem;
}

.check {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 10px;
}
::placeholder {
  color: #7c7a7a;
  opacity: 0.75;
  font-size: 18px;
}

@media (max-width: 800px) {
  .login {
    width: 80%;
    padding: 1rem;
  }

  .page {
    height: 100vh;
  }
}
@media (max-width: 600px) {
  .login {
    width: 95%;
  }
}
</style>
