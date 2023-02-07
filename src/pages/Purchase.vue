<template>
  <div class="purchase_wrap">
    <div class="purchase">
      <p>Complete your registration</p>
      <h4>{{ this.$store.auth.ticket.name }}</h4>
      <h5>{{ this.$store.auth.ticket.description }}</h5>
      <p>
        <i class="fa-solid fa-calendar-days"></i> Event start date:
        {{ this.$store.auth.ticket.event.start_date }}
        <span>{{ this.$store.auth.ticket.event.start_time }}</span>
      </p>
      <p>
        <i class="fa-solid fa-calendar-days"></i> Event end date
        {{ this.$store.auth.ticket.event.end_date }}
        <span>{{ this.$store.auth.ticket.event.end_time }}</span>
      </p>
      <p>
        <i class="fa-solid fa-location-dot"></i>
        {{ this.$store.auth.ticket.event.location }}
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
                <div class="serialnum">{{ this.$store.auth.ticket.price }}</div>
              </div>

              <div class="center_place">
                <!-- <div class="songname">He is able</div> -->
                <div class="actions">
                  <button @click="add" class="add">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <input type="text" v-model="qty" name="" id="" />
                  <button @click="minus" class="download">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>

              <div class="artist_name">{{ total }}</div>
            </li>
          </ul>
        </div>
      </div>

      <form>
        <div class="input">
          <q-item-label class="text-white q-pb-xs">Full Name</q-item-label>
          <input
            required
            v-model="data.fullname"
            dense
            outlined
            name="Fullname"
            label="Title"
          />
        </div>
        <div class="input">
          <q-item-label class="text-white q-pb-xs">Email</q-item-label>
          <input
            v-model="data.email"
            type="email"
            required
            dense
            outlined
            name="email"
            label="Email"
          />
        </div>
        <div class="input">
          <q-item-label class="text-white q-pb-xs">Phone</q-item-label>
          <input
            dense
            v-model="data.phone"
            required
            outlined
            type="tel"
            name="phone"
            label="Phone"
          />
        </div>

        <!-- <q-btn class="q-mt-lg q-px-xl" color="primary"> Pay </q-btn> -->
      </form>

      <div class="text-center">
        <PaystackHandler
          no-caps
          unelevated
          dont-verify
          class="q-mt-lg q-px-xl"
          color="primary"
          label="Continue"
          icon="fa-solid fa-credit-card"
          :endpoint="{
            init: `/events/${this.$store.auth.ticket.event.id}/tickets/${this.$store.auth.ticket.id}`,
            verify: false,
          }"
          :confirmation="{
            message: `You are about to buy a ticket for ${this.$store.auth.ticket.event.name} for ${amount}, do you want to continue?`,
            title: 'Confirm Ticket Purchase',
            ok: 'Yes, Continue',
            cancel: 'No, Cancel',
            color: 'info',
          }"
          :data="{
            redirect: `${location.origin}${
              $router.resolve({ name: 'payment.verify' }).href
            }`,
            qty: 1,
            fullname: data.fullname,
            email: data.email,
            phone: data.phone,
            amount: amount,
          }"
          @success="() => {}"
          @error="() => {}"
          @close="() => {}"
          @init="() => {}"
          @destroyed="() => {}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PaystackHandler from "../components/PaystackHandler.vue";
export default {
  setup() {
    return {};
  },

  components: {
    PaystackHandler,
  },

  data() {
    return {
      qty: 1,
      total: this.$store.auth.ticket.price,
      location: window.location,
      amount: "",
      data: {},
    };
  },

  methods: {
    add() {
      this.qty++;
      let amount = parseInt(this.$store.auth.ticket.price);
      this.total = amount * this.qty;
      this.amount = this.total;
    },
    minus() {
      this.qty--;
      let amount = parseInt(this.$store.auth.ticket.price);
      this.total = this.total - amount;
      this.amount = this.total;

      if (this.qty === 0) {
        this.qty = 1;
        this.$q.notify({
          message: "Cannot Subtract!",
          color: "red",
          position: "top",
        });

        this.total = amount;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h5,
h4 {
  color: white;
  margin: 0.5rem 0;
}

h5 {
  font-size: 18px;
  line-height: 1.4;
}
p {
  color: white;
}
i {
  margin-right: 0.5rem;
  color: white;
}

.input {
  margin-top: 1rem;
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
  height: 100%;
  width: 70%;
  margin: 0 auto;
  padding: 2rem 0;
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

  .items li {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
