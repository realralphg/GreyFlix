<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black row items-center" elevated>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        class="text-white"
        @click="drawer = !drawer"
      />
      <q-toolbar class="container justify-between">
        <div class="logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="nav__links">
          <q-tabs indicator-color="accent" dense active-color="primary">
            <!-- <q-route-tab label="Home" ripple no-caps to="/" exact />
            <q-route-tab label="Music" ripple no-caps to="/agrofoods" exact />

            <q-route-tab
              label="Audio Stories"
              ripple
              no-caps
              to="/agrofarms"
              exact
            /> -->
            <!-- <q-route-tab label="Shorts" ripple no-caps to="/agrotech" exact /> -->
            <!-- <q-route-tab
              label="Ticketing"
              ripple
              no-caps
              to="/agrotech"
              exact
            /> -->
            <!-- <q-route-tab label="Arts" ripple no-caps to="/agrotech" exact />
            <q-route-tab
              label="VR Spaces"
              ripple
              no-caps
              to="/agrotech"
              exact
            />
            <q-route-tab
              label="Join Community"
              ripple
              no-caps
              to="/agrotech"
              exact
            /> -->
          </q-tabs>
        </div>

        <div class="right">
          <q-btn
            style="height: 40px; width: 40px"
            dense
            color="purple"
            round
            icon="email"
            class="q-ml-md"
          >
            <q-badge color="red" floating>4</q-badge>
          </q-btn>

          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <!-- <div class="connect">
            <q-btn no-caps class="bg-red q-pa-sm text-white">
              Connect Wallet <q-icon class="q-ml-sm" name="wallet" />
            </q-btn>
          </div> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      class="bg-secondary"
      show-if-above
      :width="250"
      :breakpoint="800"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list padding>
          <q-item :to="{ name: 'dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section class="text-white"> Dashboard </q-item-section>
          </q-item>
          <q-item :to="{ name: 'Ticketing' }" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-clock" />
            </q-item-section>
            <q-item-section class="text-white"> Ticketing </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{
              this.$store.auth.userDetails !== []
                ? this.$store.auth.userDetails.data.firstname +
                  " " +
                  this.$store.auth.userDetails.data.lastname
                : "Hi, there"
            }}
          </div>
          <div>
            {{
              this.$store.auth.userDetails !== []
                ? this.$store.auth.userDetails.data.email
                : "Hi, there"
            }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      drawer: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
.nav__links ul,
.right {
  display: flex;
  gap: 0.65rem;
  align-items: center;
}
.nav__links ul {
  text-transform: capitalize;
}

.nav__toggler {
  display: none;
}

.logo img {
  width: 118px;
}

@media (max-width: 600px) {
  .nav__toggler {
    display: block;
  }
}
</style>
