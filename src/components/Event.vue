<template>
  <div class="container">
    <!-- <p class="text-white">
      {{ eventdata.category.image_url }}
    </p> -->
    <div class="row_items">
      <div class="items">
        <div class="items_wrap">
          <div class="img-border">
            <router-link
              :to="{ name: 'EventTicketsPage', params: { slug: eventdata.id } }"
            >
              <img :src="eventdata.category.image_url" alt="" />
            </router-link>
          </div>
          <div class="detail">
            <div class="detail-button">
              <div class="detail-button-left">
                <button><i class="fa fa-eye"></i></button>
                <q-fab
                  class="exp"
                  color="purple"
                  icon="fa fa-plus"
                  direction="up"
                >
                  <q-fab-action color="primary" @click="onClick" icon="mail" />
                  <q-fab-action
                    color="secondary"
                    @click="onClick"
                    icon="alarm"
                  />
                </q-fab>
                <!-- <button><i class="fa fa-plus"></i></button> -->
                <!-- <button><i class="fa fa-thumbs-up"></i></button>
                <button><i class="fa fa-thumbs-up"></i></button> -->
              </div>
              <div class="detail-button-right">
                <button><i class="fa fa-angle-right"></i></button>
              </div>
            </div>

            <!-- <div class="detail-rating">
              <p>ตรงกัน 95%</p>
              <p>18+</p>
              <p>5 ซีซั่น</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["eventdata"],

  data() {
    return {
      hover: false,
    };
  },

  methods: {
    onClick() {
      // console.log('Clicked on a fab action')
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.row_wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  height: 100%;
}

.row_items {
  position: relative;
  width: 200px;
  height: 100%;
}

/* items */

.items {
  width: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  background: #333;
  cursor: pointer;
  margin: 0 5px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  border-radius: 2rem;
}
.items img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
.items:hover {
  transform: scale(1.2);
  z-index: 2;
  top: -50px;
}
.items:hover .detail,
.items:hover .detail-button {
  display: flex;
}

/* detail */
.detail {
  width: 100%;
  display: none;
  flex-direction: column;
  padding: 15px 10px 10px;
  background: #333;
  margin-top: -10px;
}

/* detail-button */
.detail-button {
  width: 95%;
  display: none;
  justify-content: space-between;
  margin-bottom: 10px;
}

.detail-button-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.detail-button-left button,
.detail-button-left .exp .q-btn,
.detail-button-right button {
  width: 20px;
  height: 20px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 100%;
  color: #fff;
  border: 2px solid #adadad;
  cursor: pointer;
}
.detail-button-left button:first-child {
  background: #fff;
  color: #333;
  border: none;
}
.detail-button-left button:last-child {
  transform: rotate(180deg);
}
.detail-button-right button {
  transform: rotate(90deg);
}

/* hover */
.detail-button-left button:hover,
.detail-button-right button:hover {
  border: 2px solid #fff;
}
.detail-button-left button:first-child:hover {
  background: #f7f7f7;
}

/* detail-rating */
.detail-rating {
  display: flex;
  color: #fff;
  width: 95%;
}
.detail-rating p {
  text-align: center;
  margin-right: 10px;
}
.detail-rating p:first-child {
  color: #2ecc71;
  font-weight: bold;
}
.detail-rating p:nth-child(2) {
  border: 1px solid #fff;
  padding: 0 5px;
}
</style>
