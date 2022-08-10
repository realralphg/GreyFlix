<template>
  <div class="hero text-center">
    <div class="hero__details">
      <div class="heading">Welcome to GreyBitz</div>
      <p class="smaller__heading">Explore contents and earn on the go!</p>
      <div class="input__wrap">
        <div class="input">
          <div class="left">
            <i class="ri-search-line"></i>
            <input placeholder="Search for anything" type="text" />
          </div>

          <q-btn no-caps class="bg-red search text-white"> Search </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped>
.hero {
  height: 90vh;
  position: relative;
}
.hero__details {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #fff;
  margin: 0 auto;
  border-radius: 100px;
  height: 46px;
  margin-top: 2rem;
  width: 50%;
  color: #fff;
  padding: 0.75rem 0 0.75rem 0.75rem;
}

.input .left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input i {
  color: white;
  font-size: 2rem;
  margin-right: 1rem;
}

.input input {
  background: none;
  border: none;
  outline: none;
  color: #fff;
}

.input .search {
  height: 46px;
  border-radius: 100px;
  width: 105px;
}
</style>
