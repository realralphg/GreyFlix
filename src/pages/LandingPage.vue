<template>
  <q-page class="page">
    <header class="top_heroPage border_btm">
      <div class="hold">
        <h1>
          Unlimited stories, music <br />
          and more.
        </h1>
        <h2 class="bigger">Watch anywhere. Cancel anytime.</h2>

        <p class="smaller">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <div class="input_area">
          <form>
            <input placeholder="Email address" type="text" />
            <q-btn type="submit" class="hero_btn"> Get Started</q-btn>
          </form>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="row justify-between border_btm items-center">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <p class="text-white text-weight-bold">
            GreyFlix, a decentralised world of valuable African entertainment.
          </p>

          <div class="left_det text-center">
            <small class="text-white text-center q-my-lg"
              >Ready for the experience? Sign and get started</small
            >
            <div class="btn_wrap">
              <q-btn to="/register" class="text-white sign"> Sign Up </q-btn>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <img src="/images/landing/1.png" alt="" />
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <div class="row q-mt-xl q-pt-xl border_btm justify-between items-center">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <p class="text-white text-weight-bold">
            Share and enjoy contents with friends and family in a unique and
            valuable manner.
          </p>
          <p class="coming_soon">Coming soon</p>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <img src="/images/landing/2.png" alt="" />
        </div>
      </div>
    </div> -->

    <div class="container">
      <div class="row flexer border_btm justify-between items-center">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <img src="/images/landing/3.png" alt="" />
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <p class="text-white text-weight-bold">
            Enjoy Africa’s finest creative collections leveraging emerging
            technologies.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row border_btm justify-between items-center">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <p class="text-white text-weight-bold">
            Enjoy Greytix a global self-service ticketing platform for live
            experiences for everyone.
          </p>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <img src="/images/landing/7.png" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="row flexer justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/4.png" alt="" />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Enjoy Africa’s finest creative collections leveraging emerging
          technologies.
        </p>
      </div>
    </div> -->
    <!-- <div class="container">
      <div class="row justify-between items-center">
        <div class="col-md-6 col-sm-6 col-xs-12">
          <img src="/images/landing/5.png" alt="" />
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <p class="text-white text-weight-bold">
            Experience historical monuments and artifacts first hand in our VR
            collections.
          </p>
          <p class="coming_soon">Coming soon</p>
        </div>
      </div>
    </div> -->

    <Footer />
  </q-page>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>

<style scoped>
.top_heroPage {
  height: 90vh;
  background: url("/images/netflixLanding.jpeg") no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.top_heroPage .hold {
  margin: 0 auto;
  max-width: 950px;
  padding: 75px 0;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1;
}
.top_heroPage::before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0,
    transparent 60%,
    rgba(0, 0, 0, 0.8)
  );
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}

.top_heroPage h2.bigger {
  margin: 0rem auto;
  max-width: 640px;
  font-weight: 600;
  font-size: 1.5rem;
  color: #fff;
  line-height: 1.2;
}

.top_heroPage p.smaller {
  font-size: 1.2rem;
  padding-bottom: 20px;
  font-weight: 700;
  margin: 0 auto;
  max-width: 450px;
  padding: 0 5%;
}
.top_heroPage h1 {
  font-size: 3.325rem;
  color: #fff;
  font-weight: 700;
  line-height: 1.2;
}

.top_heroPage .input_area form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  max-width: 650px;
  margin: 0 auto;
}

.top_heroPage .q-btn {
  border-bottom-left-radius: 0;
  border-left: 1px solid #333;
  border-top-left-radius: 0;
  margin: 0 !important;
  font-size: 1rem;
  width: 200px;
  min-height: 60px;
  background-color: #e50914;
  background-image: linear-gradient(180deg, #e50914, #db0510);
  box-shadow: 0 1px 0 rgb(0 0 0 / 45%);
  color: #fff;
  min-width: 74px;
}
.top_heroPage form input {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  height: 60px !important;
  padding: 10px 10px 0;
  width: 100%;
  margin: 0 auto;
}

div.input_area {
  margin: 0 auto;
}

@media only screen and (min-width: 1450px),
  only screen and (min-width: 950px) and (max-width: 1449px) {
  .top_heroPage h2.bigger {
    font-size: 1.625rem;
  }
  .top_heroPage p.smaller {
    max-width: none;
  }
}

@media only screen and (min-width: 950px) and (max-width: 1449px) {
  .top_heroPage h1 {
    font-size: 3.125rem;
  }
}

p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 45px;
  letter-spacing: 0.03em;
  color: #ffffff;
}

div {
  margin: 2rem auto;
}

small {
  font-weight: 500;
  font-size: 0.75rem;
}

.coming_soon {
  background: red;
  opacity: 0.5;
  color: #ffffff;
  font-size: 10px;
  padding: 0 10px;
  width: fit-content;
  margin-top: 0.5rem;
}

.border_btm {
  border-bottom: 8px solid #222;
}

@media (max-width: 500px) {
  p {
    font-size: 25px;
    line-height: 30px;
  }

  div.input_area {
    margin: 1rem auto;
  }

  .top_heroPage h2.bigger {
    margin: 1rem auto;
  }
  .top_heroPage .hold {
    width: 90%;
  }
  .top_heroPage .q-btn[data-v-32679b52] {
    font-size: 0.7rem;
    width: 200px;
  }

  .top_heroPage h1 {
    font-size: 2.8rem;
  }
  .top_heroPage h2.bigger {
    font-size: 1.3rem;
  }
  .top_heroPage p.smaller {
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .top_heroPage form input {
    height: 50px !important;
    padding: 0px 10px 0;
  }
  .top_heroPage .q-btn {
    height: 50px;
    min-height: 50px;
  }
}
</style>
