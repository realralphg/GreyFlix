
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue'),name:'home' },
      { path: '/MusicStories', component: () => import('pages/MusicStories.vue'),name:'MusicStories' },
      // { path: '/dashboard', component: () => import('pages/Dashboard/Dashboard.vue') },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '/user/dashboard', component: () => import('pages/Dashboard/Dashboard.vue') },
    ]
  },
  {
    path: '/landing',
    component: () => import('layouts/landingpage.vue'),
    children: [
      { path: '/landingPage', component: () => import('pages/LandingPage.vue'), name:'landingPage' },
      { path: '/auth', component: () => import('pages/auth/Auth.vue'), name:'auth' },
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
