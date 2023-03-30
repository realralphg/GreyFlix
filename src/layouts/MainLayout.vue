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
              label="Events"
              ripple
              no-caps
              :to="{ name: 'EventsPage' }"
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
          <q-btn label="Account" class="account_btn" color="red">
            <q-menu class="menu">
              <q-list style="min-width: 120px">
                <q-item
                  v-if="this.$store.auth.token"
                  :to="{ name: 'BecomeCreator' }"
                  clickable
                  v-close-popup
                >
                  <q-item-section>Become a creator</q-item-section>
                </q-item>
                <!-- <q-item
                  v-if="this.$store.auth.token"
                  :to="{ name: 'dashboard' }"
                  clickable
                  v-close-popup
                >
                  <q-item-section>My Account</q-item-section>
                </q-item> -->
                <!-- <q-item
                  v-if="this.$store.auth.token"
                  :to="{ name: 'help' }"
                  clickable
                  v-close-popup
                >
                  <q-item-section>Help Center</q-item-section>
                </q-item> -->
                <q-separator />

                <q-item
                  v-if="this.$store.auth.token"
                  :to="{ name: 'logout' }"
                  clickable
                  v-close-popup
                >
                  <q-item-section>Sign Out</q-item-section>
                </q-item>
                <q-item v-else :to="{ name: 'login' }" clickable v-close-popup>
                  <q-item-section>Sign In</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

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
        <div class="logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <q-item to="/home" class="nav_item q-pt-xl"
          ><i class="fa-solid fa-house-user"></i> Home
        </q-item>
        <q-item to="/MusicStories" class="text-white nav_item">
          <i class="fa-solid fa-music"></i> Music
        </q-item>
        <q-item to="/AudioStories" class="text-white nav_item"
          ><i class="fa-solid fa-microphone"></i>
          Audio Stories
        </q-item>
        <q-item to="/EventsPage" class="text-white nav_item"
          ><i class="fa-solid fa-clock"></i> Events
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
  .account_btn {
    padding: 4px 8px;
  }
}
@media (max-width: 380px) {
  .logo img {
    width: 80px;
  }
}
</style>
