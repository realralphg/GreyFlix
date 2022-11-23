
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/dashboard', component: () => import('pages/Dashboard/Dashboard.vue') },
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
