<template>
  <div class="wrapper footer">
    <i class="ri-arrow-drop-up-fill text-white go_up"></i>
    <div class="hold q-py-xl container">
      <div class="row justify-between">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <div class="title">Services</div>

          <ul class="text-white">
            <li>
              <q-item to="/"> About company </q-item>
            </li>
            <li>
              <q-item to="/"> Contact Us </q-item>
            </li>
            <li>
              <q-item to="/"> Blockchains </q-item>
            </li>
            <li>
              <q-item to="/"> NFTs </q-item>
            </li>
            <li>
              <q-item to="/"> VR Spaces </q-item>
            </li>
            <li>
              <q-item to="/"> Streaming </q-item>
            </li>
            <li>
              <q-item to="/"> Support </q-item>
            </li>
          </ul>
        </div>
        <div class="col-md-4 text-white col-sm-4 col-xs-12">
          <div class="title">Social Media</div>
          <div class="social_icons">
            <i class="ri-instagram-line"></i>
            <i class="ri-linkedin-box-line"></i>
            <i class="ri-facebook-circle-line"></i>
            <i class="ri-twitter-line"></i>
          </div>

          <p>greysoft.ng | @greyhobb</p>
        </div>
        <div class="col-md-4 newsletter col-sm-4 col-xs-12">
          <div class="be">Be the first to get our Newsletter.</div>

          <div class="input_hold">
            <div class="input">
              <input
                placeholder="Enter your mail here..."
                type="text"
                name=""
                id=""
              />
              <q-btn class="sub text-white"> Subscribe </q-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center text-white copy">
        Copyright GreySoft Technologies 2022
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.wrapper {
  background: #0e0e0e;
  margin-top: 8rem;
  position: relative;
}
.title {
  font-style: normal;
  font-weight: 700;
  font-size: 20.9534px;
  line-height: 22px;
  color: #ffffff;
  margin-bottom: 1.5rem;
}
.copy {
  font-style: normal;
  font-weight: 400;
  font-size: 18.81px;
  line-height: 26px;
  color: #ffffff;
  margin: 1rem 0;
}

.social_icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.social_icons i {
  font-size: 1.9rem;
}
.be {
  font-style: normal;
  font-weight: 500;
  font-size: 22.8473px;
  line-height: 24px;
  color: #ffffff;
  margin: 1rem 0;
}

.input {
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
  border-radius: 2.53859px;
  padding: 0.35rem;
}
.input input {
  border: none;
  width: 100%;
}
.input input:focus {
  outline: none;
}

.sub {
  background: #c2151c;
  border-radius: 5.07719px;
}

::placeholder {
  font-style: normal;
  font-weight: 500;
  font-size: 13.2316px;
  line-height: 18px;
  color: #c4c4c4;
}

.newsletter {
  align-self: center;
}

.go_up {
  background: rgba(48, 45, 45, 0.96);
  font-size: 2.5rem;
  position: absolute;
  box-shadow: 0px 7.32394px 5.9507px rgba(0, 0, 0, 0.25);
  top: -6%;
  right: 4%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
