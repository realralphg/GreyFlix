<template>
  <div class="purchase_wrap">
    <div class="purchase">
      <p>Complete your registration</p>
      <h4>Android Users Hangout</h4>
      <h5>Organized by Lorem Management</h5>
      <p>
        <i class="fa-solid fa-calendar-days"></i> Fri 24th June, 2022 at 10 AM
      </p>
      <p>
        <i class="fa-solid fa-location-dot"></i> Ahmed Musa Neighborhood Centre,
        Kaduna
      </p>

      <div class="order">
        <p class="text-white text-weight-bold">Order Summary</p>

        <div class="items">
          <ul>
            <li class="title_li">
              <div class="left_side">
                <div class="serialnum">Ticket Type</div>
              </div>

              <div class="">
                <div class="artist_name">Price</div>
              </div>

              <time>Quantity</time>
              <div class="">
                <div class="artist_name">Total</div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div class="left_side">
                <div class="serialnum">Early Bird</div>
              </div>

              <div class="left_side">
                <div class="serialnum">5000</div>
              </div>

              <div class="center_place">
                <!-- <div class="songname">He is able</div> -->
                <div class="actions">
                  <button class="add">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <input type="text" v-model="qty" name="" id="" />
                  <button class="download">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>

              <div class="artist_name">20000</div>
            </li>
          </ul>
        </div>
      </div>

      <form>
        <div class="input">
          <q-item-label class="text-white q-pb-xs">Full Name</q-item-label>
          <input dense outlined name="title" label="Title" />
        </div>
        <div class="input">
          <q-item-label class="text-white q-pb-xs">Phone</q-item-label>
          <input dense outlined name="title" label="Title" />
        </div>

        <q-btn class="q-mt-lg q-px-xl" color="primary"> Pay </q-btn>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },

  data() {
    return {
      qty: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
h5,
h4 {
  color: white;
  margin: 0.5rem 0;
}
p {
  color: white;
}
i {
  margin-right: 0.5rem;
  color: white;
}

.input {
  margin-top: 2rem;
}
form input {
  background: #f2f2f2;
  border-radius: 8px;
  width: 100%;
  padding: 0.5rem;
}

input:focus {
  outline: none;
}
.purchase_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 70%;
  margin: 0 auto;
}

.order {
  margin: 1rem 0;
}
.order p {
  margin-top: 2rem;
  font-size: 20px;
}

.items {
  color: white;
  //   margin-top: 2rem;
  //   padding: 0rem 0 2rem;
  font-size: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.items input {
  width: 40px;
}

.items i {
  margin-right: 0;
}

.items li {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  align-items: center;
  justify-content: flex-end;
  margin: 1rem 0;
}
.items .center_place {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: flex-end;
}

.items .left_side {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.items .actions {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.items time {
  text-align: right;
}

.items .artist_name {
  text-align: center;
}

.items button {
  background: none;
  border: 1px solid white;
  margin: 0 0.5rem;
  width: 20px;
  padding: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  opacity: 0.6;
}

.items .play {
  display: none;
}

@media (max-width: 700px) {
  .purchase_wrap {
    width: 90%;
  }
}
</style>
