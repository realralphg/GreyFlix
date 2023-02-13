<template>
  <q-page class="page container">
    <div class="row justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
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
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/1.png" alt="" />
      </div>
    </div>
    <div class="row q-mt-xl q-pt-xl justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Share and enjoy contents with friends and family in a unique and
          valuable manner.
        </p>
        <p class="coming_soon">Coming soon</p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/2.png" alt="" />
      </div>
    </div>
    <div class="row flexer justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/3.png" alt="" />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Enjoy Africa’s finest creative collections leveraging emerging
          technologies.
        </p>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Enjoy Greytix a global self-service ticketing platform for live
          experiences for everyone.
        </p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/7.png" alt="" />
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
    <div class="row justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Experience historical monuments and artifacts first hand in our VR
          collections.
        </p>
        <p class="coming_soon">Coming soon</p>
      </div>

      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/5.png" alt="" />
      </div>
    </div>

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
  margin: 2rem 0;
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

@media (max-width: 500px) {
  p {
    font-size: 25px;
    line-height: 30px;
  }
}
</style>
