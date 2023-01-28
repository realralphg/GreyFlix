<template>
  <div class="ticket-wrap">
    <div class="detailwrap">
      <div class="left">
        <img src="/images/artworks/7.jpg" alt="" />
      </div>

      <div class="right">
        <p>African Queens</p>
        <p class="fee">Fee: ₦20,000</p>
        <p>
          Description: Iziko South African Museum in Cape Town, South Africa
        </p>
        <p>Date:Fri 24th July, 2022 at 10 AM</p>
        <p>Category: Sports</p>
        <q-btn :to="{ name: 'Purchase' }" color="primary"
          >Purchase Ticket</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
p {
  color: white;
  font-size: 16px;
}

p.fee {
  font-weight: 700;
  font-size: 20px;
}
.ticket-wrap {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;
}
.detailwrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(7.86584px);
  border-radius: 44.4188px;
  padding: 2rem;
}
</style>
