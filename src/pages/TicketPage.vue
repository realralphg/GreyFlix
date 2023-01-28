<template>
  <q-page class="page container">
    <div class="row justify-between items-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <p class="text-white text-weight-bold">
          Greytix is a global self-service ticketing platform for live
          experiences that allows anyone create, share, find and attend events
          that fuel their passions and enrich their lives
        </p>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <img src="/images/landing/7.png" alt="" />
      </div>
    </div>

    <Tickets :tickets="tickets" />

    <Footer />
  </q-page>
</template>

<script>
import Footer from "../components/Footer.vue";
import Tickets from "../components/Tickets.vue";
export default {
  components: {
    Footer,
    Tickets,
  },

  data() {
    return {
      tickets: [
        {
          id: 1,
          image: "/images/vr/1.jpg",
          title: "World Cup Final",
          desc: "Senegal's Museum of Black Civilizations Museum in Dakar, Senegal",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Entertainment",
        },
        {
          id: 2,
          image: "/images/vr/2.jpg",
          title: "World Cup Final",
          desc: "Zeitz Museum of Contemporary Art Africa Cape Town, South Africa",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Technlogy",
        },
        {
          id: 3,
          image: "/images/vr/3.jpg",
          title: "World Cup Final",
          desc: "House of Slaves Museum in Dakar, Senegal",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Entertainment",
        },
        {
          id: 4,
          image: "/images/vr/4.jpg",
          title: "World Cup Final",
          desc: "Iziko South African Museum in Cape Town, South Africa",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Art",
        },
        {
          id: 5,
          image: "/images/vr/5.jpg",
          title: "World Cup Final",
          desc: "Iziko South African Museum in Cape Town, South Africa",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Entertainment",
        },
        {
          id: 6,
          image: "/images/vr/6.jpg",
          title: "World Cup Final",
          desc: "Iziko South African Museum in Cape Town, South Africa",
          price: "Fee - ₦20,000",
          date: "Fri 24th July, 2022 at 10 AM",
          category: "Entertainment",
        },
      ],
    };
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 40px;
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
</style>
