
const routes = [
  {
    path: '/homepage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue'),name:'home' },
      { path: '/MusicStories', component: () => import('pages/MusicStories.vue'),name:'MusicStories' },
      { path: '/AudioStories', component: () => import('pages/AudioStories.vue'),name:'AudioStories' },
      { path: '/audio', component: () => import('pages/AudioDetail.vue'),name:'audio.content' },
      { path: '/TicketPage', component: () => import('pages/TicketPage.vue'),name:'TicketPage' },
      { path: '/TicketDetail', component: () => import('pages/TicketDetail.vue'),name:'TicketDetail' },
      { path: '/Purchase', component: () => import('pages/Purchase.vue'),name:'Purchase' },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '/user/dashboard', component: () => import('pages/Dashboard/Dashboard.vue'),name:'dashboard' },
      { path: '/user/Ticketing', component: () => import('pages/Dashboard/Ticketing.vue'), name:'Ticketing' },
    ]
  },
  {
    path: '/landing',
    component: () => import('layouts/landingpage.vue'),
    children: [
      { path: '/', component: () => import('pages/LandingPage.vue'), name:'landingPage' },
      { path: '/register', component: () => import('pages/auth/Auth.vue'), name:'register' },
      { path: '/login', component: () => import('pages/auth/Login.vue'), name:'login' },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
