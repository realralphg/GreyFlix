<template>
  <q-page class="page">
    <div class="wrapper">
      <div class="login">
        <div class="header">Get Access to Unlimited Manga....</div>

        <div class="short">Sign up with email</div>

        <div class="inputs">
          <form
            action="
            "
            @submit.prevent="register"
          >
            <div class="inp">
              <input
                v-model="form.email"
                class="det_inp"
                placeholder="Email"
                type="email"
                autocomplete="email"
              />

              <div class="error" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>

            <div class="inp">
              <input
                v-model="form.password"
                class="det_inp"
                placeholder="Password"
                type="password"
                autocomplete="password"
              />

              <div class="error" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>

            <div class="inp">
              <input
                class="det_inp"
                v-model="form.password_confirmation"
                placeholder="Confirm Password"
                type="password"
                autocomplete="password"
              />

              <div class="error" v-if="errors.password_confirmation">
                {{ errors.password_confirmation[0] }}
              </div>
            </div>

            <div class="inp">
              <input
                class="det_inp"
                v-model="form.username"
                placeholder="Nickname/Username"
                autocomplete="username"
                type="text"
              />

              <div class="error" v-if="errors.username">
                {{ errors.username[0] }}
              </div>
            </div>

            <div class="inp q-mt-sm">
              <q-input
                v-model="form.dob"
                filled
                square
                dense
                label-color="white"
                input-class="text-white"
                bg-color="black"
                style="z-index: 5000"
                mask="date"
                placeholder="Date of Birth"
                label="Date of Birth"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer text-white">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.dob" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div class="error" v-if="errors.dob">
                {{ errors.dob[0] }}
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
            <span class="text-weight-bold">Get unlimited manga now</span>
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
            By using MangaClub you agree to its <br />
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
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        dob: "",
      },
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.$api
        .post("register", this.form)
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          this.$store.auth.setUserDetails(response.data);
          localStorage.setItem("token", resp.data.token);
          this.$helper.notify(response.data.message, "success");
          this.$router.replace({ name: "subscribe" });
        })
        .catch((e) => {
          this.loading = false;
          let error = this.$plugins.reader.error(e);
          this.errors = error.errors || {};
          this.$helper.notify(error.message || error, error.status || "error");
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
  background: url("/images/authbg.png") center center/cover no-repeat;
  position: relative;
  overflow: hidden;
  height: 100vh;
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
  width: 50%;
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
}
@media (max-width: 600px) {
  .login {
    width: 95%;
  }
}
</style>
