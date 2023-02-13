
const routes = [
  {
    path: '/homepage',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue'),name:'home' },
      { path: '/MusicStories', component: () => import('pages/MusicStories.vue'),name:'MusicStories' },
      { path: '/AudioStories', component: () => import('pages/AudioStories.vue'),name:'AudioStories' },
      { path: '/audio', component: () => import('pages/AudioDetail.vue'),name:'audio.content' },
      { path: '/EventsPage', component: () => import('src/pages/EventsPage.vue'),name:'EventsPage' },
      { path: '/EventTicketsPage/:slug', component: () => import('src/pages/EventTicketsPage.vue'),name:'EventTicketsPage' },
      { path: 'event/:eventID/TicketDetail/:ticketid', component: () => import('pages/TicketDetail.vue'),name:'TicketDetail' },
      { path: '/Purchase', component: () => import('pages/Purchase.vue'),name:'Purchase' },
      { path: '/payment/verify', component: () => import('pages/PaymentConfirmation.vue'),name:'payment.verify' },
      // { path: '/payment/verify/:ref', component: () => import('pages/PaymentConfirmation.vue'),name:'user.payment.verify.ref' },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    meta: {
      requireAuth: true,
    },
    children: [
      { path: '/user/dashboard', component: () => import('pages/Dashboard/Dashboard.vue'),name:'dashboard' },
      { path: '/user/Ticketing', component: () => import('pages/Dashboard/Ticketing.vue'), name:'Ticketing' },
      { path: '/user/Ticketing/:id', component: () => import('pages/Dashboard/EventTicket.vue'), name:'EventTicket' },
      { path: '/Admin/Category', component: () => import('pages/admin/Category.vue'), name:'Category' },
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
