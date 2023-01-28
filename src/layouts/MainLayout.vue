<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black row items-center" elevated>
      <q-toolbar class="container justify-between">
        <div class="logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="nav__links">
          <q-tabs indicator-color="accent" dense active-color="primary">
            <q-route-tab label="Home" ripple no-caps to="/home" exact />
            <q-route-tab
              label="Music"
              ripple
              no-caps
              :to="{ name: 'MusicStories' }"
              exact
            />

            <q-route-tab
              label="Audio Stories"
              ripple
              no-caps
              :to="{ name: 'AudioStories' }"
              exact
            />
            <q-route-tab
              label="Ticketing"
              ripple
              no-caps
              :to="{ name: 'TicketPage' }"
              exact
            />
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

          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            class="text-white nav__toggler"
            @click="drawer = !drawer"
          />

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
      :width="250"
      :breakpoint="800"
    >
      <q-list class="q-pa-md side">
        <q-item to="/home" class="nav_item q-pt-xl"
          ><i class="fa-solid fa-house-user"></i> Home
        </q-item>
        <q-item to="/music" class="text-white nav_item">
          <i class="fa-solid fa-music"></i> Music
        </q-item>
        <q-item to="/audioStories" class="text-white nav_item"
          ><i class="fa-solid fa-microphone"></i>
          Audio Stories
        </q-item>
        <q-item to="/TicketPage" class="text-white nav_item"
          ><i class="fa-solid fa-clock"></i> Ticketing
        </q-item>
      </q-list>
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
.side {
  font-size: 1.3rem;
}

.nav_item {
  margin: 1rem 0;
}
i {
  margin-right: 0.7rem;
}
@media (max-width: 700px) {
  .nav__toggler {
    display: block;
  }

  .nav__links {
    display: none;
  }
}
</style>
