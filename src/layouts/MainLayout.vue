<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-black" elevated>
      <q-toolbar class="container justify-between">
        <div class="logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div class="nav__links">
          <q-tabs indicator-color="accent" dense active-color="primary">
            <q-route-tab
              style="width: 110px"
              label="Home"
              ripple
              no-caps
              to="/"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="Movies"
              ripple
              no-caps
              to="/agrofoods"
              exact
            />

            <q-route-tab
              style="width: 110px"
              label="Animations"
              ripple
              no-caps
              to="/agrofarms"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="Shorts"
              ripple
              no-caps
              to="/agrotech"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="Music"
              ripple
              no-caps
              to="/agrotech"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="Arts"
              ripple
              no-caps
              to="/agrotech"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="VR Spaces"
              ripple
              no-caps
              to="/agrotech"
              exact
            />
            <q-route-tab
              style="width: 110px"
              label="Join Community"
              ripple
              no-caps
              to="/agrotech"
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

          <div class="connect">
            <q-btn no-caps class="bg-red q-pa-sm text-white">
              Connect Wallet <q-icon class="q-ml-sm" name="wallet" />
            </q-btn>
          </div>

          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            class="nav__toggler"
            @click="toggleLeftDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
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

@media (max-width: 600px) {
  .nav__toggler {
    display: block;
  }
}
</style>
